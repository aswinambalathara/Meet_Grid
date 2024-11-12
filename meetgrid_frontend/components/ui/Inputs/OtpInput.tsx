"use client";
import React, { useState, useEffect } from "react";
import "@/styles/user.css";
import BrownButton from "../buttons/BrownButton";
import { useAuth } from "@/lib/hooks/useAuth";
import { loginWithOTP, resendOTP } from "@/lib/api/user/AuthRoutes";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

function OtpInput({ length = 6, initialTime = 60}:{length?:number,initialTime?:number}) {
  const {otpMail,setCredentials} = useAuth();
  const otpArray: string[] = Array.from({ length: length as number }, () => "");
  const [otp, setOTP] = useState<string[]>(otpArray);
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isResendVisible, setIsResendVisible] = useState(false);
  const [isSubmitDisabled, setSubmitStatus] = useState(true);
  const router = useRouter()

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsResendVisible(true);
      return;
    }

    const timerId = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  const handleInputChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;

    if (value === "" || /^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;

      setOTP(newOtp);

      if (value && index < length - 1) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  useEffect(() => {
    setSubmitStatus(otp.some((digit) => digit === ""));
  }, [otp]);

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }


  };

  const handleResend = async () => {
    try {
      const data = await resendOTP(otpMail);
      setIsResendVisible(false);
      setTimeLeft(initialTime);
      toast.success(data.message);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleSubmit = async () => {
    //console.log("OTP Submitted:", otp.join(","));
    try {
      const joinedOTP = otp.join("")
      const data = await loginWithOTP(joinedOTP,otpMail);
      setCredentials('userToken',data.accessToken);
      if(data.accessToken) router.push('/')
    } catch (error) {
      if(error instanceof Error){
        toast.error(error.message)
      }
    }
  };

  return (
    <>
      <Toaster />
      <h3 className="text-center mb-7">Enter the OTP sent to your email</h3>
      <div className="flex justify-center mb-5">
        {otp.map((digit, idx) => (
          <input
            key={idx}
            id={`otp-${idx}`}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleInputChange(idx, e)}
            onKeyDown={(e) => handleKeyDown(idx, e)}
            className="bg-transparent w-8 rounded-lg h-11 border-2 me-2 text-center"
          />
        ))}
      </div>

      <div className="flex items-center justify-between mb-3 px-2">
        <small>Didn’t receive OTP?</small>
        <p className="text-zinc-700 text-sm font-semibold">
          {isResendVisible ? (
            <span
              onClick={handleResend}
              className="cursor-pointer text-zinc-800"
            >
              Resend OTP
            </span>
          ) : (
            <span>{formatTime()}</span>
          )}
        </p>
      </div>
      <BrownButton
        disabled={isSubmitDisabled ? true : false}
        type="button"
        label="Submit OTP"
        onclick={handleSubmit}
      />
    </>
  );
}

export default OtpInput;
