////////////
import MovieComponent from "@/app/components/movie-component";
// import {generateMetadata} from "@/app/components/moviebyid";
import { MovieObject } from "@p/assets/types";
//////////

async function fetchMovie(movieId: number | string): Promise<MovieObject> {
  const movieLink = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.MOVIEDB_API_KEY}`;

  const response: MovieObject = await fetch(movieLink, {
    next: {
      revalidate: 60 * 60 * 24,
    },
  })
    .then((res) => res.json())
    .then((json) => json)
    .catch((err) => {
      console.log(err);
      return false;
    });
  return response;
}

export async function generateMetadata({
  params: { id },
}: {
  params: { id: number | string };
}) {
  const movieObject: MovieObject = await fetchMovie(id);
  if (!movieObject && typeof window !== "undefined") {
    alert("some error.. please reload");
    return;
  }
  return {
    title: `Movie: ${movieObject?.title}`,
    description: `${movieObject?.tagline} From ${movieObject?.title}`,
  };
}

export default async function MoviePage({
  params: { id },
  searchParams,
}: {
  params: { id: number };
  searchParams?: {
    moviesCategory: "popular" | "toprated" | "trending" | "upcoming";
    [key: string]: string;
  };
}) {
  const moviesCategory: "popular" | "toprated" | "trending" | "upcoming" | "" =
    searchParams?.moviesCategory || "";
  const movieObject: MovieObject = await fetchMovie(id);
  if (!movieObject && typeof window !== "undefined") {
    alert("some error.. please reload");
    return;
  }

  return (
    <div>
      <MovieComponent
        movieObject={movieObject}
        moviesCategory={moviesCategory}
      />
    </div>
  );
}
