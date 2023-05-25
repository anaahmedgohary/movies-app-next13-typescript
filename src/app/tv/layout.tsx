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
    <div className="min-h-screen bg-blue-950 pt-8">
      <SearchBar searchType="tv" />
      {children}
    </div>
  );
}
