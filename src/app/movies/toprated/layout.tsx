import { childrenType } from "../../../../public/assets/types";

export const metadata = {
  title: "Top Rated Movies",
  description: "Top Rated Movies Page",
};
export default function UserLayout({ children }: childrenType) {
  return <div className="pb-20">{children}</div>;
}
