import { Suspense } from "react";
import Pagination from "@/app/components/pagination";
import MoviesMapper from "@/app/components/moviesMapper";
import { MovieObject } from "../../../../../public/assets/types";
import colors from "colors/safe";

export default async function MoviesPage({
  params: { page },
}: {
  params: { page: string };
}) {
  // const baseUrl = process.env.BASE_URL || "/api";
  const dateNow = new Date();
  // dateNow.setHours(dateNow.getHours()+48)
  const minDate = dateNow.toISOString().slice(0, 10);
  const newDate = new Date();
  newDate.setFullYear(newDate.getFullYear() + 2);
  const maxDate = newDate.toISOString().slice(0, 10);

  const discoverURL = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_release_type=3&primary_release_date.gte=${minDate}&primary_release_date.lte=${maxDate}&api_key=${process.env.MOVIEDB_API_KEY}`;

  // const listurl = `https://api.themoviedb.org/3/movie/upcoming?page=${page}&api_key=${process.env.MOVIEDB_API_KEY}`;

  const response = await fetch(discoverURL, {
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
            <MoviesMapper moviesArry={moviesArray} moviesCategory="upcoming" />
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
