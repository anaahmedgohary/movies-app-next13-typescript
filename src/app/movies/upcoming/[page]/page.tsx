import { Suspense } from "react";
import Pagination from "@/app/components/pagination";
import MoviesMapper from "@/app/components/moviesMapper";
import { MovieObject } from "@/types";
import colors from "colors/safe";

export default async function MoviesPage({
  params: { page },
}: {
  params: { page: string };
}) {
  // const baseUrl = process.env.BASE_URL || "/api";

  const listurl = `https://api.themoviedb.org/3/movie/upcoming?page=${page}&api_key=${process.env.MOVIEDB_API_KEY}`;
  // &language=en-US
  // revalidate: 60 * 60 * 48,

  const response = await fetch(listurl, {
    next: {
      revalidate: 60 * 60 * 24,
    },
  })
    .then((res) => res.json())
    .then((json) => json.results)
    .catch((err) => {
      console.log(err);
    });
  const moviesArray: MovieObject[] = await response.sort(sortingDates);
  function sortingDates(a: MovieObject, b: MovieObject) {
    let checkA = a.release_date || "2030-12-30";
    let checkB = b.release_date || "2030-12-30";
    let d1 = new Date(checkA);
    let d2 = new Date(checkB);
    if (d1.getUTCFullYear() > d2.getUTCFullYear()) {
      return 1;
    } else if (d1.getUTCFullYear() < d2.getUTCFullYear()) {
      return -1;
    } else if (
      d1.getUTCFullYear() == d2.getUTCFullYear() &&
      d1.getUTCMonth() > d2.getUTCMonth()
    ) {
      return 1;
    } else if (
      d1.getUTCFullYear() == d2.getUTCFullYear() &&
      d1.getUTCMonth() < d2.getUTCMonth()
    ) {
      return -1;
    } else {
      return d1.getUTCDate() - d2.getUTCDate();
    }
  }
  // const data = await fetch(`${baseUrl}/upcoming/${page}`).then(async (res) => {
  //   const result = await res.json();
  //   return result;
  // });
  // const moviesArray = await data;

  return (
    <>
      <div className="bg-blue-950 pt-8">
        <Pagination
          category={"movies/upcoming"}
          page={page}
          padding={"pt-8 pb-2"}
        >
          <div className="text-center">
            <h1 className="text-3xl">Upcoming Movies</h1>
          </div>
        </Pagination>

        <div className="e text-center bg-blue-950">
          <Suspense
            fallback={<div className="text-center"> loading Movies...</div>}
          >
            {/* <MoviesMap url={listurl} /> */}
            <MoviesMapper moviesArry={moviesArray} />
          </Suspense>
        </div>
        <Pagination
          category={"movies/upcoming"}
          page={page}
          padding={"pt-8 pb-14"}
        />
      </div>
    </>
  );
}
