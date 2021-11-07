import React, { FC, useContext, useEffect } from "react";
import { MenuContext } from "src/contexts/menuContext";
import { MENU_ACTION_TYPES } from "src/contexts/menuContext/menu.actions";
import { IMenuItem } from "types";

const CheckoutItem: FC<IMenuItem> = ({ id, cost, count, type, name }) => {
  const { dispatch } = useContext(MenuContext);

  const handleChangeCountOfItems = (key: string) => {
    dispatch({
      type: MENU_ACTION_TYPES.CHANGE_COUNT_OF_SELECTED_ITEMS,
      data: {
        type: type,
        name: name,
        cost: cost,
        id: id,
        count: count,
      },
      key: key,
    });
  };

  useEffect(() => {
    if (!count)
      dispatch({
        type: MENU_ACTION_TYPES.REMOVE_SELECTED_MENU_ITEM,
        data: {
          type: type,
          name: name,
          cost: cost,
          id: id,
          count: count,
        },
      });
  }, [count]);

  return (
    <li
      id={id}
      className="border-gray-400 shadow-md hover:shadow-xl transition ease-in duration-200 mx-1 relative flex flex-row mb-2"
    >
      <button
        onClick={() => {
          dispatch({
            type: MENU_ACTION_TYPES.REMOVE_SELECTED_MENU_ITEM,
            data: {
              type: type,
              name: name,
              cost: cost,
              id: id,
              count: count,
            },
          });
        }}
        className="h-6 w-6 text-red-500 absolute right-0 top-0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
      <div className="shadow border select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4">
        <div className="flex-1 pl-1 md:mr-16">
          <div className="font-medium dark:text-white">{name}</div>
        </div>
        <div className="text-gray-600 pr-6 dark:text-gray-200 text-xs">
          {Number(cost) / 100} UAH
        </div>
        <div className="h-6 relative w-12 mr-2 mb-2 pt-0">
          <svg
            onClick={() => handleChangeCountOfItems("inc")}
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 bg-green-50 text-gray-600 hover:text-black z-10 absolute right-0 top-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <svg
            onClick={() => handleChangeCountOfItems("dec")}
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 bg-red-50 w-4 z-10 absolute text-gray-600 hover:text-black right-0 -bottom-1.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M18 12H6"
            />
          </svg>
          <input
            value={count}
            className="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
          />
        </div>
        шт.
      </div>
    </li>
  );
};

export default CheckoutItem;
