"use client";
import React from "react";
import OtpInput from "@/components/ui/Inputs/OtpInput";
import Link from "next/link";
import { useAuth } from "@/lib/hooks/useAuth";
import { notFound } from "next/navigation";

function LoginOTP() {
  const { otpMail } = useAuth();
  const shouldRender = !!otpMail 
  console.log(shouldRender,'hi')

  if (shouldRender) {
    return (
      <div className="login-container min-h-screen bg-user-background flex items-center justify-center">
        <div className="user-auth-background md:w-3/4 min-h-screen sm:min-h-[600px] rounded-xl flex flex-col items-center justify-center px-2">
          <div className="signup-note text-white text-center mb-8">
            <Link href="/">
              <h2 className="font-bold text-3xl">MEET GRID</h2>
            </Link>
            <h4>Connecting You to Events, and Events to Connections.</h4>
          </div>
          <form
            action=""
            className="auth-form min-h-[300px] w-full sm:w-[450px] p-7 text-white flex flex-col rounded-lg"
          >
            <OtpInput />
          </form>
        </div>
      </div>
    );
  }

 return notFound()
}

export default LoginOTP;
