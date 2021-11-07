import { Transaction } from "../src/utils";
import { TransacationActions } from "../types";

describe("Transaction", () => {
  test(TransacationActions.GetById, async () => {
    const mock = [
      {
        id: 2,
        items: "Кава|Чай|Суп3",
        costs: "4000|2000|14000",
        sizes: "1|1|2",
        transactionDate: "07-10-2021-18-33-12",
      },
    ];
    const mockId = { id: "2" };
    const result = await Transaction.GetTransactionById(mockId);
    expect(Array.isArray(result)).toBeTruthy;
    expect(result).toEqual(expect.arrayContaining(mock));
  });
  test(TransacationActions.GetByToday, async () => {
    const mock = [
      {
        id: 2,
        items: "Кава|Чай|Суп3",
        costs: "4000|2000|14000",
        sizes: "1|1|2",
        transactionDate: "07-10-2021-18-33-12",
      },
    ];
    const mockDate = {
      transactionDate: "07-10-2021",
    };
    const result = await Transaction.GetTransactionsByToday(mockDate);
    expect(Array.isArray(result)).toBeTruthy;
    expect(result).toEqual(expect.arrayContaining(mock));
  });
  test(TransacationActions.Add, async () => {
    const addMock = {
      items: "Мок1|Мок2|Мок3",
      costs: "4025|5050|11000",
      sizes: "1|4|2",
      transactionDate: "11-10-2021-18-33-12",
    };
    const addResult = await Transaction.AddTransaction(addMock);
    expect(addResult.message).toContain("Insert: Success");
    expect(Number(addResult.id)).not.toBeNaN;
    const resultMock = [
      {
        id: Number(addResult.id),
        items: "Мок1|Мок2|Мок3",
        costs: "4025|5050|11000",
        sizes: "1|4|2",
        transactionDate: "11-10-2021-18-33-12",
      },
    ];
    const result = await Transaction.GetTransactionById({ id: addResult.id });
    expect(Array.isArray(result)).toBeTruthy;
    expect(result).toEqual(expect.arrayContaining(resultMock));
  });
});
