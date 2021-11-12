import { NextPage } from "next";
import MainLayout from "src/layouts/MainLayout";

const Home: NextPage = () => {
  return (
    <>
      <MainLayout>
        <div className="h-96 flex items-center justify-center flex-col">
          <p>Welcome to ours accounting mini-app</p>
          <p>Copyright &copy; {new Date().getFullYear()} Illia Krystal, Olexandr Fedichev | All rights reserved.</p>
        </div>
      </MainLayout>
    </>
  );
};
export default Home;
