import { NextApiRequest, NextApiResponse } from "next";
import { Print } from "@utils";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
     Print.Sf();
      return res
        .status(200)
        .json({ message: `OK` });
  }

export default handler;
