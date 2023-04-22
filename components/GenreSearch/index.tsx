import { useCallback } from "react";
import { useSearchContext } from "../SearchContext";
import axios from "axios";
import { Option } from "@material-tailwind/react";

const GenreSearch = () => {
  const searchContext = useSearchContext();
  if(!searchContext) return null;
  const {genres, changeGenres, changeSearch} = searchContext;
  
  const getGenres = async () => {
    const { data } = await axios.post("api/get_genres");
    return changeGenres(data);
  };
  getGenres();
  
  return (
    <div className="">
      <select
        onChange={e=>changeSearch(e.target.value)}
        className="p-2 rounded-md overflow-hidden"
        >
        {genres.map((elem, index) => {
          return <option key={index + 1}>{elem}</option>;
        })}
      </select>
    </div>
  );
};
export default GenreSearch;
