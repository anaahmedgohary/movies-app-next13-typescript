////////////
import MovieComponent from "@/app/components/movie-component";
import { MovieObject } from "@p/assets/types";
import colors from "colors/safe";
import NotFound from "@p/assets/not-found";
//////////

async function fetchMovie(movieId: number | string): Promise<MovieObject> {
  const movieLink = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.MOVIEDB_API_KEY}&append_to_response=videos`;

  const response = await fetch(movieLink, {
    next: {
      revalidate: 60 * 60 * 24,
    },
  }).then(async (res) => {
    if (!res.ok) {
      let json = (await res.json()) || "undefined res body";
      console.log("!res.ok: ", json);
      // console.log(colors.red(json));
      throw new Error(`!res.ok & status: ${res.status}`);
    }
    return res.json();
  });
  return response;
}

export async function generateMetadata({
  params: { id },
}: {
  params: { id: number | string };
}) {
  // let movieObject: MovieObject
  try {
    const movieObject = await fetchMovie(id);
    return {
      title: `${movieObject?.title}`,
      description: `${movieObject?.tagline} From ${movieObject?.title}`,
    };
  } catch (error) {
    console.log("error: ", error);
    // console.log(colors.red(`${error}`));
  }
}

export default async function MoviePage({
  params: { id },
  searchParams,
}: {
  params: { id: string };
  searchParams?: {
    moviesCategory: "popular" | "toprated" | "trending" | "upcoming";
    [key: string]: string | number;
  };
}) {
  const moviesCategory = searchParams?.moviesCategory || "";
  let trailerLink: string | null;
  let movieObject: MovieObject;
  try {
    movieObject = await fetchMovie(id);
    trailerLink =
      movieObject?.videos?.results?.find((el) => el.site === "YouTube")?.key ||
      movieObject?.videos?.results[0]?.key ||
      null;
    // console.log("trailerLink: ", colors.green(trailerLink));

    // movie-trailer
  } catch (error) {
    console.log("errrrrrrrrrror: ", colors.green(`${error}`));
    return <NotFound />;
  }

  return (
    <div>
      <MovieComponent
        movieObject={movieObject}
        moviesCategory={moviesCategory}
        movieTrailerSrc={trailerLink}
      />
    </div>
  );
}
