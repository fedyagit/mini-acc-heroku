import React, { FC } from "react";
import { IMenuItem } from "types";
import DialogComponent from "../Dialog";
import useCheckoutItem from "./useCheckoutItem";

const CheckoutItem: FC<IMenuItem> = ({ id, cost, count, name, type }) => {
  const {
    handleRemoveItem,
    openRemoveItemModal,
    handleOpenRemoveItemModal,
    handleChangeCountOfItems,
  } = useCheckoutItem({ id, cost, count, name, type });
  return (
    <li
      key={id}
      className="border-gray-400 shadow-md hover:shadow-xl transition ease-in duration-200 mx-1 relative flex flex-row mb-2"
    >
      {count && count >= 2 ? (
        <>
          {" "}
          <DialogComponent
            text={`Видалити ${name} в кількості ${count} шт.?`}
            submitAction={handleRemoveItem}
            isOpen={openRemoveItemModal}
            closeModal={handleOpenRemoveItemModal}
          />
          <button
            onClick={handleOpenRemoveItemModal}
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
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </>
      ) : (
        <button
          onClick={handleRemoveItem}
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
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      )}
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
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M18 12H6"
            />
          </svg>
          <input
            readOnly
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
