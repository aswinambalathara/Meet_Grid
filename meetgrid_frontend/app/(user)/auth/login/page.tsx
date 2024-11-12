import React from "react";
import Login from "@/components/pagecomponents/user/auth/Login";
import { Metadata } from "next";
import RequireUserAuth from "@/components/wrappers/requireUserAuth";

export const metadata: Metadata = {
  title: "Meet Grid | User Login",
  description: "Connecting You to Events, and Events to Connections",
};

function page() {
  
  return (
    <RequireUserAuth>
      <Login />;
    </RequireUserAuth>
  )
}

export default page;
