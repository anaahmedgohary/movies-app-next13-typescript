import Image from "next/image";
import Link from "next/link";
import { FaStar, FaImdb } from "react-icons/fa";
import { Akaya_Telivigala } from "next/font/google";
import { MovieObject } from "../../../public/assets/types";

///////////
const akayaTelivigala = Akaya_Telivigala({
  weight: ["400"],
  subsets: ["latin"],
});

export default function MovieComponent({
  movieObject,
  moviesCategory,
}: {
  movieObject: MovieObject;
  moviesCategory?: "popular" | "toprated" | "trending" | "upcoming" | "";
}) {
  //   const imagePath500px = 'https://image.tmdb.org/t/p/w500/'
  const imagePath = "https://image.tmdb.org/t/p/original";
  let genresArray: string[] = [];
  if (movieObject?.genres) {
    movieObject?.genres.forEach((el) => {
      genresArray.push(el.name);
    });
  }
  const eightDays = 3600000 * 24 * 8; // 8 days in milliseconds
  const currentDate = Date.now();
  const movieDate =
    new Date(movieObject?.release_date)?.getTime() || Date.now();
  console.log("movieDate: ", movieDate);
  console.log("currentDate: ", currentDate);

  const movieYear: number =
    parseInt(movieObject?.release_date?.split("-")[0]) ||
    new Date().getFullYear();

  const YTSLink: string = (movieObject.title + "-" + movieYear)
    .trim()
    .replace(/\W/g, "-")
    .replace(/^\W+/, "")
    .replace(/\W+$/, "")
    .replace(/-+/g, "-")
    .toLowerCase();
  const adjustedTitle: string = " " + movieObject.title;
  const titleSplitArr: string[] = adjustedTitle.split(" ");

  const searchTerm: string =
    titleSplitArr.length > 3
      ? titleSplitArr[titleSplitArr.length - 2] +
        " " +
        titleSplitArr[titleSplitArr.length - 1]
      : movieObject.title;
  // titleSplitArr.at(-2)
  const YTSSearch = `https://yts.mx/browse-movies/${searchTerm}/all/all/0/latest/0/all`;
  return (
    <div className="bg-black pt-10">
      <div
        style={{
          backgroundImage: `url(${imagePath + movieObject?.backdrop_path})`,
        }}
        className="movie_container bg-cover bg-center bg-black bg-opacity-80 bg-blend-multiply"
      >
        <div className=" text-center py-10 bg-slate-950 bg-opacity-20">
          <h1 className="text-6xl text-green-200">{movieObject?.title}</h1>
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
            <p className="opacity-80 text-gray-400">Movie</p>
          </div>
        </div>
        <div className="overviewDiv px-5 bg-black bg-opacity-60">
          <div className="border-b-2 py-6 flex flex-col gap-2">
            <div className="flex flex-wrap gap-x-2">
              <span className="text-center text-gray-300">Genres:</span>
              <p className="text-green-600 font-semibold">
                {genresArray.join(" + ")}
              </p>
            </div>
            <div className="flex flex-wrap gap-x-2">
              <span className="text-center text-gray-300">Release date:</span>
              <p className="text-green-600 font-semibold">
                {movieObject?.release_date}
              </p>
            </div>
            <div className="flex flex-wrap gap-x-2">
              <span className="text-center text-gray-300">Vote average:</span>
              <p className="text-green-600 font-semibold">
                {movieObject?.vote_average.toFixed(1)}
              </p>
            </div>
            <div className="flex flex-wrap gap-x-2">
              <span className="text-center text-gray-300">Runtime:</span>
              <p className="text-green-600 font-semibold">
                {movieObject?.runtime} minutes
              </p>
            </div>
          </div>
          <div className=" py-4 grid text-center">
            <h6 className="py-2 font-bold text-lg text-green-600">overview</h6>
            <p className={`${akayaTelivigala.className} italic`}>
              {movieObject?.tagline}
            </p>
            <p className="max-w-3xl m-auto">{movieObject?.overview}</p>
          </div>
        </div>

        <div className="linksDiv px-5 pb-2 bg-black bg-opacity-60 border-t-2">
          <h6 className="py-2 font-bold text-lg text-green-600">Links</h6>
          {((moviesCategory &&
            moviesCategory !== "upcoming" &&
            movieDate < currentDate - eightDays) ||
            movieDate < currentDate - eightDays ||
            movieYear < new Date().getFullYear()) && (
            <div className="pt-4">
              <p className="text-yellow-400 text-sm">
                link to download movie * when it&#39; done uploading *
              </p>
              <div className="py-1">
                <Link
                  prefetch={false}
                  href={`https://yts.mx/movies/${YTSLink}`}
                  target="_blank"
                  className="text-green-400 hover:text-white duration-300 italic text-xl px-2 rounded-full py-1 bg-gray-700 hover:bg-orange-500"
                  title="see if the movie's ready to download"
                >
                  Check or Download Movie
                </Link>
              </div>
              <p className="text-yellow-400 text-sm">
                if 404 page then movie is not uploaded yet
              </p>
            </div>
          )}
          <div>
            <Link
              prefetch={false}
              href={YTSSearch}
              target="_blank"
              className="hover:text-green-400 italic"
            >
              search for Movie Download
            </Link>
          </div>
          <div className=" py-4 grid items-center justify-start text-center">
            <Link
              prefetch={false}
              href={`https://www.imdb.com/title/${movieObject?.imdb_id}/`}
              target="_blank"
              className=" text-center"
              title="movies's page on IMDB"
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
