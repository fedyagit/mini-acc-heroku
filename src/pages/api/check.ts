import { NextApiRequest, NextApiResponse } from "next";
import { Transaction } from "@utils";
import {
  DateRange,
  TotalInput,
  TransactionActions,
  TransactionInput,
} from "types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { action } = req.query;
  const { id, items, costs, sizes, transactionDate }: TransactionInput =
    req.body;
  const { date, creationDate, nbChecks, sum, avg }: TotalInput = req.body;
  const { fromDate, toDate }: DateRange = req.body;
  const { page, pageSize } = req.query;
  switch (action) {
    case TransactionActions.Add: {
      const result = await Transaction.AddTransaction({
        items,
        costs,
        sizes,
        transactionDate,
      });
      return res.status(200).json(result);
    }
    case TransactionActions.GetById: {
      const result = await Transaction.GetTransactionById({ id });
      return res.status(200).json(result);
    }
    case TransactionActions.GetByToday: {
      const result = await Transaction.GetTransactionsByToday({
        transactionDate,
      });
      return res.status(200).json(result);
    }
    case TransactionActions.GetAll: {
      const result = await Transaction.GetAllTransactions({ page, pageSize });
      return res.status(200).json(result);
    }
    case TransactionActions.GetRange: {
      const result = await Transaction.GetDateRangeTransactions(
        { page, pageSize },
        { fromDate, toDate }
      );
      return res.status(200).json(result);
    }
    case TransactionActions.GetCount: {
      const result = await Transaction.GetTransactionCount();
      return res.status(200).json(result);
    }
    case TransactionActions.GetRangeCount: {
      const result = await Transaction.GetTransactionRangeCount({
        fromDate,
        toDate,
      });
      return res.status(200).json(result);
    }
    case TransactionActions.GetLastId: {
      const result = await Transaction.GetLastTransaction();
      return res.status(200).json(result);
    }
    case TransactionActions.Print: {
      const result = await Transaction.PrintCheck({ id });
      return res.status(200).json(result);
    }
    case TransactionActions.PrintToday: {
      const result = await Transaction.PrintTodayResult({
        date,
        creationDate,
        nbChecks,
        sum,
        avg,
      });
      return res.status(200).json(result);
    }
    default:
      return res
        .status(200)
        .json({ message: `${action} is not a valid action` });
  }
};

export default handler;
