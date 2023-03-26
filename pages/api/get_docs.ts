import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "@/utils/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const { db } = await connect();
    const data = await db.collection("site_forms").find().toArray();
    res.status(200).json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}
