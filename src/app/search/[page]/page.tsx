import { MovieObject } from "@/types";
import axios from "axios";
import colors from "colors/safe";
import Colors from "colors";
import Link from "next/link";
import { Suspense } from "react";
import MoviesMapper from "@/app/components/moviesMapper";
import Pagination from "@/app/components/pagination";
import SearchBar from "@/app/components/search";
// import useSearchParams from "next/navigation";
///////////

// async function getSearchResults(link: string):Promise<MovieObject[]> {

//     // let results: {}[] = [];
//     const options = { method: "GET", headers: { accept: "application/json" } };
//     const movieSearchResults: MovieObject[] = await fetch(link, options)
//       .then((res) => res.json())
//       .then((data) => data?.results)
//       .catch((err) => console.log(err));
//     return movieSearchResults;

// }

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: { page: string };
  searchParams: { [key: string]: string };
}) {
  const page = params.page;
  console.log(typeof params.page);
  const qParam = searchParams?.query.toString();
  const query = qParam.replace(" ", "%20") || "no";
  // (searchParams && searchParams?.query.replace(" ", "%20")) || "no";

  // const searchUrl = `https://api.themoviedb.org/3/search/movie?query=god%20father&include_adult=false&language=en-US&page=${
  //   page || 1
  // }&api_key=${process.env.MOVIEDB_API_KEY}`;

  const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}&api_key=${process.env.MOVIEDB_API_KEY}&sort_by=primary_release_date.desc`;

  // const searchResults:MovieObject[] = await getSearchResults(searchUrl);

  const options = {
    method: "GET",
    headers: { accept: "application/json" },
    next: {
      revalidate: 60 * 60 * 48,
    },
  };
  let pagesFound: number = 1;
  let matchesFound: number = 1;

  const movieSearchResults: MovieObject[] = await fetch(searchUrl, options)
    .then((res) => res.json())
    .then((data) => {
      pagesFound = data?.total_pages || 1;
      matchesFound = data?.total_results || 1;
      return data?.results;
    })
    .catch((err) => console.log(err));

  const sortedBypopularity = movieSearchResults.sort(
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

  if (movieSearchResults.length < 1) {
    return (
      <>
        <SearchBar>
          <div className=" text-center bg-black w-full h-full m-auto py-20 px-5">
            <p className=" text-center text-4xl">No results Were Found</p>
          </div>
        </SearchBar>
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
          <h1 className="text-3xl text-center">Search Results</h1>
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

      <Pagination
        category={"search"}
        page={page}
        padding={"pt-8 pb-14"}
        queryParams={`?query=${query}`}
        totalPages={paginationArray}
      >
        <div className="e text-center bg-blue-950">
          <Suspense
            fallback={<div className="text-center"> loading Movies...</div>}
          >
            <MoviesMapper moviesArry={sortedBypopularity} />
          </Suspense>
        </div>
      </Pagination>
    </div>
  );
}
