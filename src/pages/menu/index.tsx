import { NextPage } from "next";
import MenuContent from "src/components/MenuContent";
import MainLayout from "src/layouts/MainLayout";

const Menu: NextPage = () => {
  return (
    <>
      <MainLayout>
        <MenuContent />
      </MainLayout>
    </>
  );
};
export default Menu;
