import React from "react";
import RequireUserAuth from "@/components/wrappers/RequireUserAuth";
import Profile from "@/components/pagecomponents/user/Profile/Layout";

async function page() {
  return (
    <RequireUserAuth>
        <Profile />
    </RequireUserAuth>
  );
}

export default page;
