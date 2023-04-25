"use client";
import { FormEvent, useCallback, useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "@/components/MovieCard";
import SearchProvider, { useSearchContext } from "@/components/SearchContext";
import GenreSearch from "@/components/GenreSearch";

function SearchPage() {
  const searchContext = useSearchContext();
  if (!searchContext) return null;
  const { changePage, movies, changeMovies, search, page } = searchContext;

  const handleSubmit = (e: FormEvent, page: number) => {
    e.preventDefault();
    changePage(page);
    handleSearch(page);
  };
  const handleSearch = async (page: number) => {
    try{
      await axios
      .post("api/search", {
        search: search,
        page: page,
      })
      .then((res) => {
        changeMovies(res.data);
      });
    }catch(error){
      console.error("Erro ao se conectar ao servidor:", error);
    }
    
  };

  return (
    <div>
      <form>
        <div className="p-2 w-full flex flex-col items-center justify-center">
          <label htmlFor="genres_input">procure por genero</label>

          <GenreSearch />

          <button
            type="submit"
            className="p-2 border bg-gray-200"
            onClick={(e) => handleSubmit(e, 0)}
          >
            search
          </button>
        </div>
      </form>
      <div className="w-full flex flex-col items-center">
        {movies.length === 0 && <div>sem resultados</div>}
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
            <div className="p-4 flex flex-wrap justify-around gap-4">
              {movies.map((elem, index) => {
                return (
                  <div key={index + 1}>
                    <MovieCard src={elem.poster} title={elem.title} />
                  </div>
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
