import { FC, useContext, useEffect, useState } from "react";
import { MenuContext } from "src/contexts/menuContext";
import { MENU_ACTION_TYPES } from "src/contexts/menuContext/menu.actions";
import { RecordInput } from "types";
import DialogComponent from "./Dialog";
import EditItems from "./EditItems";
import Loading from "./Loading";

interface menuCategories {
  type: string;
}

const EditContent: FC = () => {
  const [menuCategories, setMenuCategories] = useState<menuCategories[]>();
  const [menuItems, setMenuItems] = useState<RecordInput[]>();
  const {
    state: { isMenuLoading, isCategoriesLoading },
    dispatch,
  } = useContext(MenuContext);
  const [selectedCategory, setSelectedCategory] = useState<string>();

  const [isOpenAddCategoryItemModal, setOpenAddCategoryItemModal] =
    useState<boolean>(false);

  const handleAddCategory = () => {
    setOpenAddCategoryItemModal(!isOpenAddCategoryItemModal);
  };

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

  const handleWriteToDb = (type: string) => {
    fetch("/api/base?action=AddType", {
      method: "post",
      body: JSON.stringify({ type: type }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
    setOpenAddCategoryItemModal(!isOpenAddCategoryItemModal);
    dispatch({
      type: MENU_ACTION_TYPES.SET_CATEGORIES_LOADING,
      data: true,
    });
  };

  const handleRemoveFromDb = (type: string) => {
    fetch("/api/base?action=DeleteType", {
      method: "post",
      body: JSON.stringify({ type: type }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
    dispatch({
      type: MENU_ACTION_TYPES.SET_CATEGORIES_LOADING,
      data: true,
    });
  };

  return (
    <>
      <nav className="flex w-full bg-white shadow-lg flex-wrap items-center justify-between p-4">
        {isCategoriesLoading ? (
          <Loading />
        ) : (
          <div className="ml-7 navbar-menu hidden lg:flex justify-start content-center w-full">
            <span
              onClick={handleAddCategory}
              className={`h-full cursor-pointer border-b-4 border-gray-300 bg-gray-200 hover:bg-gray-300 opacity-50 text-opacity-75 lg:inline-block shadow-md hover:shadow-xl transition ease-in duration-200 p-2 rounded-lg mr-10 text-gray-800 hover:text-opacity-100`}
            >
              <DialogComponent
                submitFormType={handleWriteToDb}
                isCategory={true}
                isOpen={isOpenAddCategoryItemModal}
                closeModal={handleAddCategory}
                text={"Додати категорію?"}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </span>
            {menuCategories?.map(({ type }, index) => (
              <span
                onClick={() => setCategoryHandler(type)}
                key={index}
                className={`block cursor-pointer ${
                  selectedCategory === type &&
                  "border-b-4 bg-gray-200 border-gray-300"
                } lg:inline-block relative mt-4 lg:mt-0 shadow-md hover:shadow-xl transition ease-in duration-200 p-2 rounded-lg mr-10 text-black hover:text-gray-900`}
              >
                <button
                  onClick={() => handleRemoveFromDb(type)}
                  className="h-6 w-6 bg-white rounded-full text-red-500 absolute z-20 -right-3 -top-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
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
            <EditItems isPreview={true} type={selectedCategory} />
            {menuItems?.map((item) => (
              <EditItems
                key={item.id}
                isPreview={false}
                {...{ ...item, cost: Number(item.cost) / 100 }}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default EditContent;
