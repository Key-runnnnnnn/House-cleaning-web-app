"use client";
import GlobalApi from "@/app/_services/GlobalApi";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

function CategorySideBar() {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const params = usePathname();
  params.split("/")[2];
  useEffect(() => {
    getCategoryList();
  }, []);

  useEffect(() => {
    params && setSelectedCategory(params.split("/")[2]);
  }, [params]);

  /**
   * Used to get All Category List
   */
  const getCategoryList = () => {
    GlobalApi.getCategory().then((resp) => {
      console.log(resp);
      setCategoryList(resp.categories);
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-20">
      <h2 className="text-xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">
        Browse Categories
      </h2>
      <div className="space-y-2">
        {categoryList.map((category, index) => (
          <Link
            href={"/search/" + category.name}
            key={index}
            className={`flex items-center gap-3 p-4 
                rounded-xl transition-all duration-200
                hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50
                hover:shadow-md hover:border-blue-200
                border-2 cursor-pointer group
                ${
                  selectedCategory == category.name
                    ? "border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-md"
                    : "border-gray-100 hover:border-blue-200 text-gray-700"
                }
                 `}
          >
            <div
              className={`p-2 rounded-lg transition-colors duration-200 ${
                selectedCategory == category.name
                  ? "bg-blue-100"
                  : "bg-gray-100 group-hover:bg-blue-100"
              }`}
            >
              <Image
                src={category.icon.url}
                alt="icon"
                width={24}
                height={24}
                className="transition-transform duration-200 group-hover:scale-110"
              />
            </div>
            <h3
              className={`font-medium transition-colors duration-200 ${
                selectedCategory == category.name
                  ? "text-blue-700"
                  : "text-gray-700 group-hover:text-blue-600"
              }`}
            >
              {category.name}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategorySideBar;
