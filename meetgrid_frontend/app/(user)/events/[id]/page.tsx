import EventDetailPage from "@/components/pagecomponents/user/Events/EventDetailPage";
import React from "react";
import { Toaster } from "react-hot-toast";

function page() {
  return (
    <>
      <Toaster />
      <EventDetailPage />
    </>
  );
}

export default page;
