import "./globals.css";
import { Inter } from "next/font/google";
import FooterComponent from "./components/Footer";
import HeaderComponent from "./components/Header";
///////////

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Movies #1",
  description:
    "Movies wep app. best new movies, popular movies, trending movies, top rated movies, search movies, old movies, classic movies, movie details",
};
// type childrenType = {
//   children: React.ReactNode
// }
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <HeaderComponent />
        </header>
        {children}
        <footer>
          <FooterComponent />
        </footer>
      </body>
    </html>
  );
}
