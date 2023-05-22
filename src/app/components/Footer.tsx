"use client";

import Link from "next/link";
import { useState } from "react";
import { FaBeer, FaUser } from "react-icons/fa";

export default function FooterComponent() {
  const [username, setUserName] = useState("Anonymous");
  const LinkClasses = `duration-100 hover:text-green-600`;
  return (
    <div className="bg-black text-center pb-4">
      <div className="text-center flex flex-wrap gap-5 justify-center items-center pb-2">
        <div>
            <p>MovieNo1</p>
        </div>
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
      <div className="text-center">
        <p>By using this site you agree to and accept our User Agreement, which can be read here</p>

      </div>
    </div>
  );
}
