// import { childrenType } from "../../../public/assets/types";
import { childrenType } from "@p/assets/types";
import SearchBar from "@/app/components/search";

///////////

export const metadata = {
  title: "Tv Series",
  description: "Tv Series Page",
};
export default function PopularLayout({ children }: childrenType) {
  return (
    <div className="min-h-screen bg-[url('/assets/images/upbig.jpg')] bg-cover bg-center bg-repeat-x">
      <div className="pt-6 pb-4 bg-blue-950 bg-opacity-70">
        <h1 className="text-3xl text-center">Tv Series</h1>
        <SearchBar searchType="tv" />
      </div>
      {children}
    </div>
  );
}
