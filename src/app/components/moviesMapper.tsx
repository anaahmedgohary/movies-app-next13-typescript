// imports
import Image from "next/image";
import Link from "next/link";
import { FaStar, FaImdb } from "react-icons/fa";
import { Viga, Roboto } from "next/font/google";
const vigaFont = Viga({ subsets: ["latin"], weight: ["400"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["400"] });
// import colors from "colors/safe";
import { MovieObject } from "../../../public/assets/types";
// import SearchBar from "./search";
// imports //

export default function MoviesMapper({
  moviesArry,
  moviesCategory,
}: {
  moviesArry: MovieObject[];
  moviesCategory?: "popular" | "toprated" | "trending" | "upcoming";
}) {
  const imagePath500px = "https://image.tmdb.org/t/p/w500/";

  return (
    <div>
      <div className="moviesListContainer pt-10">
        <ul className="moviesList flex flex-wrap gap-10 p-5">
          {moviesArry.map((movie) => {
            // console.log(movie.release_date);
            return (
              <li
                className=" flex-1 flex flex-col gap-3 justify-center items-center py-5 border-4 bg-gray-900 min-w-[320px] rounded-md group hover:bg-gray-800 overflow-hidden"
                key={movie?.id}
              >
                <Link
                  href={`/movies/movie/${movie?.id}${
                    moviesCategory ? "?moviesCategory=" + moviesCategory : ""
                  }`}
                  prefetch={false}
                  className="duration-500 h-[500px] ww-[320px] w-full  overflow-hidden hover:outline outline-1 outline-green-400  object-bottom object-contain border-4 border-black"
                >
                  <Image
                    className="duration-500 group-hover:scale-[1.2] m-auto h-full w-auto max-w-full sm:max-w-[480px]"
                    src={imagePath500px + movie?.poster_path}
                    alt="Movie poster"
                    title="open movie page"
                    width={300}
                    height={500}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={imagePath500px + movie?.poster_path}
                  />
                </Link>
                <p
                  className={` overflow-hidden first-letter:uppercase overflow-ellipsis whitespace-nowrap max-w-[80%] font-bold ${vigaFont.className}`}
                >
                  {movie.title}
                </p>

                {movie?.release_date ? (
                  // <p>{movie?.release_date.split("-")[0]}</p>
                  <p>{movie?.release_date}</p>
                ) : (
                  <p>Unknown</p>
                )}
                {/* <p>{movie.release_date.split("-")[0]}</p> */}

                <p>
                  {movie.original_language
                    ? new Intl.DisplayNames(["en"], {
                        type: "language",
                      }).of(movie.original_language)
                    : ""}
                </p>
                <div className="flex items-center">
                  <FaStar className=" text-orange-300" /> &nbsp;{" "}
                  <p
                    className={` ${roboto.className} font-bold ${
                      movie?.vote_average >= 6
                        ? "text-green-600"
                        : "text-red-300"
                    }`}
                  >
                    {movie?.vote_average.toFixed(1)}
                  </p>
                </div>
                <div className="movieLinkDiv w-[80%] bg-black p-1 flex rounded-full">
                  <Link
                    prefetch={false}
                    href={`/movies/movie/${movie?.id}`}
                    target="_blank"
                    className="bg-black w-full hover:bg-green-600 duration-300 rounded-full text-2xl"
                  >
                    View
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
