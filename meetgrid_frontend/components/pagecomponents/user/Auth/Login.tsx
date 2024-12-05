"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BrownButton from "@/components/ui/Buttons/BrownButton";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import IUser, { IUserError } from "@/interfaces/IUser";
import {
  validateEmail,
  validatePassword,
} from "@/lib/utility/authFormValidation";
import debounce from "@/lib/utility/debounce";
import ErrorComponent from "@/components/ui/errors/Error";
import {
  forgotPassword,
  loginOTPEmail,
  loginUser,
} from "@/lib/api/user/AuthRoutes";
import { useAuth } from "@/lib/hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import EnterEmail from "@/components/ui/modals/EnterEmail";
import notfound from "@/app/not-found";
//import withAuth from "@/components/wrappers/RequireUserAuth";

function Login() {
  const router = useRouter();
  const [eye, setEye] = useState(true);
  const [user, setUser] = useState<IUser>({
    email: "",
    password: "",
  });
  const [mounted,setMounted] = useState(false);
  useEffect(()=>{
    setMounted(true)
  },[])
  const {userToken,setCredentials } = useAuth();
  const isAuthorised = !!userToken;

  const [errors, setErrors] = useState<IUserError>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const debouncedValidateEmail = debounce((email: string) => {
    const emailError = validateEmail(email);
    setErrors((prevErrors) => ({ ...prevErrors, email: emailError || "" }));
  }, 500);

  const debouncedValidatePassword = debounce((password: string) => {
    const passwordError = validatePassword(password);
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: passwordError || "",
    }));
  }, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [id]: value,
    }));

    if (id === "email") {
      debouncedValidateEmail(value);
    } else if (id === "password") {
      debouncedValidatePassword(value);
    }
  };

  const handleForgotEmail = async (email: string): Promise<boolean> => {
    try {
      const data = await forgotPassword(email);
      setCredentials("resetUserEmail", email);
      toast.success(data.message);
      return true;
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      return false;
    }
  };

  const handleOtpLogin = async (email: string): Promise<void> => {
    try {
      setCredentials("otpMail", email);
      const data = await loginOTPEmail(email);
      toast.success(data.message);
      router.push("/auth/login-otp");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    const emailError = validateEmail(user.email);
    const passwordError = validatePassword(user.password);
    setErrors({ email: emailError || "", password: passwordError || "" });
    if (emailError || passwordError) {
      setLoading(false);
      return;
    }

    try {
      const data = await loginUser(user.email, user.password);
      setLoading(false);
      setCredentials("userToken", data.accessToken);
      console.log(data);
      router.replace("/");
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  if(!mounted){
    return null;
  }

    if(!isAuthorised){
      return (
        <div className="login-container min-h-screen bg-user-background flex items-center justify-center">
          <Toaster position="bottom-right" />
          <div className="user-auth-background md:w-3/4 min-h-[700px] rounded-xl flex flex-col-reverse md:flex-row items-center justify-between py-16 px-4 lg:px-28 md:py-0">
            <form
              onSubmit={handleSubmit}
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
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="placeholder:text-slate-300 border-amber-950 shadow-none focus-visible:ring-slate-300"
                  />
                  <i className="fa-regular fa-envelope"></i>
                </div>
                {errors.email && <ErrorComponent error={errors.email} />}
              </div>
  
              <div className="grid w-full max-w-sm items-center gap-1.5 mb-5">
                <Label htmlFor="password" className="mb-2">
                  Password
                </Label>
                <div className="auth-input">
                  <Input
                    type={eye ? "password" : "text"}
                    onChange={handleChange}
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
                <div className="relative flex">
                  {errors.password && <ErrorComponent error={errors.password} />}
                  <EnterEmail
                    description="Enter you email for password reset link"
                    button={
                      <small className="text-nav-brown cursor-pointer hover:text-nav-brown/80 text-end absolute right-0">
                        Forgot Password?
                      </small>
                    }
                    handleClick={handleForgotEmail}
                  />
                </div>
              </div>
  
              <div className="grid w-full max-w-sm items-center gap-1.5 mb-5 mt-2">
                <BrownButton label="Login" type="submit" loading={loading} />
              </div>
  
              <div className="mb-3 flex gap-2">
                <div className="w-[2px] h-10 bg-white"></div>
                <div className="cursor-pointer hover:bg-slate-400 rounded-full transition ease duration-300">
                  <EnterEmail
                    description="Enter you email for receiving otp"
                    button={
                      <Image
                        src="/icons/sendOTP.png"
                        alt="sendOTPIcon"
                        width={40}
                        height={40}
                      />
                    }
                    handleClick={handleOtpLogin}
                  />
                </div>
              </div>
              <div>
                <p className="text-sm">
                  Don’t have an account?{" "}
                  <span className="text-sm font-semibold text-stone-900 hover:text-stone-800">
                    <Link href="/auth/signup">SignUp</Link>
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
      return notfound()
    
}

export default Login;
