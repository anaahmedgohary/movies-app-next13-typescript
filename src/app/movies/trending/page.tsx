import { Suspense } from "react";
// import TrendingMovies from "@/app/components/listtrendingmovies";
import MoviesMapper from "@/app/components/moviesMapper";
import { MovieObject } from "@/types";

export default async function MoviesPage() {
  // const baseUrl = process.env.BASE_URL || "/api";
  const listurl = `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.MOVIEDB_API_KEY}&language=en-US`;

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
  // const result = await response.json();
  const moviesArray = await response.sort(
    (a: MovieObject, b: MovieObject) => b.vote_count - a.vote_count
  );

  return (
    <div className="e text-center bg-blue-950 py-9">
      <div className="text-center">
        <h1 className="text-3xl">Trending Movies</h1>
      </div>
      <Suspense
        fallback={<div className="text-center"> loading Movies...</div>}
      >
        {/* <MoviesMap url={listurl} /> */}
        <MoviesMapper moviesArry={moviesArray} />
      </Suspense>
    </div>
  );
}
