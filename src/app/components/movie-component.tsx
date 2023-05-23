import Image from "next/image";
import Link from "next/link";
import { FaStar, FaImdb } from "react-icons/fa";
import { Akaya_Telivigala } from "next/font/google";
import { MovieObject } from "@/types";

///////////
const akayaTelivigala = Akaya_Telivigala({
  weight: ["400"],
  subsets: ["latin"],
});

export default function MovieComponent({
  movieObject,
}: {
  movieObject: MovieObject;
}) {
  //   const imagePath500px = 'https://image.tmdb.org/t/p/w500/'
  const imagePath = "https://image.tmdb.org/t/p/original";
  let genresArray: string[] = [];
  if (movieObject?.genres) {
    movieObject?.genres.forEach((el) => {
      genresArray.push(el.name);
    });
  }

  return (
    <div className="bg-black pt-10">
      <div
        style={{
          backgroundImage: `url(${imagePath + movieObject?.backdrop_path})`,
        }}
        className="movie_container bg-cover bg-center bg-black bg-opacity-80 bg-blend-multiply"
      >
        <div className=" text-center py-10 bg-slate-950 bg-opacity-20">
          <h1 className=" text-6xl">{movieObject?.title}</h1>
        </div>
        <div className="flex flex-wrap items-center gap-3 py-8 px-1">
          <Image
            src={imagePath + movieObject?.poster_path}
            alt="poster"
            className=" h-auto"
            width={320}
            height={800}
            placeholder="blur"
            blurDataURL={imagePath + movieObject?.poster_path}
            priority
          />
          <div className="nameAndType px-4">
            <p>{movieObject?.title}</p>
            <p>
              Language:{" "}
              {new Intl.DisplayNames(["en"], {
                type: "language",
              }).of(movieObject?.original_language)}
            </p>
            <p>Movie</p>
          </div>
        </div>
        <div className="overviewDiv px-5 bg-black bg-opacity-60">
          <div className=" border-b-2">
            <p>Genres: {genresArray.join(" + ")}</p>
            <p>Release date: {movieObject?.release_date}</p>
            <p>Vote average: {movieObject?.vote_average.toFixed(1)}</p>
            <p>runtime: {movieObject?.runtime} minutes</p>
          </div>
          <div className=" py-4 grid text-center">
            <h6 className="py-2 font-bold text-lg ">overview</h6>
            <p className={`${akayaTelivigala.className} italic`}>
              {movieObject?.tagline}
            </p>
            <p className="max-w-3xl m-auto">{movieObject?.overview}</p>
          </div>
        </div>

        <div className="linksDiv px-5 bg-black bg-opacity-60 border-t-2">
          <h6 className="py-2 font-bold text-lg ">Links</h6>
          <div className=" py-4 grid items-center justify-start text-center">
            <Link
              prefetch={false}
              href={`https://www.imdb.com/title/${movieObject?.imdb_id}/`}
              target="_blank"
              className=" text-center"
            >
              <FaImdb className=" text-6xl hover:text-green-400" />
            </Link>
          </div>
          {movieObject?.homepage && (
            <div>
              <Link
                prefetch={false}
                href={movieObject?.homepage}
                target="_blank"
                className="hover:text-green-400 italic"
              >
                Movie&#39;s offical website
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
