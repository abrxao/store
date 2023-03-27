import { NextApiRequest, NextApiResponse } from "next";
import connect from "@/utils/database";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const { db } = await connect();

    const data = await db.collection("movies").findOne({
      title: "Battleship Potemkin",
    });

    res.status(200).json(data);
  } catch (e) {
    console.log(e);
  }
}
