"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState<number>(0);

  const handleSearch = async () => {
    const { data } = await axios({
      method: "post",
      url: "api/search",
      data: {
        search: search,
        page: page,
      },
    });
    setData(data);
  };

  const handlePrev = async () => {
    setPage((page) => page - 1);
    handleSearch();
  };

  const handleNext = () => {
    setPage((page) => page + 1);
    handleSearch();
  };

  return (
    <div>
      <div className="p-2 w-full flex flex-col items-center justify-center">
        <label htmlFor="genres_input">procure por genero</label>
        <input
          type="text"
          id="genres_input"
          className="border p-1 bg-black text-white rounded-md"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="p-2 border bg-gray-200" onClick={handleSearch}>
          search
        </button>
        <div className="flex gap-1 my-2">
          <button
            className="p-1 bg-gray-200"
            onClick={handlePrev}
            disabled={page === 1}
          >
            prev
          </button>
          <button
            className="p-1 bg-gray-200"
            disabled={data.length < 20}
            onClick={handleNext}
          >
            next
          </button>
        </div>
        <h2>page {page + 1}</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
      {/* {data.poster != "" && (
        <Image
          src={data.poster as string}
          width={200}
          height={200}
          alt="movie poster"
        />
      )} */}
    </div>
  );
}
