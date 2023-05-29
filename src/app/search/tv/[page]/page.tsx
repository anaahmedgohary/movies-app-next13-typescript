import { TvSeriesObject } from "@p/assets/types";

import { Suspense } from "react";
// import MoviesMapper from "@/app/components/moviesMapper";
import TvMapper from "@/app/components/tvMapper";
import Pagination from "@/app/components/pagination";

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: { page: string };
  searchParams: { [key: string]: string };
}) {
  const page = params.page;
  const qParam = searchParams?.query.toString();
  const query = qParam.replace(" ", "%20") || "no";

  const searchUrl = `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=${page}&api_key=${process.env.MOVIEDB_API_KEY}`;

  const options = {
    method: "GET",
    headers: { accept: "application/json" },
    next: {
      revalidate: 60 * 60 * 48,
    },
  };
  let pagesFound: number = 1;

  const tvSearchResults: TvSeriesObject[] = await fetch(searchUrl, options)
    .then((res) => res.json())
    .then((data) => {
      pagesFound = data?.total_pages || 1;
      return data?.results;
    })
    .catch((err) => console.log(err));

  const sortedBypopularity = tvSearchResults.sort(
    (a, b) => b.popularity - a.popularity
  );
  const paginationArray = (() => {
    let first = 0;
    let arr = [];
    for (let i = 0; i < pagesFound; i++) {
      first++;
      arr.push(first);
    }
    return arr;
  })();

  // console.log(colors.green(`${pagesFound}`));
  // console.log(colors.green(`${matchesFound}`));

  if (tvSearchResults.length < 1) {
    return (
      <>
        <div className=" text-center bg-black w-full h-full m-auto py-20 px-5">
          <p className=" text-center text-4xl">
            No results Were Found of: {qParam}
          </p>
        </div>
      </>
    );
  }

  return (
    <div className="pt-8">
      <Pagination
        category={"search"}
        page={page}
        padding={"pt-8 pb-14"}
        queryParams={`?query=${query}`}
        totalPages={paginationArray}
      >
        <div>
          <h1 className="text-3xl text-center">Search Results for: {qParam}</h1>
        </div>
      </Pagination>

      {/* <div>
        {searchResults &&
          searchResults.map((item, index) => {
            return (
              <div key={index} className="text-center">
                <div>{item.title}</div>
                <div>{item.id}</div>
                <div>
                  <Link
                    href={`/movies/${item.id}`}
                    target="_blank"
                    prefetch={false}
                  >
                    View
                  </Link>
                </div>
              </div>
            );
          })}
      </div> */}
      <div className="e text-center bg-blue-950">
        <Suspense
          fallback={<div className="text-center"> loading Movies...</div>}
        >
          <TvMapper seriesArray={sortedBypopularity} />
        </Suspense>
      </div>

      <Pagination
        category={"search"}
        page={page}
        padding={"pt-8 pb-14"}
        queryParams={`?query=${query}`}
        totalPages={paginationArray}
      />
    </div>
  );
}
