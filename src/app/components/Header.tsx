"use client";

import Link from "next/link";
import { useState } from "react";
import { FaBeer, FaUser } from "react-icons/fa";

export default function HeaderComponent() {
  const [username, setUserName] = useState("Anonymous");
  const LinkClasses = `min-w-[100px] border py-2 rounded-md duration-300 hover:bg-green-600`;
  return (
    <div>
      <div className="text-center pb-10 pt-8 px-20 flex flex-wrap gap-5 justify-center items-center bg-gray-800 border-b-2">
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
      </div>
    </div>
  );
}
