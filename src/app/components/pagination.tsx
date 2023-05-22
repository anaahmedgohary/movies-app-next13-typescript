"use client";
import { useState } from "react";
import Link from "next/link";
//////////

export default function Pagination({
  children,
  category,
  page,
  padding,
  queryParams,
  totalPages,
}: {
  children?: React.ReactNode;
  category: string;
  page: number;
  padding: string;
  queryParams?: string;
  totalPages?: number[];
}) {
  const pagesArray = totalPages || [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [currentPage, setCurrentPage] = useState(page);

  //   console.log(page);
  return (
    <>
      {children}
      {/* <div>
        <p>Current page: {currentPage}</p>
      </div> */}
      <div className={padding}>
        <ul className="flex flex-wrap gap-3 justify-center items-center px-5">
          {pagesArray.map((item, index) => {
            return (
              <li
                key={index}
                className=" bg-gray-900 shadow-sm shadow-black drop-shadow-md border border-black border-opacity-40 rounded-md text-xl flex"
              >
                <Link
                  href={`/${category}/${item}${queryParams || ""}`}
                  className={`flex-1 text-center min-w-[52px] py-2 rounded-md duration-200  ${
                    item == currentPage // == to avoid string to number
                      ? "bg-green-800 cursor-default pointer-events-none"
                      : "hover:bg-yellow-600"
                  }`}
                >
                  {item}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
