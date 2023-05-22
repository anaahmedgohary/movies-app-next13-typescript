"use client";

import { childrenType } from "@/types";
// import axios from "axios";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
// import colors from "colors/safe";

export default function SearchBar({ children }: childrenType) {
  //   const movieLink = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.MOVIEDB_API_KEY}`;

  //   const searchUrl = `https://api.themoviedb.org/3/search/movie?query=god%20father&include_adult=true&language=en-US&page=${
  //     page || 1
  //   }&api_key=${process.env.MOVIEDB_API_KEY}`;
  const [searchValue, setSearchValue] = useState("");

  function handelSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // const query = searchValue.toLowerCase().replace(" ", "%20").trim();
    const query = searchValue.toLowerCase().trim().replace(" ", "%20");
    // setTimeout(() => {
    //   // return (window.location.href = `http://localhost:8080/search/${query}/1`);
    //   return (window.location.href = `http://localhost:8080/search/1?query=${query}`);
    // }, 3000);
    return (window.location.href = `http://localhost:8080/search/1?query=${query}`);
  }
  return (
    <>
      <div className="text-center py-5 w-full bg-black">
        <form
          onSubmit={handelSubmit}
          className="flex flex-wrap gap-2 justify-center items-center"
        >
          <div>
            <input
              className="text-center text-lg py-4 min-w-[300px] rounded-full bg-gray-800 outline-yellow-200 border-none"
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
              placeholder="Search"
              type="search"
              name="searchbar"
              id="searchbar"
              min={2}
              minLength={2}
              maxLength={60}
              max={60}
              required
            />
          </div>
          <div className="">
            <button className="text-3xl hover:text-green-400" title="search">
              <FaSearch />
            </button>
          </div>
        </form>
      </div>
      {children}
    </>
  );
}
