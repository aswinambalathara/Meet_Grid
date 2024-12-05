import UserSignUp from "@/components/pagecomponents/user/Auth/Signup";
import React from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meet Grid | User Signup",
  description: "Connecting You to Events, and Events to Connections",
};

function page() {
  return <UserSignUp />;
}

export default page;
