"use client";
import React from "react";
import GlobalApi from "../../../_services/GlobalApi";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
function CategorySideBar() {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = () => {
    GlobalApi.getCategory().then((resp) => {
      console.log(resp);
      setCategoryList(resp.categories);
    });
  };

  return (
    <div>
      <h2 className="font-bold mb-3 text-lg text-primary">Category</h2>
      <div>
        {categoryList.map((category, index) => (
          <Link href={"/search/" + category.name} key={index}
            className="flex gap-2 p-3 
            border rounded-lg mb-3 md:mr-10 cursor-pointer  hover:bg-purple-50
          hover:shadow-md
          items-center
          hover:text-primary
           hover:border-primary"
          >
            <Image src={category.icon.url} alt="icon" width={30} height={30} />
            <h2>{category.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategorySideBar;
