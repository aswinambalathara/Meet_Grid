import React from "react";
import "@/styles/user.css";
import ExploreEvents from "@/components/pagecomponents/user/Events/ExploreEvents";
import { Toaster } from "react-hot-toast";

function page() {
  return (
    <>
      <Toaster />
      <ExploreEvents />
    </>
  );
}

export default page;
