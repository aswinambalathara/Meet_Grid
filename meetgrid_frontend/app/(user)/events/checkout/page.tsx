import React from "react";
import Checkout from "@/components/pagecomponents/user/Events/Checkout";
import RequireUserAuth from "@/components/wrappers/RequireUserAuth";
import { Toaster } from "react-hot-toast";
function page() {
  return (
    <RequireUserAuth>
      <Toaster/>
      <Checkout />
    </RequireUserAuth>
  );
}

export default page;
