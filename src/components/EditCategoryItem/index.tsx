import React, { FC, useState } from "react";
import DialogComponent from "../Dialog";

interface IEditCategoryItem {
  type: string;
  selectedCategory: string;
  handleSet: (type: string) => void;
  handleRemove: (type: string) => void;
}
const EditCategoryItem: FC<IEditCategoryItem> = ({
  type,
  selectedCategory,
  handleSet,
  handleRemove,
}) => {
  const [isOpenRemoveCategoryItemModal, setOpenRemoveCategoryItemModal] =
    useState<boolean>(false);

  const handleOpenRemoveCategoryModal = () => {
    setOpenRemoveCategoryItemModal(!isOpenRemoveCategoryItemModal);
  };
  return (
    <div className="relative">
      <button
        onClick={handleOpenRemoveCategoryModal}
        className="h-6 w-6 bg-white rounded-full text-red-500 absolute z-20 right-6 -top-3"
      >
        <DialogComponent
          submitAction={() => {
            handleRemove(type);
            handleOpenRemoveCategoryModal();
          }}
          isOpen={isOpenRemoveCategoryItemModal}
          closeModal={handleOpenRemoveCategoryModal}
          text={`Видалити категорію ${type} та усі позиції у цій категорії?`}
        />
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
      <span
        onClick={() => handleSet(type)}
        className={`block cursor-pointer ${
          selectedCategory === type && "border-b-4 bg-gray-200 border-gray-300"
        } lg:inline-block mt-4 lg:mt-0 shadow-md hover:shadow-xl transition ease-in duration-200 p-2 rounded-lg mr-10 text-black hover:text-gray-900`}
      >
        <span className="">{type}</span>
      </span>
    </div>
  );
};

export default EditCategoryItem;
