import { NextApiRequest, NextApiResponse } from "next";
import connect from "@/utils/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const { db } = await connect();

    const data = await db.collection("movies").distinct("genres");
    res.status(200).json(data);
  } catch (e) {
    console.log(e);
  }
}
