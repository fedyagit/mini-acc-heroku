import { NextPage } from "next";
import { useReducer } from "react";
import MenuContent from "src/components/MenuContent";
import { MenuContext } from "src/contexts/menuContext";
import {
  initialState,
  MenuReducer,
} from "src/contexts/menuContext/menu.reducers";
import MainLayout from "src/layouts/MainLayout";

const Menu: NextPage = () => {
  const [state, dispatch] = useReducer(MenuReducer, initialState);
  return (
    <>
      <MainLayout>
        <MenuContext.Provider value={{ state, dispatch }}>
          <MenuContent />
        </MenuContext.Provider>
      </MainLayout>
    </>
  );
};

export default Menu;
