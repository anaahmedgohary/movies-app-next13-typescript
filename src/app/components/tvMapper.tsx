// imports
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
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
      <div className="pt-10">
        <ul className="flex flex-wrap gap-10 p-5">
          {seriesArray.map((item) => {
            return (
              <li
                className=" flex-1 flex flex-col gap-3 justify-center items-center py-5 border-4 bg-gray-900 min-w-[320px] rounded-md group hover:bg-gray-800 overflow-x-hidden"
                key={item?.id}
              >
                <Link
                  href={`/tv/series/${item?.id}`}
                  // prefetch={false}
                  className="duration-500 h-[500px] ww-[320px] w-full  overflow-hidden hover:outline outline-1 outline-green-400  object-bottom object-contain border-4 border-black"
                  // max-w-[302px]
                >
                  <Image
                    className="duration-500 group-hover:scale-[1.2] m-auto h-full w-auto max-w-full sm:max-w-[480px]"
                    // min-h-[497px]  h-auto w-auto
                    src={imagePath500px + item?.poster_path}
                    alt="Series poster"
                    title="open show page"
                    width={300}
                    height={500}
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
                  <p>{item?.first_air_date}</p>
                ) : (
                  <p>Unknown</p>
                )}

                <p>
                  {item.original_language
                    ? new Intl.DisplayNames(["en"], {
                        type: "language",
                      }).of(item?.original_language || "en")
                    : ""}
                </p>
                <p>
                  {item.original_language
                    ? new Intl.DisplayNames(["en"], {
                        type: "region",
                      }).of(item?.origin_country[0] || "US")
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
                <div className="w-[80%] bg-black p-1 flex rounded-full">
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
