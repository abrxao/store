"use client";
import { ReactNode } from "react";
import "../globals.css";
import GenreSearch from "@/components/SGcomponents/GenreSearch";
import { Button, Typography } from "@material-tailwind/react";
import { AiOutlineSearch } from "react-icons/ai";
import useSearchStates from "@/store/store";

export default function SearchLayout({ children }: { children: ReactNode }) {
  const { page, search } = useSearchStates();
  function redirect(url: string) {
    window.location.href = url;
  }

  return (
    <>
      <header className="w-full bg-gray-900">
        {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
        <div
          className=" w-full max-w-8xl text-right m-auto
                    px-4 py-3
                    md:px-8 md:py-4
                    lg:px-12 lg:py-6"
        >
          <Typography className="font-normal text-gray-200">
            Procure por genero
          </Typography>

          <div className="flex gap-2 items-end justify-end">
            <GenreSearch />
            <Button
              disabled={search == ""}
              className="p-2
            md:p-3
            "
              onClick={(e) => redirect(`/search-genres/${search}:${page}:1`)}
            >
              <AiOutlineSearch size={19} />
            </Button>
          </div>
        </div>
      </header>
      {children}
    </>
  );
}
