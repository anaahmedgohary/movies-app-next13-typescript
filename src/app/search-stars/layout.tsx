import { Roboto_Mono } from "next/font/google";

const roboto_Mono = Roboto_Mono({ subsets: ["latin"] });
// import { childrenType } from "types.ts";
// import { childrenType } from "../../types";
import { childrenType } from "../../../public/assets/types";

export const metadata = {
  title: "search stars",
  description: "search stars",
};

// type childrenType = {
//   children: React.ReactNode;
// };

export default function RootLayout({ children }: childrenType) {
  return (
    <html lang="en">
      <body className={roboto_Mono.className}>{children}</body>
    </html>
  );
}
