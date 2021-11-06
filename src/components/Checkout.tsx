import React, { FC, useContext, useEffect, useState } from "react";
import { MenuContext } from "src/contexts/menuContext";
import { MENU_ACTION_TYPES } from "src/contexts/menuContext/menu.actions";
import CheckoutItem from "./CheckoutItem";

const Checkout: FC = () => {
  const {
    state: { selectedItems },
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
              <div className="flex uppercase justify-center content-center font-bold pt-2">
                Замовлення №{1}
              </div>

              <ul className="mt-2">
                {selectedItems.map(({ ...items }) => (
                  <CheckoutItem {...items} />
                ))}
              </ul>
              <div className="m-4 flex justify-between text-xl">
                Всього до оплати:{" "}
                <span className="font-bold">{totalCheck} UAH</span>
              </div>
            </>
          ) : (
            <div className=" mt-52 flex justify-center content-center text-gray-400">
              Оберіть щось в меню, щоб створити замовлення
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
