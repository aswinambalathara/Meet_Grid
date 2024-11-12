"use client";
import React, { useState } from "react";
import IAdmin, { IAdminErrors } from "@/interfaces/IAdmin";
import BrownButton from "../buttons/BrownButton";
import { Label } from "../label";
import { Input } from "../input";
import Error from "../errors/Error";
import {
  validateEmail,
  validatePassword,
} from "@/lib/utility/authFormValidation";
import debounce from "@/lib/utility/debounce";

function AdminLoginForm() {
  const [admin, setAdmin] = useState<IAdmin>({
    email: "",
    password: "",
  });
  const [eye, setEye] = useState(true);
  const [errors, setErrors] = useState<IAdminErrors>({
    email: "",
    password: "",
  });

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
    setAdmin((prev) => ({
      ...prev,
      [id]: value,
    }));

    if (id === "email") {
      debouncedValidateEmail(value);
    } else if (id === "password") {
      debouncedValidatePassword(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailError = validateEmail(admin.email);
    const passwordError = validatePassword(admin.password);
    setErrors({ email: emailError || "", password: passwordError || "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-full w-full sm:w-[450px] p-7 flex flex-col text-black items-center rounded-lg"
    >
      <h2 className="mb-10 font-semibold text-2xl text-black">Admin Login</h2>
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
            className="placeholder:text-gray-900 border-amber-950 shadow-none focus-visible:ring-slate-300"
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
            id="password"
            onChange={handleChange}
            placeholder="Password"
            className="placeholder:text-gray-900 border-amber-950 shadow-none focus-visible:ring-slate-300"
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
        {errors.password && <Error error={errors.password} />}
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5 mb-5">
        <BrownButton type="submit" label="Login" />
      </div>
    </form>
  );
}

export default AdminLoginForm;
