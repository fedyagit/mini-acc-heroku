import { NextPage } from "next";
import HomeContent from "src/components/HomeResults";
import MainLayout from "src/layouts/MainLayout";

const Home: NextPage = () => {
  return (
    <>
      <MainLayout>
        <HomeContent />
      </MainLayout>
    </>
  );
};
export default Home;
