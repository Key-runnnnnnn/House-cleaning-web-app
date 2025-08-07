import React from "react";
import CategorySideBar from "./_components/CategorySideBar";

function layout({ children }) {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            {/* Side Category Nav bar  */}
            <CategorySideBar />
          </div>
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default layout;
