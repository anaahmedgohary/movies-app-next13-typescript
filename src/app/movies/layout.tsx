import { childrenType } from "@/types";
///////////

export const metadata = {
  title: "Movies",
  description: "Movies Page",
};
export default function PopularLayout({ children }: childrenType) {
  return <div className="min-h-screen">{children}</div>;
}
