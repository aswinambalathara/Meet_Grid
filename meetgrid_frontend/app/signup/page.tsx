"use client";
import "@/styles/user.css";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BrownButton from "@/components/Buttons/BrownButton";
import { useState } from "react";
function UserSignUp() {
  const [Peye, setPeye] = useState(true);
  const [CPeye, setCPeye] = useState(true);
  const handleSubmit = () => {};
  return (
    <div className="SignUp-Container container min-h-screen bg-user-background flex items-center justify-center">
      <div className="user-auth-background md:w-3/4 min-h-[600px] rounded-xl flex flex-col md:flex-row items-center justify-between py-16 px-4 lg:px-28 md:py-0">
        <div className="signup-note text-white text-center mb-8 md:mb-0">
          <h2 className="font-bold text-3xl">MEET GRID</h2>
          <h4>Connecting You to Events, and Events to Connections.</h4>
        </div>
        <form
          action=""
          className="auth-form min-h-[500px] w-full sm:w-[450px] p-7 text-white flex flex-col items-center rounded-lg"
        >
          <h2 className="mb-10 font-semibold text-2xl">Sign Up</h2>
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-5">
            <Label htmlFor="fullname" className="mb-2">
              Full Name
            </Label>
            <div className="auth-input">
              <Input
                type="text"
                id="fullname"
                placeholder="Full Name"
                className="placeholder:text-slate-300 border-amber-950 shadow-none focus-visible:ring-slate-300"
              />
              <i className="fa-regular fa-user"></i>
            </div>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-5">
            <Label htmlFor="email" className="mb-2">
              Email Address
            </Label>
            <div className="auth-input">
              <Input
                type="email"
                id="email"
                placeholder="Email Address"
                className="placeholder:text-slate-300 border-amber-950 shadow-none focus-visible:ring-slate-300"
              />
              <i className="fa-regular fa-envelope"></i>
            </div>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-5">
            <Label htmlFor="password" className="mb-2">
              Password
            </Label>
            <div className="auth-input">
              <Input
                type={Peye? 'password' : 'text'}
                id="password"
                placeholder="Password"
                className="placeholder:text-slate-300 border-amber-950 shadow-none focus-visible:ring-slate-300"
              />
              {Peye ? (
                <i onClick={()=>setPeye(!Peye)} className="fa-regular fa-eye cursor-pointer"></i>
              ) : (
                <i onClick={()=>setPeye(!Peye)} className="fa-solid fa-eye-slash cursor-pointer"></i>
              )}
            </div>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-5">
            <Label htmlFor="confirmPassword" className="mb-2">
              Confirm Password
            </Label>
            <div className="auth-input"> 
              <Input
                type={CPeye? 'password' : 'text'}
                id="confirmPassword"
                placeholder="Confim Password"
                className="placeholder:text-slate-300 border-amber-950 shadow-none focus-visible:ring-slate-300"
              />
              {CPeye ? (
                <i onClick={()=>setCPeye(!CPeye)} className="fa-regular fa-eye cursor-pointer"></i>
              ) : (
                <i onClick={()=>setCPeye(!CPeye)} className="fa-solid fa-eye-slash cursor-pointer"></i>
              )}
            </div>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-5">
            <BrownButton label="Sign Up" onclick={handleSubmit} />
          </div>
          <div>
            <p className="text-sm">
              Already have an account?{" "}
              <span className="text-sm font-semibold text-stone-900">
                Login
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserSignUp;
