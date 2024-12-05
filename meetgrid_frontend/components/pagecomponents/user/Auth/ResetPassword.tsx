"use client";
import BrownButton from "@/components/ui/Buttons/BrownButton";
import { Input } from "@/components/ui/input";
import Logo from "@/components/ui/Logo";
import "@/styles/user.css";
import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";
import ErrorComponent from "@/components/ui/errors/Error";
import {
  validatePassword,
  validateConfirmPassword,
} from "@/lib/utility/authFormValidation";
import { updateForgotPassword } from "@/lib/api/user/AuthRoutes";
import { useAuth } from "@/lib/hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

function ResetPassword() {
  const router = useRouter();
  const { resetUserEmail } = useAuth();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    newPassword: string | null;
    confirmPassword: string | null;
  }>({
    newPassword: "",
    confirmPassword: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === "new-password") {
      setNewPassword(value);
    } else {
      setConfirmPassword(value);
    }
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
    if (id === "new-password") {
      const passwordError = validatePassword(value);
      setErrors((prev) => ({
        ...prev,
        newPassword: passwordError!,
      }));
    } else if (id === "confirm-password") {
      const passwordError = validateConfirmPassword(value, newPassword);
      setErrors((prev) => ({
        ...prev,
        confirmPassword: passwordError!,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors((prev) => ({
      ...prev,
      newPassword: validatePassword(newPassword),
      confirmPassword: validateConfirmPassword(confirmPassword, newPassword),
    }));

    if (Object.values(errors).some((error) => error !== null)) {
      setLoading(false);
      return;
    }

    try {
      const data = await updateForgotPassword(resetUserEmail, newPassword);
      toast.success(data.message);
      router.replace("/auth/login");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 justify-center min-h-screen">
      <Toaster position="bottom-right" />
      <Logo />
      <form
        onSubmit={handleSubmit}
        className=" p-5 min-w-[450px] min-h-[400px] flex flex-col bg-stone-950 rounded-lg items-center"
      >
        <h2 className="mb-10 font-semibold text-xl mt-5 text-blue-800">
          Reset Password
        </h2>
        <div className="auth-input w-full mb-10 text-slate-300 ">
          <Label className="text-sm ">New Password</Label>
          <Input
            type="password"
            id="new-password"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="New Password"
            className="placeholder:text-blue-800 mb-2"
          />
          {errors.newPassword && <ErrorComponent error={errors.newPassword} />}
        </div>
        <div className="auth-input w-full  mb-10 text-slate-300">
          <Label className="text-sm">Confirm Password</Label>
          <Input
            type="password"
            onChange={handleChange}
            onBlur={handleBlur}
            id="confirm-password"
            placeholder="Confirm Password"
            className="placeholder:text-blue-800 mb-2"
          />
          {errors.confirmPassword && (
            <ErrorComponent error={errors.confirmPassword} />
          )}
        </div>
        <div>
          <BrownButton label="Reset Password" type="submit" />
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
