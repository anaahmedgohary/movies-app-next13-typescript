import { Suspense } from "react";
import { TvSeriesObject } from "@p/assets/types";
import TvMapper from "@/app/components/tvMapper";

async function fetchSeriesList(listurl: string) {
  const response = await fetch(listurl, {
    next: {
      revalidate: 60 * 60 * 48,
    },
  });
  const result = await response.json();
  return result.results;
}

export default async function TrendingSeriesPage() {
  const listurl = `https://api.themoviedb.org/3/trending/tv/week?language=en-US&api_key=${process.env.MOVIEDB_API_KEY}`;

  const tvSeriesArray: TvSeriesObject[] = await fetchSeriesList(listurl);
  return (
    <div className="e text-center bg-blue-950 py-9">
      <div className="text-center">
        <h1 className="text-3xl">Trending series</h1>
      </div>
      <Suspense
        fallback={<div className="text-center"> loading Series...</div>}
      >
        <TvMapper seriesArray={tvSeriesArray} />
      </Suspense>
    </div>
  );
}
