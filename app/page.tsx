"use client";
import { FormEvent, useCallback, useState } from "react";
import axios from "axios";
import Image from "next/image";

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
    handleSearch(page);
  };
  const handlePrev = (e: FormEvent) => {
    setPage((page) => page - 1);
    handleSubmit(e, page - 1);
  };
  const handleNext = (e: FormEvent) => {
    setPage((page) => page + 1);
    handleSubmit(e, page + 1);
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
                  onClick={(e) => handlePrev(e)}
                  disabled={page === 0}
                >
                  prev
                </button>
                <button
                  type="button"
                  className="p-1 bg-gray-200"
                  onClick={(e) => handleNext(e)}
                >
                  next
                </button>
              </div>
            </form>

            <h2>page {page + 1}</h2>
            {/* <pre>{JSON.stringify(movies, null, 2)}</pre> */}
            {movies.map((elem, index) => {
              return (
                <div key={index + 1}>
                  {elem.title}
                  <Image
                    src={elem.poster}
                    width={300}
                    height={300}
                    alt={`${elem.title} poster's`}
                  />
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
