import { IMenuItem } from "types";

export interface IMenuState {
  selectedItems: IMenuItem[];
  isMenuLoading: boolean;
  isCategoriesLoading: boolean;
}
