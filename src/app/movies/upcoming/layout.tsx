import { childrenType } from "../../../../public/assets/types";

export const metadata = {
  title: "Upcoming Movies",
  description: "Upcoming Movies Page",
};
export default function UserLayout({ children }: childrenType) {
  return <div>{children}</div>;
}
