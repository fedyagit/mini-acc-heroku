import { NextPage } from "next";
import DailyResultsContent from "src/components/DailyResultsContent";
import MainLayout from "src/layouts/MainLayout";

const DailyResults: NextPage = () => {
  return (
    <>
      <MainLayout>
        <DailyResultsContent />
      </MainLayout>
    </>
  );
};
export default DailyResults;
