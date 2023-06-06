import { Suspense } from "react";
// import colors from "colors/safe";
// import TopRatedMovies from "@/app/components/listtopratedmovies";
import MoviesMapper from "@/app/components/moviesMapper";
import Pagination from "@/app/components/pagination";
import { MovieObject } from "@p/assets/types";
///////////////////

export default async function MoviesPage({
  params: { page },
}: {
  params: { page: string };
}) {
  // const baseUrl = process.env.BASE_URL || "/api";
  const listurl = `https://api.themoviedb.org/3/movie/popular?page=${page}&api_key=${process.env.MOVIEDB_API_KEY}`;
  // &sort_by=popularity.asc
  const response: MovieObject[] = await fetch(listurl, {
    next: {
      revalidate: 60 * 60 * 48,
    },
  })
    .then((res) => res.json())
    .then((json) => json.results)
    .catch((err) => {
      console.log(err);
    });
  const moviesArray: MovieObject[] = response.sort(
    (a: MovieObject, b: MovieObject) => b.popularity - a.popularity
  );

  // console.log(colors.yellow(moviesArray[4]));
  // const data = await fetch(`${baseUrl}/moviedb/popular/${page}`).then(
  //   async (res) => {
  //     const result = await res.json();
  //     return result;
  //   }
  // );
  // const moviesArray = await data;

  return (
    <>
      <div className="pt-8">
        <Pagination
          category={"movies/popular"}
          page={page}
          padding={"pt-8 pb-2"}
        >
          <div className="text-center">
            <h1 className="text-3xl">Popular Movies</h1>
          </div>
        </Pagination>

        <div className="e text-center bg-blue-950">
          <Suspense
            fallback={<div className="text-center"> loading Movies...</div>}
          >
            <MoviesMapper moviesArry={moviesArray} moviesCategory="popular" />
          </Suspense>
        </div>
        <Pagination
          category={"movies/popular"}
          page={page}
          padding={"pt-8 pb-14"}
        />
      </div>
    </>
  );
}
