"use client";
import BusinessList from "@/app/_components/BusinessList";
import GlobalApi from "@/app/_services/GlobalApi";
import React, { useEffect, useState } from "react";

function BusinessByCategory({ params }) {
  const [businessList, setBusinessList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(params);
    params && getBusinessList();
  }, [params]);

  const getBusinessList = () => {
    setIsLoading(true);
    GlobalApi.getBusinessByCategory(params.category).then((resp) => {
      setBusinessList(resp?.bussinessLists || []);
      setIsLoading(false);
    }).catch((error) => {
      console.error("Error fetching businesses:", error);
      setBusinessList([]);
      setIsLoading(false);
    });
  };

  return (
    <div className="min-h-screen">
      {isLoading ? (
        <div className="space-y-6">
          <div className="text-center">
            <div className="h-8 bg-gray-200 rounded-lg animate-pulse mb-4 w-1/3 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2 mx-auto"></div>
          </div>
          <BusinessList businessList={[]} title={params.category} />
        </div>
      ) : (
        <BusinessList 
          businessList={businessList} 
          title={`${params.category} Services`} 
        />
      )}
    </div>
  );
}

export default BusinessByCategory;
