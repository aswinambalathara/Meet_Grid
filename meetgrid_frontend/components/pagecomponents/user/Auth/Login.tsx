"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BrownButton from "@/components/ui/Buttons/BrownButton";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

function Login() {
  const [eye, setEye] = useState(true);

  const handleSubmit = () => {};
  return (
    <div className="login-container min-h-screen bg-user-background flex items-center justify-center">
      <div className="user-auth-background md:w-3/4 min-h-[700px] rounded-xl flex flex-col-reverse md:flex-row items-center justify-between py-16 px-4 lg:px-28 md:py-0">
        <form
          action=""
          className="auth-form min-h-[500px] w-full sm:w-[450px] p-7 text-white flex flex-col items-center rounded-lg change-transition"
        >
          <h2 className="mb-10 font-semibold text-2xl">Login</h2>
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
                type={eye ? "password" : "text"}
                id="password"
                placeholder="Password"
                className="placeholder:text-slate-300 border-amber-950 shadow-none focus-visible:ring-slate-300"
              />
              {eye ? (
                <i
                  onClick={() => setEye(!eye)}
                  className="fa-regular fa-eye cursor-pointer"
                ></i>
              ) : (
                <i
                  onClick={() => setEye(!eye)}
                  className="fa-solid fa-eye-slash cursor-pointer"
                ></i>
              )}
            </div>
            <Link href="/forgotpassword" className="text-right text-nav-brown">
              <small>Forgot Password?</small>
            </Link>
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5 mb-5">
            <BrownButton label="Login" onclick={handleSubmit} />
          </div>
          <div className="mb-3 flex gap-2">

            <div className="w-[2px] h-10 bg-white"></div>
            <Image
              src="/icons/sendOTP.png"
              alt="sendOTPIcon"
              width={40}
              height={40}
            />
          </div>
          <div>
            <p className="text-sm">
              Don’t have an account?{" "}
              <span className="text-sm font-semibold text-stone-900">
                <Link href='/auth/signup'>SignUp</Link>
              </span>
            </p>
          </div>
        </form>
        <div className="signup-note text-white text-center mb-8 md:mb-0">
          <Link href="/">
            <h2 className="font-bold text-3xl">MEET GRID</h2>
          </Link>
          <h4>Connecting You to Events, and Events to Connections</h4>
        </div>
      </div>
    </div>
  );
}

export default Login;
