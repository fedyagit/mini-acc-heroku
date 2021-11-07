import { NextApiRequest, NextApiResponse } from "next";
import { Database } from "@utils";
import { Actions, RecordInput } from "types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { action } = req.query;
  const { id, name, type, cost }: RecordInput = req.body;
  switch (action) {
    case Actions.Get: {
      const result = await Database.Get();
      return res.status(200).json(result);
    }
    case Actions.GetById: {
      const result = await Database.GetById({ id });
      return res.status(200).json(result);
    }
    case Actions.GetByType: {
      const result = await Database.GetByType({ type });
      return res.status(200).json(result);
    }
    case Actions.GetTypes: {
      const result = await Database.GetTypes();
      return res.status(200).json(result);
    }
    case Actions.AddType: {
      const result = await Database.AddType({type});
      return res.status(200).json(result);
    }
    case Actions.Insert: {
      const result = await Database.Insert({ id, name, type, cost });
      return res.status(200).json(result)
    }
    case Actions.Delete: {
      const result = await Database.Delete({ id });
      return res.status(200).json(result)
    }
    case Actions.DeleteType: {
      const result = await Database.DeleteType({ type });
      return res.status(200).json(result)
    }
    default:
      return res
        .status(200)
        .json({ message: `${action} is not a valid action` });
  }
};

export default handler;
