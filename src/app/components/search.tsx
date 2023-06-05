"use client";

import { childrenType } from "../../../public/assets/types";
// import axios from "axios";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
// import colors from "colors/safe";

export default function SearchBar({
  children,
  searchType,
}: {
  children?: React.ReactNode;
  searchType: "tv" | "films" | "person" | "multi";
}) {
  const [searchCategory, setSearchCategory] = useState(`${searchType}`);
  //   const movieLink = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.MOVIEDB_API_KEY}`;

  //   const searchUrl = `https://api.themoviedb.org/3/search/movie?query=god%20father&include_adult=true&language=en-US&page=${
  //     page || 1
  //   }&api_key=${process.env.MOVIEDB_API_KEY}`;
  const [searchValue, setSearchValue] = useState("");

  function handelSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // const query = searchValue.toLowerCase().replace(" ", "%20").trim();
    const query = searchValue.toLowerCase().trim().replace(" ", "%20");

    // return (window.location.href = `http://localhost:8080/search/1?query=${query}`);
    return (window.location.href = `/search/${searchCategory}/1?query=${query}`);
  }
  return (
    <>
      <div className="text-center py-5 w-full flex flex-col justify-center">
        <div className="pt-2 self-center justify-self-end">
          <select
            className="bg-black px-4 py-2 cursor-pointer rounded-md ring-1 ring-offset-0 outline-none"
            name="searchCate"
            id="searchCate"
            onChange={(e) => {
              setSearchCategory(e.target.value);
            }}
          >
            <option value={searchCategory}>Category</option>
            <option value="multi">All</option>
            <option value="films">Movies</option>
            <option value="tv">TV</option>
            <option value="person">People</option>
          </select>
        </div>
        <form
          onSubmit={handelSubmit}
          className="flex flex-wrap gap-2 justify-center items-center"
        >
          <div className="min-w-[300px] w-full sm:max-w-[600px] px-1">
            <input
              className="text-center text-lg py-4 mmin-w-[300px] w-full mmax-w-[600px] rounded-full bg-gray-950 bg-opacity-80 focus:bg-opacity-100 border-none outline-none outline-[0px] outline-offset-0 outline-transparent focus:outline-green-400 focus:outline-[1px] ring-1 ring-offset-0"
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
              placeholder={`${
                searchCategory === "films"
                  ? "Search Movies"
                  : searchCategory === "tv"
                  ? "Search TV"
                  : searchCategory === "person"
                  ? "Search People"
                  : "Search All"
              }`}
              type="search"
              name="searchbar"
              id="searchbar"
              minLength={2}
              maxLength={60}
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
