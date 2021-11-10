import React, { FC } from "react";
import CheckoutItem from "../CheckoutItem";
import DialogComponent from "../Dialog";
import useCheckout, { IUseCheckout } from "./useCheckout";

const Checkout: FC = () => {
  const {
    openTransationModal,
    selectedItems,
    transactionId,
    totalCheck,
    handleOpenTransactionModal,
    handleTransaction,
    handleCloseCancelModal,
    handleSubmitCancelAction,
    isOpenCancelModal,
    openConfirmTransactionModal,
    handleOpenConfirmTransactionModal,
  }: IUseCheckout = useCheckout();

  return (
    <div className="max-w-7xl px-8">
      <DialogComponent
        text={`Оформити замовлення?`}
        isOpen={openConfirmTransactionModal}
        closeModal={handleOpenConfirmTransactionModal}
        submitAction={handleTransaction}
      />
      <div className="px-4 sm:px-0">
        <div className="border-4 bg-gray-100 border-dashed border-gray-200 rounded-lg min-h-screen">
          <DialogComponent
            text={`Чек готовий, замовлення прийняте`}
            isOpen={openTransationModal}
            closeModal={handleOpenTransactionModal}
          />
          {!!selectedItems.length ? (
            <>
              <div className="flex m-5 uppercase justify-center content-center font-bold pt-2">
                Замовлення №{transactionId}
              </div>
              <div>
                <ul className="mt-2 mx-4">
                  {selectedItems.map(({ ...items }, index) => (
                    <CheckoutItem key={index} {...items} />
                  ))}
                </ul>
              </div>
              <div className="m-6 mb-2 mt-8 flex justify-between text-xl">
                Всього до оплати:{" "}
                <span className="font-bold">{totalCheck} UAH</span>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={handleOpenConfirmTransactionModal}
                  type="button"
                  className="py-2 w-full m-5 mb-2 px-4 flex justify-center items-center  hover:shadow-xl bg-white border-black text-black focus:ring-0 outline-none transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none rounded-lg "
                >
                  Оформити замовлення
                </button>
              </div>
              <div
                onClick={handleCloseCancelModal}
                className="flex cursor-pointer justify-center hover:text-black text-sm text-gray-500"
              >
                <div className="border-b mb-4 w-max hover:border-black border-gray-500">
                  Відмінити замовлення
                </div>
                <DialogComponent
                  submitAction={handleSubmitCancelAction}
                  text="Відмінити замовлення?"
                  isOpen={isOpenCancelModal}
                  closeModal={handleCloseCancelModal}
                />
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
