import Image from "next/image";
import Link from "next/link";
import { FaImdb } from "react-icons/fa";
import { Akaya_Telivigala } from "next/font/google";
import { Actor } from "@p/assets/types";

///////////
const akayaTelivigala = Akaya_Telivigala({
  weight: ["400"],
  subsets: ["latin"],
});

export default function PersonComponent({
  personObject,
}: {
  personObject: Actor;
}) {
  //   const imagePath500px = 'https://image.tmdb.org/t/p/w500/'
  const imagePath = "https://image.tmdb.org/t/p/original";

  const searchTerm: string = personObject.name;
  // titleSplitArr.at(-2)
  const YTSSearch = `https://yts.mx/browse-movies/${searchTerm}/all/all/0/latest/0/all`;
  return (
    <div className="bg-black pt-1">
      <div
        style={{
          backgroundImage: `url(${imagePath + personObject?.profile_path})`,
        }}
        className="movie_container bg-cover bg-center bg-black bg-opacity-40 bg-blend-multiply"
      >
        <div className=" text-center py-10 bg-black bg-opacity-80">
          <h1 className="text-6xl text-green-200">{personObject?.name}</h1>
        </div>
        <div className="flex flex-wrap items-center gap-3 py-8 px-1">
          <Image
            src={imagePath + personObject?.profile_path}
            alt="poster"
            className=" h-auto"
            width={320}
            height={800}
            placeholder="blur"
            blurDataURL={imagePath + personObject?.profile_path}
            priority
          />
          <div className="nameAndType px-4">
            <p>{personObject?.name}</p>
            <p>{personObject?.birthday}</p>
            <p className="opacity-80 text-gray-400">
              {personObject?.place_of_birth}
            </p>
          </div>
        </div>
        <div className="overviewDiv px-5 bg-black bg-opacity-60">
          <div className="border-b-2 py-6 flex flex-col gap-2">
            <div className="flex flex-wrap gap-x-2">
              <span className="text-center text-gray-300">Known for:</span>
              <p className="text-green-600 font-semibold">
                {personObject?.known_for_department}
              </p>
            </div>
            <div className="flex flex-wrap gap-x-2">
              <span className="text-center text-gray-300">Popularity:</span>
              <p className="text-green-600 font-semibold">
                {personObject?.popularity.toFixed(1)}
              </p>
            </div>
            {personObject.deathday && (
              <div className="flex flex-wrap gap-x-2">
                <span className="text-center text-gray-300">Passed away:</span>
                <p className="text-green-600 font-semibold">
                  {personObject?.deathday}
                </p>
              </div>
            )}
          </div>
          <div className=" py-4 grid text-center">
            <h6
              className={`py-2 font-bold text-2xl text-green-600 ${akayaTelivigala.className} italic`}
            >
              Biography
            </h6>
            <p className="max-w-3xl m-auto">{personObject?.biography}</p>
          </div>
        </div>

        <div className="linksDiv px-5 pb-10 bg-black bg-opacity-60 border-t-2">
          <h6 className="py-2 font-bold text-lg text-green-600">Links</h6>

          <div>
            <Link
              prefetch={false}
              href={YTSSearch}
              target="_blank"
              className="hover:text-green-400 italic"
            >
              search for related Movies Download
            </Link>
          </div>
          <div className=" py-4 grid items-center justify-start text-center">
            <Link
              prefetch={false}
              href={`https://www.imdb.com/name/${personObject?.imdb_id}/`}
              target="_blank"
              className=" text-center"
              title="movies's page on IMDB"
            >
              <FaImdb className=" text-6xl hover:text-green-400" />
            </Link>
          </div>
          {personObject?.homepage && (
            <div>
              <Link
                prefetch={false}
                href={personObject?.homepage}
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
