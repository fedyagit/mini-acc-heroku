import React, { FC, useContext } from "react";
import { MenuContext } from "src/contexts/menuContext";
import { MENU_ACTION_TYPES } from "src/contexts/menuContext/menu.actions";
import { RecordInput } from "types";

const MenuItems: FC<RecordInput> = ({ type, name, cost, id }) => {
  const { dispatch } = useContext(MenuContext);

  return (
    <div
      onClick={() => {
        dispatch({
          type: MENU_ACTION_TYPES.SELECT_MENU_ITEM,
          data: {
            type: type,
            name: name,
            cost: Number(cost) * 100,
            id: id,
            count: 1,
          },
        });
      }}
      className="m-2 shadow-md hover:shadow-xl transition ease-in duration-200 rounded-2xl cursor-pointer w-64 h-32 p-4 bg-white overflow-hidden"
    >
      <div className="w-4/6">
        <p className="text-gray-400 text-xs">{type}</p>
        <p className="text-black text-lg font-medium mb-2">{name}</p>
        <p className="text-gray-900 text-xl font-medium">{cost} ГРН</p>
      </div>
    </div>
  );
};

export default MenuItems;
