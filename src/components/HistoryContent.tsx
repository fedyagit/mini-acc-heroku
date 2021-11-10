import { FC, useEffect, useState } from "react";
import { TransactionInput } from "types";
import Loading from "./Loading";

const HistoryContent: FC = () => {
  const [transactions, setTransactions] = useState<TransactionInput[]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("/api/check?action=GetAll")
      .then((response) => response.json())
      .then((json) => {
        setTransactions(json.result);
        console.log(json);
      });
    setTimeout(() => {
      setLoading(false);
    }, 400);
  }, []);

  useEffect(() => {
    console.log(transactions);
  }, [transactions]);

  return (
    <>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      №
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Опис
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Дата
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Час
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Сумма
                    </th>
                  </tr>
                </thead>
                {!loading && (
                  <tbody>
                    {transactions &&
                      transactions.map(
                        ({ id, costs, transactionDate, sizes, items }) => (
                          <tr>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <div className="flex items-center">
                                <div className="flex-shrink-0">
                                  <a href="#" className="block relative">
                                    {id}
                                  </a>
                                </div>
                                <div className="ml-3">
                                  <p className="text-gray-900 whitespace-no-wrap"></p>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 max-w-2xl whitespace-no-wrap">
                                {items &&
                                  sizes &&
                                  items
                                    ?.split("|")
                                    .map(
                                      (e, i) => `${e} ${sizes.split("|")[i]}шт.`
                                    )
                                    .join(" | ")}
                              </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {transactionDate
                                  ?.split("-")
                                  .slice(0, 3)
                                  .join("/")}
                              </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
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
                              <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                <span
                                  aria-hidden="true"
                                  className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                ></span>
                                <span className="relative">
                                  {costs &&
                                    costs
                                      ?.split("|")
                                      .reduce(
                                        (acc, a) => acc + parseInt(a),
                                        0
                                      ) / 100}{" "}
                                  ГРН
                                </span>
                              </span>
                            </td>
                          </tr>
                        )
                      )}
                  </tbody>
                )}
              </table>
              {loading && <Loading />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryContent;
