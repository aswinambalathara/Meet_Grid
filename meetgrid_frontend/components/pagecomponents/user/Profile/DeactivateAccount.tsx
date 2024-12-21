import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import IUser from "@/interfaces/IUser";
import React from "react";

function DeactivateAccount({userData}:{userData:IUser}) {
  return (
    <div className="container overflow-y-auto h-full p-10 text-black flex flex-col">
      <h1 className="font-bold text-red-700">Deactivating Account</h1>
      <strong className="mb-2">Are you sure you want to deactivate your account ?</strong>
      <i className="text-sm mb-2">
        Once deactivated, your account will remain inactive for 30 days, during
        which you can reactivate it by logging in. After 30 days, all your
        account data will be permanently deleted and cannot be recovered. If you
        have any concerns, please contact our support team before proceeding.
      </i>
      <div className="action-section flex gap-2 ">
        <Input placeholder="Enter your password to Continue" className="text-black bg-white/75"/>
        <Button className="bg-red-700 hover:bg-red-800">Deactivate Account</Button>
      </div>
    </div>
  );
}

export default DeactivateAccount;
