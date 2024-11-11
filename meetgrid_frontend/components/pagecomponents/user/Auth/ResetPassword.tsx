"use client";
import BrownButton from "@/components/ui/Buttons/BrownButton";
import { Input } from "@/components/ui/input";
import "@/styles/user.css";
import { Label } from "@radix-ui/react-label";
import React from "react";

function ResetPassword() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <form className=" p-5 min-w-[450px] min-h-[400px] flex flex-col bg-slate-400/50 rounded-lg items-center">
        <h2 className="mb-10 font-semibold text-xl mt-5 text-blue-950">
          Reset Password
        </h2>
        <div className="auth-input w-full mb-10 text-slate-300">
          <Label className="text-sm ">New Password</Label>
          <Input type="text" id="new-password" placeholder="New Password" />
        </div>
        <div className="auth-input w-full  mb-10 text-slate-300">
          <Label className="text-sm">Confirm Password</Label>
          <Input
            type="text"
            id="confirm-password"
            placeholder="Confirm Password"
          />
        </div>
        <div>
          <BrownButton label="Reset Password" type="submit" />
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
