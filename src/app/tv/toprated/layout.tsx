// import "@/app/assets/styles/movies/style.css";
import { Inter } from "next/font/google";
import { childrenType } from "../../../../public/assets/types";
///////////
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Top Rated Series",
  description: "Top Rated Series Page",
};
export default function PopularLayout({ children }: childrenType) {
  return <div className={inter.className}>{children}</div>;
}
