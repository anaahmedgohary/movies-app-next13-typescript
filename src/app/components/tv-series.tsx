import Image from "next/image";
import Link from "next/link";
import { FaImdb } from "react-icons/fa";
import { Akaya_Telivigala } from "next/font/google";
import { TvSeriesObject } from "@p/assets/types";

///////////
const akayaTelivigala = Akaya_Telivigala({
  weight: ["400"],
  subsets: ["latin"],
});

export default function TvSeriesComponent({
  TvSeriesObj,
}: {
  TvSeriesObj: TvSeriesObject;
}) {
  //   const imagePath500px = 'https://image.tmdb.org/t/p/w500/'
  const imagePath = "https://image.tmdb.org/t/p/original";
  let genresArray: string[] = [];
  if (TvSeriesObj?.genres) {
    TvSeriesObj?.genres.forEach((el) => {
      genresArray.push(el.name);
    });
  }

  const imdbSearchLink = `https://www.imdb.com/find/?q=${
    123 + 123
  }&ref_=nv_sr_sm`;

  return (
    <div className="bg-black pt-1">
      <div
        style={{
          backgroundImage: `url(${imagePath + TvSeriesObj?.backdrop_path})`,
        }}
        className="bg-cover bg-center bg-black bg-opacity-40 bg-blend-multiply"
      >
        <div className=" text-center py-10 bg-black bg-opacity-80">
          <h1 className="text-6xl text-green-200">{TvSeriesObj?.name}</h1>
        </div>
        <div className="flex flex-wrap items-center gap-3 py-8 px-1">
          <Image
            src={imagePath + TvSeriesObj?.poster_path}
            alt="poster"
            className=" h-auto"
            width={320}
            height={800}
            placeholder="blur"
            blurDataURL={imagePath + TvSeriesObj?.poster_path}
            priority
          />
          <div className="nameAndType px-4 py-4 rounded-lg bg-black bg-opacity-60">
            <p>{TvSeriesObj?.name}</p>
            <p>
              Language:{" "}
              {new Intl.DisplayNames(["en"], {
                type: "language",
              }).of(TvSeriesObj?.original_language)}
            </p>
            <p className="opacity-80 text-gray-400">Tv series</p>
          </div>
        </div>
        <div className="overviewDiv px-5 bg-black bg-opacity-60">
          <div className="border-b-2 py-6 flex flex-col gap-2">
            <div className="flex flex-wrap gap-x-2">
              <span className="text-center text-gray-300"></span>
              <p className="text-green-600 font-semibold">{}</p>
            </div>
            <div className="flex flex-wrap gap-x-2">
              <span className="text-center text-gray-300">Genres:</span>
              <p className="text-green-600 font-semibold">
                {genresArray.join(" + ")}
              </p>
            </div>
            <div className="flex flex-wrap gap-x-2">
              <span className="text-center text-gray-300">First air date:</span>
              <p className="text-green-600 font-semibold">
                {TvSeriesObj?.first_air_date}
              </p>
            </div>
            <div className="flex flex-wrap gap-x-2">
              <span className="text-center text-gray-300">Last aired on:</span>
              <p className="text-green-600 font-semibold">
                {TvSeriesObj.last_air_date}
              </p>
            </div>

            <div className="flex flex-wrap gap-x-2">
              <span className="text-center text-gray-300">
                Last episode aired:
              </span>
              <p className="text-green-600 font-semibold">
                {TvSeriesObj?.last_episode_to_air?.episode_number}
              </p>
            </div>
            <div className="flex flex-wrap gap-x-2">
              <span className="text-center text-gray-300">
                Number of seasons:
              </span>
              <p className="text-green-600 font-semibold">
                {TvSeriesObj.number_of_seasons}
              </p>
            </div>
            <div className="flex flex-wrap gap-x-2">
              <span className="text-center text-gray-300">
                Number of episodes:
              </span>
              <p className="text-green-600 font-semibold">
                {TvSeriesObj.number_of_episodes}
              </p>
            </div>
            <div className="flex flex-wrap gap-x-2">
              <span className="text-center text-gray-300">Type:</span>
              <p className="text-green-600 font-semibold">
                {TvSeriesObj?.type}
              </p>
            </div>
            <div className="flex flex-wrap gap-x-2">
              <span className="text-center text-gray-300">Vote average:</span>
              <p className="text-green-600 font-semibold">
                {TvSeriesObj?.vote_average.toFixed(1)}
              </p>
            </div>
            <div className="flex flex-wrap gap-x-2">
              <span className="text-center text-gray-300">Watch on:</span>
              <p className="text-green-600 font-semibold">
                {TvSeriesObj?.networks[0]?.name}
              </p>
            </div>
            {TvSeriesObj?.created_by[0]?.name ? (
              <div className="flex flex-wrap gap-x-2">
                <span className="text-center text-gray-300">Creator:</span>
                <p className="text-green-600 font-semibold">
                  {TvSeriesObj?.created_by[0]?.name}
                </p>
              </div>
            ) : (
              ""
            )}
            <div className="flex flex-wrap gap-x-2">
              <span className="text-center text-gray-300">Status:</span>
              <p className="text-green-600 font-semibold">
                {TvSeriesObj?.status}
              </p>
            </div>
          </div>
          <div className=" py-4 grid text-center">
            <h6 className="py-2 font-bold text-lg text-green-600">overview</h6>
            <p className={`${akayaTelivigala.className} italic`}>
              {TvSeriesObj?.tagline}
            </p>
            <p className="max-w-3xl m-auto">{TvSeriesObj?.overview}</p>
          </div>
        </div>

        <div className="linksDiv px-5 pb-10 bg-black bg-opacity-60 border-t-2">
          <h6 className="py-2 font-bold text-lg text-green-600">Links</h6>
          <div className=" py-4 grid items-center justify-start text-center">
            <Link
              prefetch={false}
              href={`https://www.imdb.com/find/?q=${TvSeriesObj.name.replace(
                " ",
                "%20"
              )}&ref_=nv_sr_sm`}
              target="_blank"
              className=" text-center"
            >
              <FaImdb className=" text-6xl hover:text-green-400" />
            </Link>
          </div>
          {TvSeriesObj?.homepage && (
            <div>
              <Link
                prefetch={false}
                href={TvSeriesObj?.homepage}
                target="_blank"
                className="hover:text-green-400 italic"
              >
                Series&#39; offical website
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
