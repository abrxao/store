"use client";
import { useCallback, useEffect, useState } from "react";
import { useSearchContext } from "../SearchContext";
import axios from "axios";
import { Option } from "@material-tailwind/react";
import Skeleton from "../Skeleton/Skeleton";

const GenreSearch = () => {
  const searchContext = useSearchContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  if (!searchContext) return null;
  const { genres, changeGenres, changeSearch } = searchContext;

  const getGenres = async () => {
    await axios.get("api/get_genres")
      .then((res) => {
        changeGenres(res.data)
        setIsLoading(false)
      })
  };
  getGenres();

  return (
    <div className="p-4">
      {isLoading && <Skeleton className="w-40 h-8 rounded-md" />}
      {!isLoading && (
        <select
          onChange={(e) => changeSearch(e.target.value)}
          className="p-2 rounded-md overflow-hidden loading"
        >
          <option>select one</option>
          {genres.map((elem, index) => {
            return <option key={index + 1}>{elem}</option>;
          })}
        </select>
      )}
    </div>
  );
};
export default GenreSearch;
