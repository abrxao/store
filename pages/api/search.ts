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
              },
            ],
            should: [
              {
                range: {
                  gte: 60,
                  path: "metacritic",
                  score: { constant: { value: 10 } },
                },
              },
              {
                range: {
                  gte: 1999,
                  path: "year",
                  score: { constant: { value: 17 } },
                },
              },
              {
                range: {
                  gte: 30,
                  path: "runtime",
                  score: { constant: { value: 2 } },
                },
              },
              {
                range: {
                  gte: 7,
                  path: "imdb.rating",
                  score: { constant: { value: 7 } },
                },
              },
              {
                range: {
                  gte: 150,
                  path: "imdb.votes",
                  score: { constant: { value: 15 } },
                },
              },
            ],
          },
        },
      },
      {
        $project: {
          imdb: 1,
          title: 1,
          genres: 1,
          metacritic: 1,
          poster: 1,
          runtime: 1,
          directors: 1,
          languages: 1,
          year: 1,
        },
      },
    ];

    const countMovies = [
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
              },
            ],
          },
        },
      },
    ];
    const moviesCount = await db.collection("movies").countDocuments({
      genres: req.body.search
    });

    const data = await db
      .collection("movies")
      .aggregate(agg)
      .skip(req.body.page * 20)
      .limit(20)
      .toArray();

    res.status(200).json({ data, moviesCount });
    await client.close();
  } catch (e) {
    console.log(e);
  }
}
