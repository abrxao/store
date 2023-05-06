"use client";
import { useQuery } from "react-query";
import { useSearchContext } from "../SearchContext";
import Skeleton from "@/components/SkeletonCreator";
import getGenres from "./getGenres";

const GenreSearch = () => {
  const searchContext = useSearchContext();

  const { data: genres, isFetching } = useQuery<string[]>(
    "genres",
    async () => {
      return await getGenres();
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60, //1minute
    }
  );

  if (!searchContext) return null;
  const { changeSearch } = searchContext;

  return (
    <div>
      {isFetching ? (
        <Skeleton
          className="w-32 h-8 rounded
          md:w-40 md:h-10
          
          "
          quantity={1}
        />
      ) : (
        <select
          onChange={(e) => changeSearch(e.target.value)}
          className="p-2 text-md rounded-md overflow-hidden
          md:p-3
          "
        >
          <option value="">Select one</option>
          {genres?.map((elem, index) => {
            return <option key={index + 1}>{elem}</option>;
          })}
        </select>
      )}
    </div>
  );
};
export default GenreSearch;
