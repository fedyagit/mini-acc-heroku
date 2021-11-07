import { IMenuItem } from "types";

export enum MENU_ACTION_TYPES {
  SELECT_MENU_ITEM = "[MENU] Select Menu Item",
  REMOVE_SELECTED_MENU_ITEM = "[MENU] Remove Selected Item",
  CHANGE_COUNT_OF_SELECTED_ITEMS = "[MENU] Changes count of selected items",
  REMOVE_ALL_SELECTED_ITEMS = "[MENU] Remove all selected items",
}

export interface ISelectMenuItem {
  type: MENU_ACTION_TYPES.SELECT_MENU_ITEM;
  data: IMenuItem;
}

export interface IRemoveSelectedMenuItem {
  type: MENU_ACTION_TYPES.REMOVE_SELECTED_MENU_ITEM;
  data: IMenuItem;
}
export interface IChangeCountOfSelectedItems {
  type: MENU_ACTION_TYPES.CHANGE_COUNT_OF_SELECTED_ITEMS;
  data: IMenuItem;
  key: string;
}

export interface IRemoveAllSelectedItems {
  type: MENU_ACTION_TYPES.REMOVE_ALL_SELECTED_ITEMS;
}

export type MenuActions =
  | ISelectMenuItem
  | IRemoveSelectedMenuItem
  | IChangeCountOfSelectedItems
  | IRemoveAllSelectedItems;
