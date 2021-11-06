import { NextPage } from "next";
import MainLayout from "src/layouts/MainLayout";

const Home: NextPage = () => {
  return (
    <>
      <MainLayout>
        <div className="h-96 flex items-center justify-center uppercase">
          <p>Welcome to ours mini accounter</p>
        </div>
      </MainLayout>
    </>
  );
};
export default Home;
