import { NextApiRequest, NextApiResponse } from "next";
import { Database } from "utils";
import { BaseApiInput, Actions, RecordInput } from "types";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { action } = req.query;
  const { name, type, cost }: RecordInput = req.body;
  switch (action) {
    case Actions.Get: {
      const result = Database.Get();
      return result.then((data) => res.status(200).json(data));
    }
    case Actions.Insert: {
      const result = Database.Insert({ name, type, cost });
      return result.then((data) => res.status(200).json(data));
    }
    default:
      return res
        .status(200)
        .json({ message: `${action} is not a valid action` });
  }
};

export default handler;
