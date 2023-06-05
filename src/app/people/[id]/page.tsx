////////////
import PersonComponent from "@/app/components/person-component";
import { Actor } from "@p/assets/types";
import colors from "colors/safe";

//////////

async function fetchpersonObj(personId: number | string): Promise<Actor> {
  // let url = 'https://api.themoviedb.org/3/tv/series_id?language=en-US';
  const SeriesLink = `https://api.themoviedb.org/3/person/${personId}?language=en-US&api_key=${process.env.MOVIEDB_API_KEY}`;

  const response: Actor = await fetch(SeriesLink, {
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
  return response;
}

export async function generateMetadata({
  params: { id },
}: {
  params: { id: number | string };
}) {
  const personObj: Actor = await fetchpersonObj(id);
  if (!personObj && typeof window !== "undefined") {
    alert("some error.. please reload");
    return;
  }
  return {
    title: `${personObj?.name || "Actor"}`,
    description: `${
      personObj?.known_for_department || "description"
    }. person:  ${personObj?.name}`,
  };
}

export default async function SeriesPage({
  params: { id },
}: {
  params: { id: number };
}) {
  const personObj: Actor = await fetchpersonObj(id);
  if (!personObj) {
    return <div>Some Error</div>;
  }

  return (
    <div>
      <PersonComponent personObject={personObj} />
    </div>
  );
}
