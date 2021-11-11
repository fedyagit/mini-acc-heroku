import React, { FC, useContext, useState } from "react";
import { MenuContext } from "src/contexts/menuContext";
import { MENU_ACTION_TYPES } from "src/contexts/menuContext/menu.actions";
import DialogComponent from "../Dialog";

interface IEditItems {
  isPreview?: boolean;
  type?: string;
  name?: string;
  cost?: number;
  id?: string;
}
const EditItems: FC<IEditItems> = ({ isPreview, type, name, cost, id }) => {
  const [isOpenAddItemMenuModal, setOpenAddMenyItemModal] =
    useState<boolean>(false);

  const [isOpenSubmitDeleteModal, setOpenSubmitDeleteModal] =
    useState<boolean>(false);

  const { dispatch } = useContext(MenuContext);

  const handleAddMenuItem = () => {
    setOpenAddMenyItemModal(!isOpenAddItemMenuModal);
  };

  const handleOpenSubmitDeleteModal = () => {
    setOpenSubmitDeleteModal(!isOpenSubmitDeleteModal);
  };

  const handleWriteToDb = (name: string, cost: string) => {
    fetch("/api/base?action=Insert", {
      method: "post",
      body: JSON.stringify({ name: name, cost: cost, type: type }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
    setOpenAddMenyItemModal(!isOpenAddItemMenuModal);
    dispatch({
      type: MENU_ACTION_TYPES.SET_MENU_ITEMS_LOADING,
      data: true,
    });
  };

  const handleRemoveFromDb = (id: string) => {
    fetch("/api/base?action=Delete", {
      method: "post",
      body: JSON.stringify({ id: id }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
    dispatch({
      type: MENU_ACTION_TYPES.SET_MENU_ITEMS_LOADING,
      data: true,
    });
  };

  return (
    <div>
      {isPreview && (
        <div
          onClick={handleAddMenuItem}
          className="m-2 border-b-4 border-gray-300 bg-gray-200 text-gray-800 hover:text-opacity-100 hover:bg-gray-300 opacity-50 text-opacity-75  shadow-md hover:shadow-xl flex justify-center content-center transition ease-in duration-200 rounded-2xl cursor-pointer w-64 h-32 p-4 overflow-hidden"
        >
          <DialogComponent
            submitForm={handleWriteToDb}
            isEdit={true}
            isOpen={isOpenAddItemMenuModal}
            closeModal={handleAddMenuItem}
            text={"Додати в меню?"}
          />
          <span className="m-auto font-thin text-3xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </span>
        </div>
      )}
      {!isPreview && id && (
        <div className="m-2 relative shadow-md hover:shadow-xl transition ease-in duration-200 rounded-2xl cursor-pointer w-64 h-32 p-4 bg-white overflow-hidden">
          <DialogComponent
            submitAction={() => handleRemoveFromDb(id)}
            isOpen={isOpenSubmitDeleteModal}
            closeModal={handleOpenSubmitDeleteModal}
            text={`Видалити з меню ${name}?`}
          />
          <button
            onClick={handleOpenSubmitDeleteModal}
            className="h-6 w-6 text-red-500 absolute right-0.5 top-0.5"
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
          <div className="w-4/6">
            <p className="text-gray-400 text-xs">{type}</p>
            <p className="text-black text-lg font-medium mb-2">{name}</p>
            <p className="text-gray-900 text-xl font-medium">{cost} ГРН</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditItems;
