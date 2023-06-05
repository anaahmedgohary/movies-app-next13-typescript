// import { childrenType } from "../../../public/assets/types";
import { childrenType } from "@p/assets/types";
import SearchBar from "@/app/components/search";

///////////

export default function PersonLayout({ children }: childrenType) {
  return (
    <div className="min-h-screen">
      <div className="pt-6 pb-4 bg-blue-950 bg-opacity-70">
        <SearchBar searchType="person" />
      </div>
      {children}
    </div>
  );
}
