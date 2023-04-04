"use client";
import { FormEvent, useCallback, useState } from "react";
import axios from "axios";
import Image from "next/image";
import MovieCard from "@/components/MovieCard";

export default function Home() {
  const [page, setPage] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [movies, setMovies] = useState<any[]>([]);

  const handleSearch = useCallback(
    async (page: number) => {
      const { data } = await axios.post("api/search", {
        search: search,
        page: page,
      });
      setMovies(data);
    },
    [page, search]
  );

  const handleSubmit = (e: FormEvent, page: number) => {
    e.preventDefault();
    setPage(page)
    handleSearch(page);
  };

  return (
    <div>
      <form>
        <div className="p-2 w-full flex flex-col items-center justify-center">
          <label htmlFor="genres_input">procure por genero</label>
          <input
            type="text"
            id="genres_input"
            className="border p-1 bg-black text-white rounded-md"
            onChange={(e) => setSearch(e.target.value)}
          />
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
                  onClick={(e) => handleSubmit(e, page -1)}
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
            <div className="p-4 flex flex-wrap justify-between gap-y-4">
              {movies.map((elem, index) => {
              return (
                <div key={index +  1}>
                  <MovieCard src={elem.poster} title={elem.title}/>
                </div>
              );
            })}
            </div>
            
          </>
        )}
      </div>
    </div>
  );
}
