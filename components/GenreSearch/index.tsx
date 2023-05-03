"use client";
import { useQuery } from "react-query";
import { useSearchContext } from "../SearchContext";
import Skeleton from "../Skeleton/Skeleton";
import getGenres from "./getGenres";

const GenreSearch = () => {
  const searchContext = useSearchContext();

  const { data: genres, isFetching } = useQuery<string[]>(
    "genres",
    async()=>{
      return await getGenres()
    }
    ,
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60, //1minute
    }
  );

  if (!searchContext) return null;
  const { changeSearch } = searchContext;

  return (
    <div >
      {isFetching && <Skeleton className="w-40 h-10 rounded-md" />}
      {!isFetching && (
        <select
          onChange={(e) => changeSearch(e.target.value)}
          className="p-3 text-md rounded-md overflow-hidden loading"
        >
          <option value=''>Select one</option>
          {genres?.map((elem, index) => {
            return <option key={index + 1}>{elem}</option>;
          })}
        </select>
      )}
    </div>
  );
};
export default GenreSearch;
