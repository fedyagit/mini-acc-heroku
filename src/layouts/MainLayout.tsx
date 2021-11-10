import { FC } from "react";
import ContentWrapper from "src/components/ContentWrapper";
import Header from "src/components/Header";

const MainLayout: FC = ({ children }) => {
  return (
    <div className="font-mono">
      <Header />
      <ContentWrapper>{children}</ContentWrapper>
    </div>
  );
};
export default MainLayout;
