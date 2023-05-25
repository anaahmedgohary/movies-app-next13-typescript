// imports
import Image from "next/image";
import Link from "next/link";
import { FaStar, FaImdb } from "react-icons/fa";
import { Viga, Roboto } from "next/font/google";
const vigaFont = Viga({ subsets: ["latin"], weight: ["400"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["400"] });
// import colors from "colors/safe";
import { TvSeriesObject } from "@p/assets/types";
// import SearchBar from "./search";
// imports //

export default function TvMapper({
  seriesArray,
}: {
  seriesArray: TvSeriesObject[];
}) {
  const imagePath500px = "https://image.tmdb.org/t/p/w500/";

  return (
    <div>
      <div className="moviesListContainer pt-10">
        <ul className="moviesList flex flex-wrap gap-10 p-5">
          {seriesArray.map((item) => {
            // console.log(movie.release_date);
            return (
              <li
                className=" flex-1 flex flex-col gap-3 justify-center items-center py-5 border-4 bg-gray-900 min-w-[320px] rounded-md group hover:bg-gray-800 overflow-x-hidden"
                key={item?.id}
              >
                <Link
                  href={`/tv/series/${item?.id}`}
                  // prefetch={false}
                  className="max-w-full max-h-[498px] overflow-hidden"
                >
                  <Image
                    className=" duration-500 hover:scale-[0.9] group-hover:scale-[0.9] hover:outline outline-1 outline-green-400 h-auto w-auto min-h-[497px] max-w-full"
                    src={imagePath500px + item?.poster_path}
                    alt="Movie poster"
                    title="open movie page"
                    width={300}
                    height={400}
                    // style={{ height: "auto", width: "auto" }}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={imagePath500px + item?.poster_path}
                  />
                </Link>
                <p
                  className={` overflow-hidden first-letter:uppercase overflow-ellipsis whitespace-nowrap max-w-[80%] font-bold ${vigaFont.className}`}
                >
                  {item.name}
                </p>

                {item?.first_air_date ? (
                  // <p>{movie?.release_date.split("-")[0]}</p>
                  <p>{item?.first_air_date}</p>
                ) : (
                  <p>Unknown</p>
                )}
                {/* <p>{movie.release_date.split("-")[0]}</p> */}

                <p>
                  {item.original_language
                    ? new Intl.DisplayNames(["en"], {
                        type: "language",
                      }).of(item.original_language)
                    : ""}
                </p>
                <div className="flex items-center">
                  <FaStar className=" text-orange-300" /> &nbsp;{" "}
                  <p
                    className={` ${roboto.className} font-bold ${
                      item?.vote_average >= 6
                        ? "text-green-600"
                        : "text-red-300"
                    }`}
                  >
                    {item?.vote_average.toFixed(1)}
                  </p>
                </div>
                <div className="movieLinkDiv w-[80%] bg-black p-1 flex rounded-full">
                  <Link
                    href={`/tv/series/${item?.id}`}
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
