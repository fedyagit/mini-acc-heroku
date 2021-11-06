import { type } from "os";
import { MenuActions, MENU_ACTION_TYPES } from "./menu.actions";
import { IMenuState } from "./menu.difinitions";

export const initialState: IMenuState = {
  selectedItems: [],
};

export const MenuReducer = (
  state: Readonly<IMenuState> = initialState,
  action: MenuActions
): IMenuState => {
  switch (action.type) {
    case MENU_ACTION_TYPES.SELECT_MENU_ITEM:
      return {
        ...state,
        selectedItems: state.selectedItems
          .map((each) => JSON.stringify({ ...each, count: 0 }))
          .includes(JSON.stringify({ ...action.data, count: 0 }))
          ? state.selectedItems.map(({ name, type, cost, id }, index) => {
              return {
                type: type,
                name: name,
                cost: cost,
                id: id,
                count:
                  action.data.name === name
                    ? state.selectedItems[index].count + 1
                    : state.selectedItems[index].count,
              };
            })
          : [...state.selectedItems, action.data],
      };
    case MENU_ACTION_TYPES.REMOVE_SELECTED_MENU_ITEM:
      return {
        ...state,
        selectedItems: state.selectedItems.filter(
          ({ name, cost }) =>
            name !== action.data.name && cost !== action.data.cost
        ),
      };

    case MENU_ACTION_TYPES.CHANGE_COUNT_OF_SELECTED_ITEMS:
      return {
        ...state,
        selectedItems: state.selectedItems.map(
          ({ name, type, cost, id, count }) => {
            return {
              type: type,
              name: name,
              cost: cost,
              id: id,
              count:
                action.data.name === name
                  ? action.key === "inc"
                    ? count + 1
                    : count - 1
                  : count,
            };
          }
        ),
      };

    default:
      return state;
  }
};
