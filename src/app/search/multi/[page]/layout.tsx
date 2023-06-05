import { childrenType } from "@p/assets/types";
import SearchBar from "@/app/components/search";

export const metadata = {
  title: "Search All",
  description:
    "Search all categories like movies, tv, actors and directors etc.",
};

export default function RootLayout({ children }: childrenType) {
  return (
    <div className={`min-h-screen bg-blue-950 pt-8`}>
      <h1 className="text-center text-3xl">Search All</h1>
      <SearchBar searchType="multi" />
      {children}
    </div>
  );
}
