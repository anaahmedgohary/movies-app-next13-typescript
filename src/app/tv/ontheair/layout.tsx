import { childrenType } from "../../../../public/assets/types";
///////////

export const metadata = {
  title: "On the Air Series",
  description: "On the Air Series Page",
};
export default function PopularLayout({ children }: childrenType) {
  return <div className="bg-blue-950">{children}</div>;
}
