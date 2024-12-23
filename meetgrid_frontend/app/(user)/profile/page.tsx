import React, { Suspense } from "react";
import RequireUserAuth from "@/components/wrappers/RequireUserAuth";
const Loading = React.lazy(
  () => import("@/components/pagecomponents/user/Layout/Loading")
);
const Profile = React.lazy(
  () => import("@/components/pagecomponents/user/Profile/Layout")
);
async function page() {
  return (
    <RequireUserAuth>
        <Profile />
    </RequireUserAuth>
  );
}

export default page;
