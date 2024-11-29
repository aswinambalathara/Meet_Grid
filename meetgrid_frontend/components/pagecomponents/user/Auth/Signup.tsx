"use client";

import "@/styles/user.css";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BrownButton from "@/components/ui/Buttons/BrownButton";
import { use, useEffect, useState } from "react";
import Link from "next/link";
import IUser, { IUserError } from "@/interfaces/IUser";
import toast, { Toaster } from "react-hot-toast";
import ErrorComponent from "@/components/ui/errors/Error";
import {
  validateSignUpForm,
  validateEmail,
  validateConfirmPassword,
  validateFullName,
  validatePassword,
} from "@/lib/utility/authFormValidation";

import { signUpUser } from "@/lib/api/user/AuthRoutes";
import { useAuth } from "@/lib/hooks/useAuth";
import notfound from "@/app/not-found";

function UserSignUp() {
  const { userToken } = useAuth();
  const isAuthorised = !!userToken;

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [Peye, setPeye] = useState(true);
  const [loading, setLoading] = useState(false);
  const [CPeye, setCPeye] = useState(true);
  const [user, setUser] = useState<IUser>({
    email: "",
    fullName: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<IUserError>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === "confirmPassword") {
      setConfirmPassword(value);
    } else {
      setUser((user) => ({
        ...user,
        [id]: value,
      }));
    }

    if (id === "password") {
      const errorMessage = validatePassword(value);

      setErrors((prev) => ({
        ...prev,
        [id]: errorMessage,
      }));
    }
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    let errorMessage: string | null = "";
    const { id, value } = e.target;
    switch (id) {
      case "fullName":
        errorMessage = validateFullName(value);
        break;
      case "email":
        errorMessage = validateEmail(value);
        break;
      case "password":
        errorMessage = validatePassword(value);
        break;
      case "confirmPassword":
        errorMessage = validateConfirmPassword(value, user.password);
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: errorMessage,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log("handle submit");
    setErrors({});
    const formErrors = validateSignUpForm(
      user.fullName!,
      user.email,
      user.password,
      confirmPassword
    );
    setErrors(formErrors);
    console.log(formErrors);
    const hasErrors = Object.values(formErrors).some((error) => error !== null);

    if (hasErrors) {
      return setLoading(false);
    }

    try {
      const data = await signUpUser(user);
      setLoading(false);
      toast.success(data.message);
    } catch (error: unknown) {
      //console.log(error,"hi")
      setLoading(false);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  if (!mounted) {
    return null;
  }

  if (isAuthorised) {
    return notfound();
  }

  return (
    <div className="SignUp-Container container min-h-screen bg-user-background flex items-center justify-center">
      <Toaster />
      <div className="user-auth-background md:w-3/4 min-h-[700px] rounded-xl flex flex-col md:flex-row items-center justify-between py-16 px-4 lg:px-28 md:py-0">
        <div className="signup-note text-white text-center mb-8 md:mb-0">
          <Link href="/">
            <h2 className="font-bold text-3xl">MEET GRID</h2>
          </Link>
          <h4>Connecting You to Events, and Events to Connections.</h4>
        </div>
        <form
          onSubmit={handleSubmit}
          className="auth-form min-h-[500px] w-full sm:w-[450px] p-7 text-white flex flex-col items-center rounded-lg change-transition"
        >
          <h2 className="mb-10 font-semibold text-2xl">Sign Up</h2>
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-5">
            <Label htmlFor="fullname" className="mb-2">
              Full Name
            </Label>
            <div className="auth-input">
              <Input
                type="text"
                id="fullName"
                value={user.fullName}
                placeholder="Full Name"
                onChange={handleChange}
                onBlur={handleBlur}
                className="placeholder:text-slate-300 border-amber-950 shadow-none focus-visible:ring-slate-300"
              />
              <i className="fa-regular fa-user"></i>
              {errors.fullName && <ErrorComponent error={errors.fullName} />}
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
                onChange={handleChange}
                onBlur={handleBlur}
                value={user.email}
                placeholder="Email Address"
                className="placeholder:text-slate-300 border-amber-950 shadow-none focus-visible:ring-slate-300"
              />
              <i className="fa-regular fa-envelope"></i>
              {errors.email && <ErrorComponent error={errors.email} />}
            </div>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-5">
            <Label htmlFor="password" className="mb-2">
              Password
            </Label>
            <div className="auth-input">
              <Input
                type={Peye ? "password" : "text"}
                id="password"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Password"
                value={user.password}
                className="placeholder:text-slate-300 border-amber-950 shadow-none focus-visible:ring-slate-300"
              />
              {Peye ? (
                <i
                  onClick={() => setPeye(!Peye)}
                  className="fa-regular fa-eye cursor-pointer"
                ></i>
              ) : (
                <i
                  onClick={() => setPeye(!Peye)}
                  className="fa-solid fa-eye-slash cursor-pointer"
                ></i>
              )}
              {errors.password && <ErrorComponent error={errors.password} />}
            </div>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-5">
            <Label htmlFor="confirmPassword" className="mb-2">
              Confirm Password
            </Label>
            <div className="auth-input">
              <Input
                type={CPeye ? "password" : "text"}
                id="confirmPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Confim Password"
                value={confirmPassword}
                className="placeholder:text-slate-300 border-amber-950 shadow-none focus-visible:ring-slate-300"
              />
              {CPeye ? (
                <i
                  onClick={() => setCPeye(!CPeye)}
                  className="fa-regular fa-eye cursor-pointer"
                ></i>
              ) : (
                <i
                  onClick={() => setCPeye(!CPeye)}
                  className="fa-solid fa-eye-slash cursor-pointer"
                ></i>
              )}
              {errors.confirmPassword && (
                <ErrorComponent error={errors.confirmPassword} />
              )}
            </div>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-5">
            <BrownButton
              label={"Signup"}
              type="submit"
              onclick={handleSubmit}
              loading={loading}
            />
          </div>
          <div>
            <p className="text-sm">
              Already have an account?{" "}
              <span className="text-sm font-semibold text-stone-900">
                <Link href="/auth/login">Login</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserSignUp;
