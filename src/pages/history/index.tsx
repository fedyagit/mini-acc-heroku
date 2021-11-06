import { NextPage } from "next";
import HistoryContent from "src/components/HistoryContent";
import MainLayout from "src/layouts/MainLayout";

const History: NextPage = () => {
  return (
    <>
      <MainLayout>
        <HistoryContent />
      </MainLayout>
    </>
  );
};
export default History;

