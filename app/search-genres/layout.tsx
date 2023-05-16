"use client";
import { ReactNode } from "react";
import "../globals.css";
import GenreSearch from "@/components/SGcomponents/GenreSearch";
import { Button, Typography } from "@material-tailwind/react";
import { AiOutlineSearch } from "react-icons/ai";
import Link from "next/link";
import useSearchStates from "@/store/store";

export default function SearchLayout({ children }: { children: ReactNode }) {
  const { page, search } = useSearchStates();
  function redirect(url: string) {
    window.location.href = url;
  }

  return (
    <>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <div className=" w-full bg-gray-900 px-8 py-4 text-right">
          <Typography className="font-normal text-gray-200">
            Procure por genero
          </Typography>

          <div className="flex gap-2 items-end justify-end">
            <GenreSearch />
            <Button
              disabled={search == ""}
              className="p-2"
              onClick={(e) => redirect(`./${search}:page=${page}`)}
            >
              <AiOutlineSearch size={19} />
            </Button>
          </div>
      </div>
      {children}
    </>
  );
}
