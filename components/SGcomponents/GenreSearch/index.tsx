"use client";
import { useQuery } from "react-query";
import Skeleton from "@/components/SkeletonCreator";
import getGenres from "./getGenres";
import useSearchStates from "@/store/store";

const GenreSearch = () => {
  const { setSearch } = useSearchStates();

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
          onChange={(e) => setSearch(e.target.value)}
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
