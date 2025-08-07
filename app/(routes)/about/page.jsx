import React from "react";
import MyCompanyInfo from "./_components/MyCompanyInfo";

const Page = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <MyCompanyInfo />
      </div>
    </div>
  );
};

export default Page;
