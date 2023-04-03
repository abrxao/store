import { NextApiRequest, NextApiResponse } from "next";
import connect from "@/utils/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const { db } = await connect();

    const data = await db
      .collection("movies")
      .find(
        {
          genres: "Action",
          year: { $gte: 1995 },
        },
        { projection: { title: 1, metacritic: 1, year: 1, plot:1 } }
      )
      .sort({ metacritic: -1 })
      .limit(20)
      .toArray();

    res.status(200).json(data);
  } catch (e) {
    console.log(e);
  }
}
