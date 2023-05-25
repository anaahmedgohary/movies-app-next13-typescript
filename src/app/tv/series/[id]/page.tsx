////////////
import TvSeriesComponent from "@/app/components/tv-series";
import { TvSeriesObject } from "@p/assets/types";

//////////

async function fetchTvSeriesObj(
  seriesId: number | string
): Promise<TvSeriesObject> {
  // let url = 'https://api.themoviedb.org/3/tv/series_id?language=en-US';
  const SeriesLink = `https://api.themoviedb.org/3/tv/${seriesId}?language=en-US&api_key=${process.env.MOVIEDB_API_KEY}`;

  const response: TvSeriesObject = await fetch(SeriesLink, {
    next: {
      revalidate: 60 * 60 * 24,
    },
  })
    .then((res) => res.json())
    .then((json) => json)
    .catch((err) => {
      console.log(err);
      return false;
    });
  // console.log("response: ", response);
  return response;
}

export async function generateMetadata({
  params: { id },
}: {
  params: { id: number | string };
}) {
  const TvSeriesObj: TvSeriesObject = await fetchTvSeriesObj(id);
  if (!TvSeriesObj && typeof window !== "undefined") {
    alert("some error.. please reload");
    return;
  }
  return {
    title: `Tv series: ${TvSeriesObj?.name}`,
    description: `${TvSeriesObj?.tagline || "description"} From ${
      TvSeriesObj?.name
    }`,
  };
}

export default async function SeriesPage({
  params: { id },
}: {
  params: { id: number };
}) {
  const TvSeriesObj: TvSeriesObject = await fetchTvSeriesObj(id);
  // console.log(TvSeriesObj);
  if (!TvSeriesObj && typeof window !== "undefined") {
    alert("some error.. please reload");
    return;
  }

  return (
    <div>
      <TvSeriesComponent TvSeriesObj={TvSeriesObj} />
    </div>
  );
}
