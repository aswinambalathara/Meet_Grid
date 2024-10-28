'use client'
import React, { useState } from 'react'
import EnterEmail from "@/components/Inputs/EnterEmail";
import OtpInput from '../Inputs/OtpInput';

function LoginOTP() {
    const [isSentOTP,setIsSentOTP] = useState<boolean>(false);

  return (
    <div className="login-container min-h-screen bg-user-background flex items-center justify-center">
      <div className="user-auth-background md:w-3/4 min-h-screen sm:min-h-[600px] rounded-xl flex flex-col items-center justify-center px-2">
        <div className="signup-note text-white text-center mb-8">
          <h2 className="font-bold text-3xl">MEET GRID</h2>
          <h4>Connecting You to Events, and Events to Connections.</h4>
        </div>
        <form
          action=""
          className="auth-form min-h-[300px] w-full sm:w-[450px] p-7 text-white flex flex-col rounded-lg"
        >
          {isSentOTP ? <EnterEmail /> : <OtpInput/>}
        </form>
      </div>
    </div>
  )
}

export default LoginOTP