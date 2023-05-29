import { Suspense } from "react";
// import TrendingMovies from "@/app/components/listtrendingmovies";
import MoviesMapper from "@/app/components/moviesMapper";
import { MovieObject } from "../../../../public/assets/types";

export default async function MoviesPage() {
  // const baseUrl = process.env.BASE_URL || "/api";
  const maxDate = new Date().toISOString().slice(0, 10);
  //
  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.gte=2023-05-29&primary_release_date.lte=${maxDate}&sort_by=popularity.desc`;
  //
  const listurl = `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.MOVIEDB_API_KEY}&language=en-US`;
  // &with_original_language=en

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
        <MoviesMapper moviesArry={moviesArray} moviesCategory="trending" />
      </Suspense>
    </div>
  );
}
