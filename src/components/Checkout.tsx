import React, { FC, useContext, useEffect, useState } from "react";
import { MenuContext } from "src/contexts/menuContext";
import { MENU_ACTION_TYPES } from "src/contexts/menuContext/menu.actions";
import CheckoutItem from "./CheckoutItem";

const Checkout: FC = () => {
  const {
    state: { selectedItems },
    dispatch,
  } = useContext(MenuContext);

  const [totalCheck, setTotalCheck] = useState<number>(0);

  useEffect(() => {
    let total: number = 0;
    selectedItems.map(
      ({ cost, count }) => (total += (Number(cost) / 100) * count)
    );
    setTotalCheck(total);
  }, [selectedItems]);

  return (
    <div className="max-w-7xl px-8">
      <div className="px-4 sm:px-0">
        <div className="border-4 bg-gray-100 border-dashed border-gray-200 rounded-lg min-h-screen">
          {!!selectedItems.length ? (
            <>
              <div className="flex m-5 uppercase justify-center content-center font-bold pt-2">
                Замовлення №{1}
              </div>

              <ul className="mt-2 mx-4">
                {selectedItems.map(({ ...items }) => (
                  <CheckoutItem {...items} />
                ))}
              </ul>
              <div className="m-6 mb-2 mt-8 flex justify-between text-xl">
                Всього до оплати:{" "}
                <span className="font-bold">{totalCheck} UAH</span>
              </div>
              <div className="flex justify-center">
                <button
                  type="button"
                  className="py-2 w-full m-5 mb-2 px-4 flex justify-center items-center  hover:shadow-xl bg-white border-black text-black focus:ring-0 outline-none transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none rounded-lg "
                >
                  Оформити замовлення
                </button>
              </div>
              <div
                onClick={() => {
                  dispatch({
                    type: MENU_ACTION_TYPES.REMOVE_ALL_SELECTED_ITEMS,
                  });
                }}
                className="flex cursor-pointer justify-center hover:text-black text-sm text-gray-500"
              >
                <div className="border-b w-max hover:border-black border-gray-500">
                  Відмінити замовлення
                </div>
              </div>
            </>
          ) : (
            <div className="mt-52 flex justify-center content-center text-gray-400">
              Оберіть щось в меню, щоб створити замовлення
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
