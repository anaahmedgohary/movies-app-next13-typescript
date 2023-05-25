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
    <div className="bg-black pt-10">
      <div
        style={{
          backgroundImage: `url(${imagePath + TvSeriesObj?.backdrop_path})`,
        }}
        className="bg-cover bg-center bg-black bg-opacity-80 bg-blend-multiply"
      >
        <div className=" text-center py-10 bg-slate-950 bg-opacity-20">
          <h1 className=" text-6xl">{TvSeriesObj?.name}</h1>
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
          <div className="nameAndType px-4">
            <p>{TvSeriesObj?.name}</p>
            <p>
              Language:{" "}
              {new Intl.DisplayNames(["en"], {
                type: "language",
              }).of(TvSeriesObj?.original_language)}
            </p>
            <p>Tv series</p>
          </div>
        </div>
        <div className="overviewDiv px-5 bg-black bg-opacity-60">
          <div className=" border-b-2">
            <p>Genres: {genresArray.join(" + ")}</p>
            <p>First air date: {TvSeriesObj?.first_air_date}</p>
            <p>Last aired on: {TvSeriesObj.last_air_date}</p>
            <p>
              Last episode aired:{" "}
              {TvSeriesObj?.last_episode_to_air?.episode_number}
            </p>
            <p>Number of seasons: {TvSeriesObj.number_of_seasons}</p>
            <p>Number of episodes: {TvSeriesObj.number_of_episodes}</p>
            <p>Type: {TvSeriesObj?.type}</p>
            <p>Vote average: {TvSeriesObj?.vote_average.toFixed(1)}</p>
            <p>Watch on: {TvSeriesObj?.networks[0]?.name}</p>
            <p>Creator: {TvSeriesObj?.created_by[0]?.name}</p>
            <p>status: {TvSeriesObj?.status}</p>
          </div>
          <div className=" py-4 grid text-center">
            <h6 className="py-2 font-bold text-lg ">overview</h6>
            <p className={`${akayaTelivigala.className} italic`}>
              {TvSeriesObj?.tagline}
            </p>
            <p className="max-w-3xl m-auto">{TvSeriesObj?.overview}</p>
          </div>
        </div>

        <div className="linksDiv px-5 bg-black bg-opacity-60 border-t-2">
          <h6 className="py-2 font-bold text-lg ">Links</h6>
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
