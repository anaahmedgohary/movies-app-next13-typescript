import { childrenType } from "@p/assets/types";
export const metadata = {
  title: "Trending Tv Series",
  description: "Trending Tv Series Page",
};
export default function UserLayout({ children }: childrenType) {
  return <div>{children}</div>;
}
