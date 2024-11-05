"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BrownButton from "@/components/ui/Buttons/BrownButton";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import EnterEmail from "@/components/ui/modals/EnterEmail";
import IUser, { IUserError } from "@/interfaces/IUser";
import {
  validateEmail,
  validatePassword,
} from "@/lib/utils/validations/signupValidation";
import debounce from "@/lib/utils/utilFunctions/debounce";
import Error from "@/components/ui/Error/Error";
import { loginUser } from "@/lib/api/user/AuthRoutes";
import { useAuth } from "@/lib/hooks/useAuth";
import toast, {Toaster} from 'react-hot-toast'
import { useRouter } from "next/navigation";

function Login() {
  const [eye, setEye] = useState(true);
  const [user, setUser] = useState<IUser>({
    email: "",
    password: "",
  });
  const {userToken,setCredentials} = useAuth()
  const [errors, setErrors] = useState<IUserError>({
    email: "",
    password: "",
  });
  const router = useRouter()
  const isAuthorised = !!userToken;
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

  const  handleForgotEmail = () => {};

  const  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('entered')
    const emailError = validateEmail(user.email);
    const passwordError = validatePassword(user.password);
    setErrors({ email: emailError || "", password: passwordError || "" });
    if(emailError || passwordError) return

    const data = await loginUser(user.email,user.password)
    console.log(data)
    if(data.status){
      setCredentials("userToken",data.accessToken);
      setCredentials("userName",data.userName);
      router.push('/')
    }else{
      toast.error(data.message || "Something went wrong");
    }
  };

  return (
    <div className="login-container min-h-screen bg-user-background flex items-center justify-center">
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
            {errors.email && <Error error={errors.email} />}
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

            <div className="flex justify-end">
              {errors.password && <Error error={errors.password} />}
              <EnterEmail
                button={
                  <small className=" text-nav-brown cursor-pointer hover:text-nav-brown/80">
                    Forgot Password?
                  </small>
                }
                handleClick={handleForgotEmail}
              />
            </div>
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5 mb-5">
            <BrownButton label="Login" type="submit" />
          </div>
          <div className="mb-3 flex gap-2">
            <div className="w-[2px] h-10 bg-white"></div>
            <div className="cursor-pointer hover:bg-slate-400 rounded-full transition ease duration-300">
            <Image
            src="/icons/sendOTP.png"
            alt="sendOTPIcon"
            width={40}
            height={40}
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

export default Login;
