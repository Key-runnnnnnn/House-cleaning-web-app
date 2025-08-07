"use client";
import GlobalApi from "@/app/_services/GlobalApi";
import { signIn, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import BusinessInfo from "../_components/BusinessInfo";
import SuggestedBusinessList from "../_components/SuggestedBusinessList";
import BusinessDescription from "../_components/BusinessDescription";

function BusinessDetail({ params }) {
  const { data, status } = useSession();
  const [business, setBusiness] = useState([]);

  useEffect(() => {
    params && getbusinessById();
  }, [params]);

  useEffect(() => {
    checkUserAuth();
  }, []);

  const getbusinessById = () => {
    GlobalApi.getBusinessById(params.businessId).then((resp) => {
      setBusiness(resp.businessList);
      console.log(resp.businessList);
    });
  };

  const checkUserAuth = () => {
    if (status == "loading") {
      return <p>Loading...</p>;
    }

    if (status == "unauthenticated") {
      signIn("descope");
    }
  };

  return (
    status == "authenticated" &&
    business && (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BusinessInfo business={business} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
            <div className="lg:col-span-2 order-last lg:order-first">
              <BusinessDescription business={business} />
            </div>
            <div className="lg:col-span-1">
              <SuggestedBusinessList business={business} />
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default BusinessDetail;
