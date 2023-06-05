import { childrenType } from "@p/assets/types";
import SearchBar from "@/app/components/search";

export const metadata = {
  title: "Search People",
  description: "Search for stars actors, directors and writers etc.",
};

export default function RootLayout({ children }: childrenType) {
  return (
    <div className={`min-h-screen bg-blue-950 pt-8`}>
      <h1 className="text-center text-3xl">Search People</h1>
      <SearchBar searchType="person" />
      {children}
    </div>
  );
}
