import { FC, useContext, useEffect, useState } from "react";
import { MenuContext } from "src/contexts/menuContext";
import { MENU_ACTION_TYPES } from "src/contexts/menuContext/menu.actions";
import { RecordInput } from "types";
import Checkout from "./Checkout/index";
import Loading from "./Loading";
import MenuItems from "./MenuItems";

interface menuCategories {
  type: string;
}

const MenuContent: FC = () => {
  const [menuCategories, setMenuCategories] = useState<menuCategories[]>();
  const [menuItems, setMenuItems] = useState<RecordInput[]>();
  const {
    state: { isMenuLoading, isCategoriesLoading },
    dispatch,
  } = useContext(MenuContext);
  const [selectedCategory, setSelectedCategory] = useState<string>();

  const setCategoryHandler = (type: string) => {
    if (type !== selectedCategory) {
      dispatch({
        type: MENU_ACTION_TYPES.SET_MENU_ITEMS_LOADING,
        data: true,
      });
      setSelectedCategory(type);
    }
  };

  useEffect(() => {
    fetch("/api/base?action=GetTypes")
      .then((response) => response.json())
      .then((json) => setMenuCategories(json));
    setTimeout(() => {
      dispatch({
        type: MENU_ACTION_TYPES.SET_CATEGORIES_LOADING,
        data: false,
      });
    }, 400);
  }, [isCategoriesLoading]);

  useEffect(() => {
    if (!!menuCategories?.length) {
      setSelectedCategory(menuCategories[0].type);
    }
  }, [menuCategories]);

  useEffect(() => {
    if (selectedCategory) {
      fetch("/api/base?action=GetByType", {
        method: "post",
        body: JSON.stringify({ type: selectedCategory }),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((json) => setMenuItems(json));
    }
    setTimeout(() => {
      dispatch({
        type: MENU_ACTION_TYPES.SET_MENU_ITEMS_LOADING,
        data: false,
      });
    }, 400);
  }, [selectedCategory, isMenuLoading]);

  return (
    <>
      <nav className="flex w-full bg-white shadow-lg flex-wrap items-center justify-between p-4">
        {isCategoriesLoading ? (
          <Loading />
        ) : (
          <div className="ml-7 navbar-menu hidden lg:block w-full">
            {menuCategories?.map(({ type }, index) => (
              <span
                onClick={() => setCategoryHandler(type)}
                key={index}
                className={`block cursor-pointer ${
                  selectedCategory === type &&
                  "border-b-4 bg-gray-300 border-gray-400"
                } lg:inline-block mt-4 lg:mt-0 shadow-md hover:shadow-xl transition ease-in duration-200 p-2 rounded-lg mr-10 text-black hover:text-gray-900`}
              >
                {type}
              </span>
            ))}
          </div>
        )}
      </nav>

      {isMenuLoading ? (
        <div className="flex mt-20 m-auto justify-center content-center h-28">
          <Loading />
        </div>
      ) : (
        <div className="flex flex-row flex-wrap w-full">
          <div
            style={{ height: "max-content" }}
            className="m-5 bg-gray-100 flex flex-row flex-wrap flex-1 overflow-auto"
          >
            {menuItems?.map((item) => (
              <MenuItems
                key={item.id}
                {...{ ...item, cost: Number(item.cost) / 100 }}
              />
            ))}
          </div>

          <div className="m-5 bg-gray-100 flex flex-col flex-1 overflow-auto ">
            <Checkout />
          </div>
        </div>
      )}
    </>
  );
};

export default MenuContent;
