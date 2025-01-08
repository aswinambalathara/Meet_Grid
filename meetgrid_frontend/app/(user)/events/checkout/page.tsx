import React from "react";
import Checkout from "@/components/pagecomponents/user/Events/Checkout";
import RequireUserAuth from "@/components/wrappers/RequireUserAuth";
function page() {
  return (
    <RequireUserAuth>
      <Checkout />
    </RequireUserAuth>
  );
}

export default page;
