import { Suspense } from "react";
// import TopRatedMovies from "@/app/components/listtopratedmovies";
// import MoviesMap from "@/app/components/moviesmap";
import Pagination from "@/app/components/pagination";
import MoviesMapper from "@/app/components/moviesMapper";
import { MovieObject } from "@/types";
// import colors from "colors/safe";

export default async function MoviesPage({
  params: { page },
}: {
  params: { page: string };
}) {
  // const baseUrl = process.env.BASE_URL || "/api";
  const listurl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.MOVIEDB_API_KEY}&language=en-US&page=${page}`;

  const response = await fetch(listurl, {
    next: {
      revalidate: 60 * 60 * 48,
    },
  })
    .then((res) => res.json())
    .then((json) => json.results)
    .catch((err) => {
      console.log(err);
    });
  const moviesArray: MovieObject[] = await response;

  // const data = await fetch(`${baseUrl}/moviedb/top_rated/${page}`).then(
  //   async (res) => {
  //     const result = await res.json();
  //     return result;
  //   }
  // );
  // const moviesArray = await data;

  return (
    <>
      <div className="bg-blue-950 pt-8">
        <Pagination
          category={"movies/toprated"}
          page={page}
          padding={"pt-8 pb-2"}
        >
          <div className="text-center">
            <h1 className="text-3xl">Top Rated Movies</h1>
          </div>
        </Pagination>

        <Pagination
          category={"movies/toprated"}
          page={page}
          padding={"pt-8 pb-14"}
        >
          <div className="e text-center bg-blue-950">
            <Suspense
              fallback={<div className="text-center"> loading Movies...</div>}
            >
              {/* <MoviesMap url={listurl} /> */}
              <MoviesMapper moviesArry={moviesArray} />
            </Suspense>
          </div>
        </Pagination>
      </div>
    </>
  );
}
