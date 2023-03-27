"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState({ poster: "" });

  async function teste() {
    const { data } = await axios.get("api/top20");
    setData(data);
  }

  useEffect(() => {
    teste();
  }, []);

  return (
    <>
      <h1>teste</h1>
      {data.poster != "" && (
        <Image
          src={data.poster as string}
          width={200}
          height={200}
          alt="movie poster"
        />
      )}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}
