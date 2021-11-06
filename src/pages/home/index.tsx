import { NextPage } from "next";
import MainLayout from "src/layouts/MainLayout";
import Header from "../../components/Header";

const Home: NextPage = () => {
  return (
    <>
      <MainLayout />
      <div>Home Page</div>
    </>
  );
};
export default Home;
