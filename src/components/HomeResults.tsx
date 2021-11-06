import { FC, useEffect, useState } from "react";
import { RecordInput } from "types";

interface menuCategories {
  type: string;
}

const HomeContent: FC = () => {
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
      console.log(selectedCategory);
      fetch("/api/base?action=GetByType", {
        method: "post",
        body: JSON.stringify({ type: selectedCategory }),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((json) => setMenuItems(json));
    }

    console.log(menuItems);
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
                  selectedCategory === type && "border-b-2 border-blue-900"
                } lg:inline-block mt-4 lg:mt-0 mr-10 text-blue-900 hover:text-indigo-600`}
              >
                {type}
              </span>
            ))}
          </div>
        )}
      </nav>

      <div className="m-5 bg-gray-100 flex max-h-screen overflow-auto border-blue-900 w-1/2 flex-row flex-wrap">
        {menuItems?.map(({ name, type, cost }) => (
          <div className="m-5 shadow-inner hover:shadow-lg rounded-2xl cursor-pointer w-64 h-32 p-4 bg-white overflow-hidden">
            <div className="w-4/6">
              <p className="text-gray-800 text-lg font-medium mb-2">{name}</p>
              <p className="text-gray-400 text-xs">{type}</p>
              <p className="text-indigo-500 text-xl font-medium">{cost} UAH</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HomeContent;
