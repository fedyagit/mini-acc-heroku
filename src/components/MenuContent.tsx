import { FC, useEffect, useState } from "react";
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
      setLoading(true);
      fetch("/api/base?action=GetByType", {
        method: "post",
        body: JSON.stringify({ type: selectedCategory }),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((json) => setMenuItems(json));
    }
    setLoading(false);
  }, [selectedCategory]);

  return (
    <>
      <nav className="flex w-full bg-white shadow-lg flex-wrap items-center justify-between p-4">
        {loading ? (
          <Loading />
        ) : (
          <div className="ml-7 navbar-menu hidden lg:block w-full">
            {menuCategories?.map(({ type }, index) => (
              <span
                onClick={() => setCategoryHandler(type)}
                key={index}
                className={`block cursor-pointer ${
                  selectedCategory === type &&
                  "border-b-4 bg-gray-50 border-gray-200"
                } lg:inline-block mt-4 lg:mt-0 shadow-md hover:shadow-xl transition ease-in duration-200 p-2 rounded-lg mr-10 text-black hover:text-gray-900`}
              >
                {type}
              </span>
            ))}
          </div>
        )}
      </nav>
      <div className="flex flex-row flex-wrap w-full">
        {loading ? (
          <Loading />
        ) : (
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
        )}

        <div className="m-5 bg-gray-100 flex flex-col flex-1 overflow-auto ">
          <Checkout />
        </div>
      </div>
    </>
  );
};

export default MenuContent;
