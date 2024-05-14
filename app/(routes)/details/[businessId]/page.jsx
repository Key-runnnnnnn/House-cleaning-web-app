"use client";
import { signIn, useSession } from "next-auth/react";
import React from "react";

function BusinessDetail(params) {
  const { data, status } = useSession();
 
  if (status == "loading") {
    return <p>Loading...</p>;
  }

  if (status == "unauthenticated") {
    signIn("descope");
  }

  return (
    status === "authenticated" && (<div>Bussiness Detail</div>)
  )
}

export default BusinessDetail;
