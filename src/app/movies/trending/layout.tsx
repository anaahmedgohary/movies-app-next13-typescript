import { childrenType } from "../../../../public/assets/types";
export const metadata = {
  title: "Trending Movies",
  description: "Trending Movies Page",
};
export default function UserLayout({ children }: childrenType) {
  return <div>{children}</div>;
}
