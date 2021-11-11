import React, { FC, useState } from "react";
import DialogComponent from "../Dialog";

interface IPrintComponent {
  id: string;
}
const PrintComponent: FC<IPrintComponent> = ({ id }) => {
  const [isOpenPrintCheckModal, setIsOpenPrintCheckModal] =
    useState<boolean>(false);

  const [isOpenSuccessPrintModal, setOpenSuccessPrintModal] =
    useState<boolean>(false);

  const handleOpenSuccessPrintModal = () => {
    setOpenSuccessPrintModal(!isOpenSuccessPrintModal);
  };

  const handleOpenPrintCheckModal = () => {
    setIsOpenPrintCheckModal(!isOpenPrintCheckModal);
  };
  const handlePrintTransactionCheck = async (id: string) => {
    await fetch("/api/check?action=Print", {
      method: "post",
      body: JSON.stringify({ id: id }),
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      if (response.status === 200) {
        console.log(response.status, "got it");
      } else {
        console.error(response);
      }
    });
    setIsOpenPrintCheckModal(!isOpenPrintCheckModal);
    setTimeout(() => {
      setOpenSuccessPrintModal(!isOpenSuccessPrintModal);
    }, 1000);
  };

  return (
    <div onClick={handleOpenPrintCheckModal} className="flex items-center">
      <DialogComponent
        text={`Сформувати чек для замовлення №${id}?`}
        isOpen={isOpenPrintCheckModal}
        closeModal={handleOpenPrintCheckModal}
        submitAction={() => handlePrintTransactionCheck(id)}
      />
      <DialogComponent
        text={`Чек сформований.`}
        isOpen={isOpenSuccessPrintModal}
        closeModal={handleOpenSuccessPrintModal}
      />
      <div className="flex-shrink-0">
        <div className="text-green-800 opacity-75 block relative">
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
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PrintComponent;
