import { FC, memo, useEffect, useState } from "react";
import { TransactionInput } from "types";
import Loading from "../Loading";
import PrintComponent from "../PrintComponent";
import { getDate } from "../utils";

const DailyResultsContent: FC = () => {
  const [transactions, setTransactions] = useState<TransactionInput[]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("/api/check?action=GetByToday", {
      method: "post",
      body: JSON.stringify({
        transactionDate: getDate().dayDate,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((json) => {
        setTransactions(json);
      });
    setTimeout(() => {
      setLoading(false);
    }, 400);
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex mt-36 m-auto justify-center content-center h-28">
          <Loading />
        </div>
      ) : (
        <div className="grid grid-cols-8 w-full">
          <div
            style={{ height: "max-content" }}
            className="m-5 bg-gray-100 col-span-5 flex flex-row flex-wrap flex-1 overflow-auto"
          >
            {" "}
            <div className="container mx-auto px-4 sm:px-8">
              <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold"
                        >
                          №
                        </th>
                        <th
                          scope="col"
                          className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold"
                        >
                          Опис
                        </th>
                        <th
                          scope="col"
                          className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold"
                        >
                          Час
                        </th>
                        <th
                          scope="col"
                          className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold"
                        >
                          Сума
                        </th>
                        <th
                          scope="col"
                          className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold"
                        >
                          Друк
                        </th>
                      </tr>
                    </thead>
                    {!loading && (
                      <tbody>
                        {transactions &&
                          transactions.map(
                            ({ id, costs, transactionDate, sizes, items }) => (
                              <tr key={id}>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                      <div className="block relative">{id}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <div className="text-gray-900 max-w-2xl whitespace-no-wrap">
                                    {items &&
                                      sizes &&
                                      costs &&
                                      items
                                        .split("|")
                                        .map(
                                          (e, i) =>
                                            `${e} ${
                                              parseInt(costs.split("|")[i]) /
                                              100
                                            }грн х${sizes.split("|")[i]}`
                                        )
                                        .join(" | ")}
                                  </div>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <p className="text-gray-900 text-center whitespace-no-wrap">
                                    {transactionDate
                                      ?.split("-")
                                      .slice(
                                        transactionDate.split("-").length - 3,
                                        transactionDate.split("-").length
                                      )
                                      .slice(0, -1)
                                      .join(":")}
                                  </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <span className="relative flex px-3 py-1 font-semibold text-green-900 leading-tight">
                                    <span
                                      aria-hidden="true"
                                      className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                    ></span>
                                    <span className="relative text-center">
                                      {costs &&
                                        sizes &&
                                        costs
                                          ?.split("|")
                                          .reduce(
                                            (acc: number, a, i) =>
                                              acc +
                                              parseInt(a) *
                                                parseInt(sizes?.split("|")[i]),
                                            0
                                          ) / 100}{" "}
                                      ГРН
                                    </span>
                                  </span>
                                </td>
                                {id && (
                                  <td
                                    key={id}
                                    className="px-5 cursor-pointer py-5 border-b border-gray-200 bg-white text-sm"
                                  >
                                    <PrintComponent id={id} />
                                  </td>
                                )}
                              </tr>
                            )
                          )}
                      </tbody>
                    )}
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="m-5 bg-gray-100 col-span-3 flex flex-col flex-1 overflow-auto ">
            <div className="max-w-7xl">
              <div className="sm:px-0">
                <div className="border-4 bg-gray-100 border-dashed border-gray-200 rounded-lg">
                  <div className="border-gray-200 px-3 py-6 rounded-md mt-2 mx-1 relative flex flex-col mb-2">
                    <span>
                      Усього замовлень за сьогодні:{" "}
                      <span className="font-bold cursor-pointer hover:underline">
                        {transactions?.length}
                      </span>
                    </span>
                    <span className="pt-3">
                      Загальна сума замовлень:{" "}
                      <span className="pt-3 cursor-pointer hover:underline font-bold">
                        {transactions
                          ?.map(
                            ({ costs, sizes }) =>
                              costs &&
                              sizes &&
                              costs
                                ?.split("|")
                                .reduce(
                                  (acc: number, a, i) =>
                                    acc +
                                    Number(a) * Number(sizes?.split("|")[i]),
                                  0
                                ) / 100
                          )

                          .reduce((acc: number, a) => acc + Number(a), 0)}{" "}

                        ГРН
                      </span>
                    </span>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    type="button"
                    className="py-2 w-full m-5 mb-2 px-4 flex justify-center items-center  hover:shadow-xl bg-white border-black text-black focus:ring-0 outline-none transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none rounded-lg "
                  >
                    Надрукувати чек з підсумком дня
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default memo(DailyResultsContent);
