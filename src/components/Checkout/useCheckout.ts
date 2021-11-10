import { useContext, useEffect, useState } from "react";
import { MenuContext } from "src/contexts/menuContext";
import { MENU_ACTION_TYPES } from "src/contexts/menuContext/menu.actions";
import { IMenuItem } from "types";

export interface IUseCheckout {
  openTransationModal: boolean;
  handleOpenTransactionModal: () => void;
  selectedItems: IMenuItem[];
  transactionId: string;
  totalCheck: number;
  handleTransaction: () => void;
  handleCloseCancelModal: () => void;
  handleSubmitCancelAction: () => void;
  isOpenCancelModal: boolean;
  openConfirmTransactionModal: boolean;
  handleOpenConfirmTransactionModal: () => void;
}
const useCheckout: Function = (): IUseCheckout => {
  const {
    state: { selectedItems },
    dispatch,
  } = useContext(MenuContext);

  const [totalCheck, setTotalCheck] = useState<number>(0);
  const [isOpenCancelModal, setIsOpenCancelModal] = useState<boolean>(false);
  const [openTransationModal, setTransactionModal] = useState<boolean>(false);
  const [openConfirmTransactionModal, setOpenConfirmTransactionModal] =
    useState(false);
  const [transactionId, setTransactionId] = useState<string>("");

  const handleOpenConfirmTransactionModal = () => {
    setOpenConfirmTransactionModal(!openConfirmTransactionModal);
  };

  useEffect(() => {
    fetch("/api/check?action=GetLastId")
      .then((response) => response.json())
      .then((json) => setTransactionId(json.id + 1));
  }, [selectedItems]);

  const handleCloseCancelModal = () => {
    setIsOpenCancelModal(!isOpenCancelModal);
  };

  const handleSubmitCancelAction = () => {
    dispatch({
      type: MENU_ACTION_TYPES.REMOVE_ALL_SELECTED_ITEMS,
    });
    setIsOpenCancelModal(!isOpenCancelModal);
  };

  const handleOpenTransactionModal = () => {
    setTransactionModal(!openTransationModal);
  };

  const getDate = () => {
    const date = new Date();
    return {
      fullDate: `${
        date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
      }-${
        date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()
      }-${date.getFullYear()}-${
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
      }-${
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
      }-${
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
      }`,
      dayDate: `${
        date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
      }-${
        date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()
      }-${date.getFullYear()}`,
    };
  };

  const handleTransaction = async () => {
    const res = await fetch("/api/check?action=Add", {
      method: "post",
      body: JSON.stringify({
        items: selectedItems
          .map(({ name }) => name)
          .join("|")
          .trim(),
        costs: selectedItems
          .map(({ cost }) => cost)
          .join("|")
          .trim(),
        sizes: selectedItems
          .map(({ count }) => count)
          .join("|")
          .trim(),
        transactionDate: getDate().fullDate,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((res) => res);
    await fetch("/api/check?action=Print", {
      method: "post",
      body: JSON.stringify({ id: res.id }),
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      if (response.status === 200) {
        dispatch({
          type: MENU_ACTION_TYPES.REMOVE_ALL_SELECTED_ITEMS,
        });
      } else {
        console.error(response);
      }
    });
    setOpenConfirmTransactionModal(!openConfirmTransactionModal);
    setTimeout(() => {
      setTransactionModal(!openTransationModal);
    }, 1000);
  };

  useEffect(() => {
    let total: number = 0;
    selectedItems.map(
      ({ cost, count }) => (total += (Number(cost) / 100) * count)
    );
    setTotalCheck(total);
  }, [selectedItems]);

  return {
    openTransationModal,
    handleOpenTransactionModal,
    selectedItems,
    transactionId,
    totalCheck,
    handleTransaction,
    handleCloseCancelModal,
    handleSubmitCancelAction,
    isOpenCancelModal,
    openConfirmTransactionModal,
    handleOpenConfirmTransactionModal,
  };
};

export default useCheckout;
