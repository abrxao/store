import { NextApiRequest, NextApiResponse } from "next";
import connect from "@/utils/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const { db, client } = await connect();
    const agg = [
      {
        $search: {
          index: "movies_search",
          compound: {
            must: [
              {
                text: {
                  query: req.body.search,
                  path: "genres",
                },
              }
            ],
            should: [
              {
                range: {
                  gte: 75,
                  path: "metacritic",
                  score: { constant: { value: 10 } },
                },
              },
            ],
          },
        },
      },
      {$project:{title:1, genres:1, metacritic:1}}
    ];

    const data = await db.collection("movies").aggregate(agg).skip(req.body.page*20).limit(20).toArray();
    res.status(200).json(data);
    await client.close();
  } catch (e) {
    console.log(e);
  }
}
