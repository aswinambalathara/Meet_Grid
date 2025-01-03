import React from "react";
import HostEventPage from "@/components/pagecomponents/user/HostEvents/HostEventPage";
import RequireUserAuth from "@/components/wrappers/RequireUserAuth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meet Grid | Host Event",
  description: "Connecting You to Events, and Events to Connections",
};

function page() {
  return (
    <RequireUserAuth>
      <HostEventPage />
    </RequireUserAuth>
  );
}

export default page;
