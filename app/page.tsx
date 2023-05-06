"use client";

import { Button } from "@material-tailwind/react";
import Link from "next/link";

const Home = () => {
  return (
    <div className=" w-full h-72 flex flex-col items-center justify-center gap-2">
      <div className="text-gray-200 font-bold ">for while is just this...</div>
      <Link href={"/search-genres"}>
        <Button color="blue">search genres</Button>
      </Link>
    </div>
  );
};
export default Home;
