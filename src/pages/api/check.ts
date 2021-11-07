import { NextApiRequest, NextApiResponse } from "next";
import { Transaction } from "@utils";
import { TransacationActions, TransactionInput } from "types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { action } = req.query;
  const { id, items, costs, sizes, transactionDate }: TransactionInput =
    req.body;
  switch (action) {
    case TransacationActions.Add: {
      const result = await Transaction.AddTransaction({
        items,
        costs,
        sizes,
        transactionDate,
      });
      return res.status(200).json(result);
    }
    case TransacationActions.GetById: {
      const result = await Transaction.GetTransactionById({ id });
      return res.status(200).json(result);
    }
    case TransacationActions.GetByToday: {
      const result = await Transaction.GetTransactionsByToday({
        transactionDate,
      });
      return res.status(200).json(result);
    }
    case TransacationActions.Print: {
      const result = await Transaction.PrintCheck({ id });
      return res.status(200).json(result);
    }
    default:
      return res
        .status(200)
        .json({ message: `${action} is not a valid action` });
  }
};

export default handler;
