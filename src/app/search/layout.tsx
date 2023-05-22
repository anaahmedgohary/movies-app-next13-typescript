import { childrenType } from "@/types";
///////////

export const metadata = {
  title: "Popular Movies",
  description: "Popular Movies Page",
};
export default function PopularLayout({ children }: childrenType) {
  return <div className="min-h-screen">{children}</div>;
}
