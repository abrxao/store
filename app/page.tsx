"use client";
import { FormEvent, useCallback, useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "@/components/MovieCard";
import SearchProvider, { useSearchContext } from "@/components/SearchContext";
import GenreSearch from "@/components/GenreSearch";
import Skeleton from "@/components/Skeleton/Skeleton";
import { Button } from "@material-tailwind/react";
import UseAnimations from "react-useanimations";
import infinity from "react-useanimations/lib/infinity";
import { BsSearch } from "react-icons/bs";

function SearchPage() {
  const searchContext = useSearchContext();
  const [loadingSearch, setLoadingSearch] = useState<boolean>(false);
  if (!searchContext) return null;
  const { changePage, movies, changeMovies, search, page } = searchContext;

  const handleSubmit = (e: FormEvent, page: number) => {
    e.preventDefault();
    changePage(page);
    if (search) {
      handleSearch(page);
    } else {
      alert("escolha um genero");
    }
  };

  const handleSearch = async (page: number) => {
    setLoadingSearch(true);
    await axios
      .post("api/search", {
        search: search,
        page: page,
      })
      .then((res) => {
        changeMovies(res.data);
      })
      .finally(() => {
        setLoadingSearch(false);
      });
  };

  return (
    <div>
      <form>
        <div className="py-4 px-2 bg-gray-900 w-full flex flex-col items-end">
          <div className="py-2">
            <label htmlFor="genres_input" className="text-gray-200 font-thin">
              Procure por gênero
            </label>
          </div>
          <div className="flex gap-2 items-center">
            <GenreSearch />
            {loadingSearch && (
              <div className=" overflow-hidden rounded-md">
                <Skeleton className="w-full border overflow-hidden rounded-md cursor-wait brightness-110">
                  <Button
                    disabled={loadingSearch}
                    className="flex items-center gap-2 p-2"
                  >
                    <UseAnimations
                      animation={infinity}
                      fillColor="#fff"
                      strokeColor="#fff"
                    />
                  </Button>
                </Skeleton>
              </div>
            )}
            {!loadingSearch && (
              <Button
                type="submit"
                onClick={(e) => handleSubmit(e, 0)}
                className="brightness-110 p-4"
                disabled={loadingSearch}
              >
                <BsSearch className="text-md"/>
              </Button>
            )}
          </div>
        </div>
      </form>
      <div className="w-full flex flex-col items-center">
        {movies.length === 0 && (
          <div>
            {loadingSearch && (
              <div className="p-4 flex flex-wrap justify-around gap-4">
                <Skeleton className="w-[300px] aspect-[3/4] rounded-lg" />
                <Skeleton className="w-[300px] aspect-[3/4] rounded-lg" />
                <Skeleton className="w-[300px] aspect-[3/4] rounded-lg" />
                <Skeleton className="w-[300px] aspect-[3/4] rounded-lg" />
                <Skeleton className="w-[300px] aspect-[3/4] rounded-lg" />
                <Skeleton className="w-[300px] aspect-[3/4] rounded-lg" />
                <Skeleton className="w-[300px] aspect-[3/4] rounded-lg" />
                <Skeleton className="w-[300px] aspect-[3/4] rounded-lg" />
                <Skeleton className="w-[300px] aspect-[3/4] rounded-lg" />
                <Skeleton className="w-[300px] aspect-[3/4] rounded-lg" />
              </div>
            )}
          </div>
        )}
        {movies.length > 0 && (
          <>
            <form action="">
              <div className="flex gap-1 my-2">
                <button
                  type="button"
                  className="p-1 bg-gray-200"
                  onClick={(e) => handleSubmit(e, page - 1)}
                  disabled={page === 0}
                >
                  prev
                </button>
                <button
                  type="button"
                  className="p-1 bg-gray-200"
                  onClick={(e) => handleSubmit(e, page + 1)}
                >
                  next
                </button>
              </div>
            </form>

            <h2>page {page + 1}</h2>
            <div className="w-full p-2 flex flex-wrap justify-center gap-y-4">
              {loadingSearch && (
                <>
                  <Skeleton className="w-cardMovie aspect-[3/4] rounded-lg" />
                  <Skeleton className="w-cardMovie aspect-[3/4] rounded-lg" />
                  <Skeleton className="w-cardMovie aspect-[3/4] rounded-lg" />
                  <Skeleton className="w-cardMovie aspect-[3/4] rounded-lg" />
                  <Skeleton className="w-cardMovie aspect-[3/4] rounded-lg" />
                  <Skeleton className="w-cardMovie aspect-[3/4] rounded-lg" />
                  <Skeleton className="w-cardMovie aspect-[3/4] rounded-lg" />
                  <Skeleton className="w-cardMovie aspect-[3/4] rounded-lg" />
                  <Skeleton className="w-cardMovie aspect-[3/4] rounded-lg" />
                  <Skeleton className="w-cardMovie aspect-[3/4] rounded-lg" />
                </>
              )}
              {!loadingSearch &&
                movies.map((elem, index) => {
                  return (
                    <MovieCard
                      src={elem.poster}
                      title={elem.title}
                      key={index + 1}
                    />
                  );
                })}
            </div>
            <form action="">
              <div className="flex gap-1 my-2">
                <button
                  type="button"
                  className="p-1 bg-gray-200"
                  onClick={(e) => handleSubmit(e, page - 1)}
                  disabled={page === 0}
                >
                  prev
                </button>
                <button
                  type="button"
                  className="p-1 bg-gray-200"
                  onClick={(e) => handleSubmit(e, page + 1)}
                >
                  next
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

const Home = () => (
  <SearchProvider>
    <SearchPage />
  </SearchProvider>
);
export default Home;
