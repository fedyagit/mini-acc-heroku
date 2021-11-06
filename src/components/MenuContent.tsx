import { FC, useContext, useEffect, useState } from "react";
import { MenuContext } from "src/contexts/menuContext";
import { RecordInput } from "types";
import Checkout from "./Checkout";
import MenuItems from "./MenuItems";

interface menuCategories {
  type: string;
}

const MenuContent: FC = () => {
  const {
    state: { selectedItems },
  } = useContext(MenuContext);
  const [menuCategories, setMenuCategories] = useState<menuCategories[]>();
  const [menuItems, setMenuItems] = useState<RecordInput[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>();

  const setCategoryHandler = (type: string) => {
    setSelectedCategory(type);
  };

  useEffect(() => {
    setLoading(true);
    fetch("/api/base?action=GetTypes")
      .then((response) => response.json())
      .then((json) => setMenuCategories(json));
  }, []);

  useEffect(() => {
    if (!!menuCategories?.length) {
      setLoading(false);
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
  }, [selectedCategory]);

  return (
    <>
      <nav className="flex w-full bg-white shadow-lg flex-wrap items-center justify-between p-4">
        {loading ? (
          <span>Loading </span>
        ) : (
          <div className="ml-7 navbar-menu hidden lg:block w-full">
            {menuCategories?.map(({ type }, index) => (
              <span
                onClick={() => setCategoryHandler(type)}
                key={index}
                className={`block cursor-pointer ${
                  selectedCategory === type && "border-b-2 border-black"
                } lg:inline-block mt-4 lg:mt-0 mr-10 text-black hover:text-gray-900`}
              >
                {type}
              </span>
            ))}
          </div>
        )}
      </nav>
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
    </>
  );
};

export default MenuContent;
