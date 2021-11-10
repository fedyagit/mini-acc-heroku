import { type } from "os";
import { MenuActions, MENU_ACTION_TYPES } from "./menu.actions";
import { IMenuState } from "./menu.difinitions";

export const initialState: IMenuState = {
  selectedItems: [],
  isMenuLoading: true,
  isCategoriesLoading: true,
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
          ({ name, id }) => name !== action.data.name && id !== action.data.id
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
                action.data.id === id
                  ? action.key === "inc"
                    ? count + 1
                    : count - 1
                  : count,
            };
          }
        ),
      };

    case MENU_ACTION_TYPES.REMOVE_ALL_SELECTED_ITEMS:
      return {
        ...state,
        selectedItems: [],
      };

    case MENU_ACTION_TYPES.SET_MENU_ITEMS_LOADING:
      return {
        ...state,
        isMenuLoading: action.data,
      };
    case MENU_ACTION_TYPES.SET_CATEGORIES_LOADING:
      return {
        ...state,
        isCategoriesLoading: action.data,
      };

    default:
      return state;
  }
};
