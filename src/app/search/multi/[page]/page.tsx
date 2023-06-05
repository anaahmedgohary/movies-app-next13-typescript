import { MovieObject, SearchResultsArr } from "@p/assets/types";
import Link from "next/link";
import { Suspense } from "react";
import MoviesMapper from "@/app/components/moviesMapper";
import SearchMapper from "@/app/components/search-mapper";
import Pagination from "@/app/components/pagination";
// import SegmentPagination from "@/app/components/pagination-tv";
import colors from "colors/safe";
// import SearchBar from "@/app/components/search";
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
  const qParam = searchParams?.query.toString();
  const query = qParam.replace(" ", "%20") || "no";
  //////////////
  const searchUrl = `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=${page}&api_key=${process.env.MOVIEDB_API_KEY}`;

  const options = {
    method: "GET",
    headers: { accept: "application/json" },
    next: {
      revalidate: 60 * 60 * 48,
    },
  };
  let pagesFound: number = 1;
  // let matchesFound: number = 1;

  const movieSearchResults: SearchResultsArr = await fetch(searchUrl, options)
    .then((res) => res.json())
    .then((data) => {
      if (data?.total_pages > 0) {
        // pagesFound = data?.total_pages < 10 ? data?.total_pages : 10;
        pagesFound = data?.total_pages || 1;
      }
      // matchesFound = data?.total_results || 1;
      return data?.results;
    })
    .catch((err) => console.log(err));

  // const sortedBypopularity = movieSearchResults.sort(
  //   (a, b) => b.popularity - a.popularity
  // );
  const paginationArray = (() => {
    let first = 0;
    let arr = [];
    for (let i = 0; i < pagesFound; i++) {
      first++;
      arr.push(first);
    }
    console.log("arr: ", arr);
    return arr;
  })();

  if (!movieSearchResults || movieSearchResults.length < 1) {
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
        category={"search/multi"}
        page={page}
        padding={"pt-8 pb-14"}
        queryParams={`?query=${query}`}
        totalPages={paginationArray}
      >
        <div>
          <h1 className="text-3xl text-center">Search Results for: {qParam}</h1>
        </div>
      </Pagination>

      <div className="e text-center bg-blue-950">
        <Suspense
          fallback={<div className="text-center"> loading Movies...</div>}
        >
          {/* <MoviesMapper moviesArry={movieSearchResults} /> */}
          <SearchMapper resultsArr={movieSearchResults} />
        </Suspense>
      </div>

      <Pagination
        category={"search/multi"}
        page={page}
        padding={"pt-8 pb-14"}
        queryParams={`?query=${query}`}
        totalPages={paginationArray}
      />
    </div>
  );
}
