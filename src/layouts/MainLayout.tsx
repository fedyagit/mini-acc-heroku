import { FC } from "react";
import ContentWrapper from "src/components/ContentWrapper";
import Header from "src/components/Header";

const MainLayout: FC = ({ children }) => {
  return (
    <>
      <Header />
      <ContentWrapper>{children}</ContentWrapper>
    </>
  );
};
export default MainLayout;
