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
      <SearchBar />
      {children}
    </div>
  );
}
