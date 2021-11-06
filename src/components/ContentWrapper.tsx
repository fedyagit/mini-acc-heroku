import React, { FC } from "react";

const ContentWrapper: FC = ({ children }) => {
  return (
    <main>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 bg-gray-100 border-dashed border-gray-200 rounded-lg  min-h-screen">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContentWrapper;
