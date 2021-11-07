import { useContext, useEffect, useState } from "react";
import { MenuContext } from "src/contexts/menuContext";
import { MENU_ACTION_TYPES } from "src/contexts/menuContext/menu.actions";
import { IMenuItem } from "types";

interface IUseCheckout {
  handleRemoveItem: () => void;
  openRemoveItemModal: boolean;
  handleOpenRemoveItemModal: () => void;
  handleChangeCountOfItems: (key: string) => void;
}

type CallbackFunction = (args: IMenuItem) => IUseCheckout;
const useCheckoutItem: CallbackFunction = ({
  id,
  cost,
  count,
  type,
  name,
}): IUseCheckout => {
  const { dispatch } = useContext(MenuContext);
  const [openRemoveItemModal, setRemoveItemModal] = useState<boolean>(false);

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

  const handleOpenRemoveItemModal = () => {
    setRemoveItemModal(!openRemoveItemModal);
  };

  const handleRemoveItem = () => {
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
    setRemoveItemModal(!openRemoveItemModal);
  };

  return {
    handleRemoveItem,
    openRemoveItemModal,
    handleOpenRemoveItemModal,
    handleChangeCountOfItems,
  };
};

export default useCheckoutItem;
