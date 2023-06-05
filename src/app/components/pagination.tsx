"use client";
import { useState } from "react";
import Link from "next/link";
import { FaChevronCircleRight, FaChevronCircleLeft } from "react-icons/fa";
//////////

export default function SegmentPagination({
  children,
  category,
  page,
  padding,
  queryParams,
  totalPages,
}: {
  children?: React.ReactNode;
  category: string;
  page: string;
  padding: string;
  queryParams?: string;
  totalPages?: number[];
}) {
  const pagesArray =
    totalPages ||
    (() => {
      let f = 0;
      let arr = [];
      while (f < 30) {
        f++;
        arr.push(f);
      }
      return arr;
    })();
  const segmentsArr: Array<number[]> = [];
  function segmentation(pagesArray: number[]) {
    let i = 0;
    while (pagesArray.length >= i + 10) {
      let seg = pagesArray.slice(i, i + 10);
      segmentsArr.push(seg);
      i += 10;
    }
    if (i < pagesArray.length) {
      let lastSeg = pagesArray.slice(i);
      segmentsArr.push(lastSeg);
    }
  }
  segmentation(pagesArray);
  const [currentPage, setCurrentPage] = useState(parseInt(page));

  const initialSegmentIndex = segmentsArr.findIndex((item) => {
    return item.includes(currentPage);
  });
  const [segmentIndex, setSegmentIndex] = useState(initialSegmentIndex);
  const currentSegment = segmentsArr[segmentIndex];

  //   console.log(page);
  return (
    <>
      {children}
      {/* <div>
        <p>Current page: {currentPage}</p>
      </div> */}
      <div className={padding}>
        <ul className="flex flex-wrap gap-3 justify-center items-center px-5">
          {currentSegment.map((item, i) => {
            return (
              <li
                key={i}
                className=" bg-gray-900 shadow-sm shadow-black drop-shadow-md border border-black border-opacity-40 rounded-md text-xl flex"
              >
                <Link
                  href={`/${category}/${item}${queryParams || ""}`}
                  className={`flex-1 text-center min-w-[52px] py-2 rounded-md duration-200  ${
                    item === currentPage // == to avoid string to number
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
        <div className="text-center mt-2 py-4 text-3xl flex justify-center content-center gap-8">
          <button
            className={`previous duration-100 ${
              segmentIndex > 0
                ? "hover:text-green-500"
                : "pointer-events-none opacity-60"
            } `}
            onClick={() => {
              setSegmentIndex((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
            }}
          >
            <FaChevronCircleLeft />
          </button>
          <button
            className={`next duration-100 ${
              segmentIndex + 1 < segmentsArr.length
                ? "hover:text-green-500"
                : "pointer-events-none opacity-60"
            }`}
            onClick={() => {
              setSegmentIndex((prev) =>
                prev + 1 < segmentsArr.length ? prev + 1 : prev
              );
            }}
          >
            <FaChevronCircleRight />
          </button>
        </div>
      </div>
    </>
  );
}
