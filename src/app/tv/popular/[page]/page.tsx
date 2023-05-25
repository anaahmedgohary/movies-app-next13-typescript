import { Suspense } from "react";
import colors from "colors/safe";
// import TopRatedMovies from "@/app/components/listtopratedmovies";
import TvMapper from "@/app/components/tvMapper";
import Pagination from "@/app/components/pagination";
import { TvSeriesObject } from "@p/assets/types";
///////////////////

export default async function PopularTvPage({
  params: { page },
}: {
  params: { page: string };
}) {
  // const baseUrl = process.env.BASE_URL || "/api";
  // const listurl = `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${page}&api_key=${process.env.MOVIEDB_API_KEY}`;

  const listurl = `https://api.themoviedb.org/3/discover/tv?include_adult=false&language=en-US&page=${page}&api_key=${process.env.MOVIEDB_API_KEY}&sort_by=popularity.desc&with_original_language=en`;
  // &sort_by=popularity.asc
  const response: TvSeriesObject[] = await fetch(listurl, {
    next: {
      revalidate: 60 * 60 * 48,
    },
  })
    .then((res) => res.json())
    .then((json) => json.results)
    .catch((err) => {
      console.log(err);
    });

  // const seriesObjArray: TvSeriesObject[] = response.sort(
  //   (a: TvSeriesObject, b: TvSeriesObject) => b.vote_average - a.vote_average
  // );

  return (
    <>
      <div className="pt-8">
        <Pagination category={"tv/popular"} page={page} padding={"pt-8 pb-2"}>
          <div className="text-center">
            <h1 className="text-3xl">Popular series</h1>
          </div>
        </Pagination>

        <div className="e text-center bg-blue-950">
          <Suspense
            fallback={<div className="text-center"> loading Series...</div>}
          >
            <TvMapper seriesArray={response} />
          </Suspense>
        </div>
        <Pagination
          category={"tv/popular"}
          page={page}
          padding={"pt-8 pb-14"}
        />
      </div>
    </>
  );
}
