'use client'
import React, { useState, useEffect } from 'react';
import '@/styles/user.css';
import BrownButton from '../Buttons/BrownButton';



function OtpInput({ length = 6, initialTime = 60 }) {
  const otpArray:string[] = Array.from({ length:length as number},()=>'');
  const [otp, setOTP] = useState<string[]>(otpArray) ;
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isResendVisible, setIsResendVisible] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsResendVisible(true);
      return;
    }

    const timerId = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timerId); 
  }, [timeLeft]);

  
  const handleInputChange = (index: number, value: string) => {
    if (value === '' || /^[0-9]$/.test(value)) { 
      const newOtp = [...otp];
      newOtp[index] = value;
      // Update state
      setOTP(newOtp);

      // Move focus to the next input
      if (value && index < length - 1) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  // Resend OTP
  const handleResend = () => {
    setIsResendVisible(false);
    setTimeLeft(initialTime); // Restart the timer
    // Logic to send OTP goes here
  };

  // Format time as MM:SS
  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSubmit = () => {
    // Submit OTP logic here
    console.log("OTP Submitted:", otp.join(''));
  };

  return (
    <>
      <h3 className='text-center mb-7'>Enter the OTP sent to your email</h3>
      <div className='flex justify-center mb-5'>
        {otp.map((digit, idx) => (
          <input
            key={idx}
            id={`otp-${idx}`}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleInputChange(idx, e.target.value)}
            className='bg-transparent w-8 rounded-lg h-11 border-2 me-2 text-center'
          />
        ))}
      </div>
      <div className='flex items-center justify-between mb-3 px-2'>
        <small>Didn’t receive OTP?</small>
        <p className='text-zinc-700 text-sm font-semibold'>
          {isResendVisible ? (
            <span onClick={handleResend} className='cursor-pointer text-zinc-800'>Resend OTP</span>
          ) : (
            <span>{formatTime()}</span>
          )}
        </p>
      </div>
      <BrownButton label='Submit OTP' onclick={handleSubmit} />
    </>
  );
}

export default OtpInput;
