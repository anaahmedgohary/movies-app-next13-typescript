import { Roboto_Mono } from "next/font/google";

const roboto_Mono = Roboto_Mono({ subsets: ["latin"] });

export const metadata = {
  title: "thy profile",
  description: "nola app",
};

type childrenType = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: childrenType) {
  return (
    <html lang="en">
      <body className={roboto_Mono.className}>{children}</body>
    </html>
  );
}
