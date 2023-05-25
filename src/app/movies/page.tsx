import { Suspense } from "react";
import GetMovies from "@/app/components/moviesmap";
import { MovieObject } from "../../../public/assets/types";

async function fetchMovies(listurl: string) {
  // const listurl = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.MOVIEDB_API_KEY}&language=en-US&page=1`;
  // const listurl2 =
  // `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.MOVIEDB_API_KEY}`;

  const response = await fetch(listurl, {
    next: {
      revalidate: 60 * 60 * 48,
    },
  });
  const result = await response.json();
  return result.results;
}

export default async function MoviesPage() {
  // const listurl = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.MOVIEDB_API_KEY}&language=en-US&page=1`;
  const listurl = `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.MOVIEDB_API_KEY}&language=en-US`;

  const moviesArry = await fetchMovies(listurl);
  return (
    <div className="e text-center bg-blue-950 py-9">
      <div className="text-center">
        <h1>Popular Movies</h1>
      </div>
      <Suspense
        fallback={<div className="text-center"> loading Movies...</div>}
      >
        <GetMovies moviesArry={moviesArry} />
      </Suspense>
    </div>
  );
}
