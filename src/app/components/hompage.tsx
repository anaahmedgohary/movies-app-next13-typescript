// imports
import { Viga } from "next/font/google";
const font = Viga({ subsets: ["latin"], weight: ["400"] });
import Link from "next/link";
import Image from "next/image";
import categoriesArr from "@p/assets/categoriesArr";
import SearchBar from "./search";
//////////////
// bg-[url('/assets/images/upbig.jpg')]
export default function Hompage() {
  return (
    <div className="flex flex-col justify-start min-h-screen bg-[url('/assets/images/upbig.jpg')] bg-cover bg-center bg-repeat-x">
      <div className="bg-blue-950 bg-opacity-70 py-8 w-full">
        <h1 className="text-3xl text-center">Movies #1</h1>
        <SearchBar searchType="multi" />
      </div>
      <div className="movieCategories flex-1 w-full text-center flex flex-wrap gap-10 justify-center items-center py-[100px] px-2 lg:px-20">
        {categoriesArr.map((item, index) => {
          return (
            <div
              className="category flex-1 min-w-[320px] max-w-[500px] h-[300px] relative rounded-md overflow-hidden"
              key={index}
            >
              <Image
                src={item.img}
                alt={item.alt}
                // width={280}
                // height={300}
                // className="h-auto flex-1 bg-contain"
                fill={true}
                sizes="(max-width:300px) 100vw, (max-width: 500px) 50vw, 33vw"
                placeholder="blur"
                blurDataURL={item.img}
                priority
              />
              <Link
                href={`${item.href}`}
                title={item.title}
                className=" absolute inset-0 m-auto bg-gray-800  bg-opacity-40 hover:bg-opacity-0 duration-500 flex justify-center text-6xl font-extrabold text-white  backdrop-blur-[2px] hover:backdrop-blur-none group
                "
              >
                <p
                  className={`duration-500 self-end ${font.className} px-2 py-1 flex-1 bg-black bg-opacity-25 group-hover:bg-orange-600 group-hover:border-black border-t-2 border-transparent`}
                >
                  {item.title}
                </p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
