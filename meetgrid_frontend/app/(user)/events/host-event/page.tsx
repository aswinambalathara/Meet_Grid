import React from "react";
import HostEventPage from "@/components/pagecomponents/user/HostEvents/HostEventPage";
import RequireUserAuth from "@/components/wrappers/RequireUserAuth";

function page() {
  return (
    <RequireUserAuth>
      <HostEventPage />
    </RequireUserAuth>
  );
}

export default page;
