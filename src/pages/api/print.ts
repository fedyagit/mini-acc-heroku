import { NextApiRequest, NextApiResponse } from "next";
import { Check } from "@utils";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
     Check.createCheck();
      return res
        .status(200)
        .json({ message: `OK` });
  }

export default handler;
