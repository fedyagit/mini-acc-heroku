import { createContext, Dispatch } from "react";
import { MenuActions } from "./menu.actions";
import { IMenuState } from "./menu.difinitions";
import { initialState } from "./menu.reducers";

export const MenuContext = createContext<{
  state: IMenuState;
  dispatch: Dispatch<MenuActions>;
}>({
  state: initialState,
  dispatch: () => undefined,
});
