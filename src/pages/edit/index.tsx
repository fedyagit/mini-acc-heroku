import { NextPage } from "next";
import EditContent from "src/components/EditContent";
import MainLayout from "src/layouts/MainLayout";

const Edit: NextPage = () => {
  return (
    <>
      <MainLayout>
        <EditContent />
      </MainLayout>
    </>
  );
};
export default Edit;
