import { NextPage } from "next";
import { useReducer } from "react";
import EditContent from "src/components/EditContent";
import { MenuContext } from "src/contexts/menuContext";
import {
  initialState,
  MenuReducer,
} from "src/contexts/menuContext/menu.reducers";
import MainLayout from "src/layouts/MainLayout";

const Edit: NextPage = () => {
  const [state, dispatch] = useReducer(MenuReducer, initialState);
  return (
    <>
      <MainLayout>
        <MenuContext.Provider value={{ state, dispatch }}>
          <EditContent />
        </MenuContext.Provider>
      </MainLayout>
    </>
  );
};
export default Edit;
