"use client";
import MovieCard from "@/components/MovieCard";
import PrevNextButton from "@/components/SGcomponents/NextPrevButtons";
import SkeletonCreator from "@/components/SkeletonCreator";
import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";

export default function PagesSearch({ params }: { params: { genre: string } }) {
  const [search, pg, pgs] = params.genre.split("%3A");
  const page = parseInt(pg);
  const [ pages, setPages] = useState<number>(parseInt(pgs))
  const { data: moviesQuery, isFetching } = useQuery(
    "movies",
    async () => {
      const { data } = await axios.post("/api/search", {
        search: search,
        page: page - 1,
      });
      console.log(data.data);
      setPages(Math.floor(data.moviesCount / 20));
      return data.data;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div className="">
      <div className="w-full flex flex-col items-center ">
        <>
          <div className="flex flex-col gap-4 mt-4">
            <PrevNextButton genre={search} page={page} pages={pages} />
          </div>

          <div className="w-full p-2 flex flex-wrap justify-center gap-y-6 md:gap-8 ">
            {isFetching && (
              <>
                <SkeletonCreator
                  className="w-cardMovie aspect-[3/4] rounded-lg m-4"
                  quantity={10}
                />
              </>
            )}
            {!isFetching &&
              moviesQuery.map((elem: any, index: number) => {
                return (
                  <MovieCard
                    src={elem.poster}
                    title={elem.title}
                    key={index + 1}
                    metacritic={elem.metacritic}
                    genres={elem.genres}
                    plot={elem.plot}
                  />
                );
              })}
          </div>
          <div className="flex flex-col gap-4 mt-4">
            <PrevNextButton genre={search} page={page} pages={parseInt(pgs)} />
          </div>
        </>
      </div>
    </div>
  );
}
