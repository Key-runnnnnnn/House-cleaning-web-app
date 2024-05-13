"use client"
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
import Hero from "./_components/Hero";
import CategoryList from "./_components/CategoryList";
import GlobalApi from "./_survices/GlobalApi";
import { useEffect, useState} from "react";

export default function Home() {
  console.log("hello kiran")

  const [categoryList,setCategoryList]=useState([]);
  useEffect(() => {
    getCategoryList()
  }, [])

  const getCategoryList = () => {
    GlobalApi.getCategory().then(resp => {
      setCategoryList(resp.categories);
    })
  }

  return (
    <div>
      <Hero />
      <CategoryList categoryList={categoryList}/>
    </div>
  );
}
