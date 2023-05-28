import { childrenType } from "@p/assets/types";
///////////

export const metadata = {
  title: "Top Rated Series",
  description: "Top Rated Series Page",
};
export default function PopularLayout({ children }: childrenType) {
  return <div className="bg-blue-950">{children}</div>;
}
