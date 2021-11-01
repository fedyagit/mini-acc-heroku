import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import knex from "knex";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const dbPath = path.resolve("db/mdb.db");
  const db = knex({
    client: "sqlite3",
    connection: {
      filename: dbPath,
    },
    useNullAsDefault: true,
  });
  db.select('*').from('Items').then(userData => {
    res.status(200).json(userData);
  })
  .catch(err => {
    res.status(400).json({message: `There was an error in retrieving data`});
  })

}
