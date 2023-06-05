import { Roboto_Mono } from "next/font/google";

const roboto_Mono = Roboto_Mono({ subsets: ["latin"] });
// import { childrenType } from "types.ts";
// import { childrenType } from "../../types";
import { childrenType } from "@p/assets/types";
import SearchBar from "@/app/components/search";

export const metadata = {
  title: "search stars",
  description: "search stars",
};

// type childrenType = {
//   children: React.ReactNode;
// };

export default function RootLayout({ children }: childrenType) {
  return (
    <div className={roboto_Mono.className}>
      <SearchBar searchType="multi" />
      {children}
    </div>
  );
}
