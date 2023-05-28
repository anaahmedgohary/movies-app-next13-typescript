import { childrenType } from "@p/assets/types";
import SearchBar from "@/app/components/search";

///////////

export const metadata = {
  title: "Popular Movies",
  description: "Popular Movies Page",
};
export default function PopularLayout({ children }: childrenType) {
  return (
    <div className="min-h-screen bg-blue-950 pt-8">
      <SearchBar searchType="tv" />
      {children}
    </div>
  );
}
