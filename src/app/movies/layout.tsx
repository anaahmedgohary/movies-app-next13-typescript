import { childrenType } from "../../../public/assets/types";
import SearchBar from "@/app/components/search";

///////////

export const metadata = {
  title: "Movies",
  description: "Movies Page",
};
export default function PopularLayout({ children }: childrenType) {
  return (
    <div className="min-h-screen bg-blue-950 pt-8">
      <div>
        <h1 className="text-3xl text-center">Movies #1</h1>
      </div>
      <SearchBar searchType="films" />
      {children}
    </div>
  );
}
