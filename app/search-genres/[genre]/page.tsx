"use client";
import MovieCard from "@/components/MovieCard";
import PrevNextButton from "@/components/SGcomponents/NextPrevButtons";
import SkeletonCreator from "@/components/SkeletonCreator";
import useSearchStates from "@/store/store";
import { Chip } from "@material-tailwind/react";
import axios from "axios";
import { useQuery } from "react-query";

export default function PagesSearch({ params }: { params: { genre: string } }) {
  const [search, pg] = params.genre.split("%3Apage%3D");
  const page = parseInt(pg);
  const { allPages, setAllPages } = useSearchStates();

  const { data: moviesQuery, isFetching } = useQuery(
    "movies",
    async () => {
      const { data } = await axios.post("/api/search", {
        search: search,
        page: page - 1,
      });

      setAllPages(Math.floor(data.moviesCount / 20));
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
            <PrevNextButton genre={search} page={page} pages={allPages} />
          </div>

          <div className="w-full p-2 flex flex-wrap justify-center gap-y-6 md:gap-8 ">
            {isFetching && (
              <>
                <SkeletonCreator
                  className="w-cardMovie aspect-[3/4] rounded-lg"
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
                  />
                );
              })}
          </div>
          <div className="flex flex-col gap-4 mt-4">
            <PrevNextButton genre={search} page={page} pages={allPages} />
          </div>
        </>
      </div>
    </div>
  );
}
