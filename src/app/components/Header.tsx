// "use client";

import Link from "next/link";
// import { FaBeer, FaUser } from "react-icons/fa";

export default function HeaderComponent() {
  const LinkClasses = `min-w-[100px] border py-2 rounded-md duration-300 hover:bg-green-600 bg-black bg-opacity-50`;
  return (
    <div
      className="text-center bg-center bg-cover bg-repeat-x"
      style={{
        backgroundImage:
          "url('/assets/images/the_fellowship_of_the_ring.jpeg')",
      }}
    >
      <div className="text-center pb-10 pt-8 px-20 flex flex-wrap gap-5 justify-center items-center">
        <Link className={LinkClasses} href="">
          Home
        </Link>
        <Link className={LinkClasses} href="/movies/popular/1">
          Popular
        </Link>
        <Link className={LinkClasses} href="/movies/trending">
          Trending
        </Link>
        <Link className={LinkClasses} href="/movies/upcoming/1">
          Upcoming
        </Link>
        <Link className={LinkClasses} href="/movies/toprated/1">
          Top rated
        </Link>
        <Link className={LinkClasses} href="/tv">
          Tv
        </Link>
      </div>
    </div>
  );
}
