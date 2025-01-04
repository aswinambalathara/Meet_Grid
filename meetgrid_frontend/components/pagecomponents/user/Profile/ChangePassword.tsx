import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProfileFormInput from "@/components/ui/Inputs/ProfileFormInput";
import IUser from "@/interfaces/IUser";
import {
  changePassword,
  changePasswordSendOTP,
  verifyChangePasswordOTP,
} from "@/lib/api/user/AuthorisedRoutes";
import { changePasswordSchema } from "@/lib/utility/schemas";
import { ProfilePasswordFormData } from "@/lib/utility/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function ChangePassword({ userData }: { userData: IUser }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    reset
  } = useForm<ProfilePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onBlur",
    reValidateMode: "onSubmit",
  });
  const [forgotPassword, setForgotPassword] = useState<{
    flag: boolean;
    otp: number | null;
    error?: string;
  }>({
    flag: false,
    otp: null,
  });
  const [isClickable, setClickable] = useState(true);
  const [timer, setTimer] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleForgotPassword = async () => {
    if (!isClickable) {
      setModalOpen(true);
      return;
    }
    setClickable(false);
    setTimer(30);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setClickable(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    setModalOpen(true);
    try {
      const result = await changePasswordSendOTP();
      console.log(result);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const handleOTP = async () => {
    if (!forgotPassword.otp) {
      setForgotPassword((prev) => ({
        ...prev,
        error: "This field is required",
      }));
      return;
    }

    if (forgotPassword.otp && forgotPassword.otp.toString().length < 6) {
      setForgotPassword((prev) => ({
        ...prev,
        error: "Invalid OTP",
      }));
      return;
    }

    try {
      const data = await verifyChangePasswordOTP(forgotPassword.otp);
      toast.success(data.message);
      setForgotPassword((prev) => ({ ...prev, flag: true }));
      setModalOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const handleFormSubmit = async (formData: ProfilePasswordFormData) => {
    if (!formData.currentPassword && !forgotPassword.flag) {
      setError("currentPassword", {
        type: "required",
        message: "This field is required",
      });
      return
    }

    if(formData.currentPassword?.length! < 6){
      setError("currentPassword", {
        type: "min",
        message: "Password must contain atleast 6 characters",
      });
      return
    }

    try {
      const result = await changePassword(formData)
      toast.success(result.message);
    } catch (error) {
      if(error instanceof Error){
        toast.error(error.message)
      }
    }finally{
      setForgotPassword({flag:false,otp:null,error:''})
      reset({currentPassword:'',confirmPassword:'',newPassword:''})
    }
  };

  return (
    <div className="container overflow-y-auto h-full p-10 text-black flex flex-col">
      <form
        className="form-section flex flex-col gap-3"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div className="currentPwordWrap relative">
          <ProfileFormInput
            {...register("currentPassword")}
            label="Current Password"
            id="currentPassword"
            type="password"
            placeholder="Current Password"
            disabled={false}
            editIcon={false}
            hidden={forgotPassword.flag}
            error={errors.currentPassword ? errors.currentPassword.message : ""}
          />
          <small
            className="absolute right-0 text-xs mt-1 text-violet-800 cursor-pointer"
            onClick={handleForgotPassword}
            hidden={forgotPassword.flag}
          >
            Forgot Password ?
          </small>
        </div>
        <ProfileFormInput
          {...register("newPassword")}
          type="password"
          label="New Password"
          id="newPassword"
          placeholder="New Password"
          mandatory
          error={errors.newPassword ? errors.newPassword.message : ""}
          disabled={false}
          editIcon={false}
        />
        <ProfileFormInput
          {...register("confirmPassword")}
          id="confirmPassword"
          type="password"
          label="Confirm Password"
          disabled={false}
          placeholder="Confirm Password"
          mandatory
          editIcon={false}
          error={errors.confirmPassword ? errors.confirmPassword.message : ""}
        />

        <div className="flex items-center justify-center mt-3">
          <Button
            size={"lg"}
            type="submit"
            className="bg-violet-700 text-white "
          >
            Update Password
          </Button>
        </div>
      </form>

      <AlertDialog open={isModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center justify-between">
              OTP Verification!
              <Button
                variant={"outline"}
                onClick={() => setModalOpen(false)}
                className="hover:bg-slate-600 hover:text-white"
                size={"sm"}
              >
                <i className="fa-solid fa-xmark"></i>
              </Button>
            </AlertDialogTitle>
            <AlertDialogDescription>
              We have sent an <b>OTP</b> to your registered email ID.
            </AlertDialogDescription>
            <Input
              placeholder="Enter OTP to continue"
              maxLength={6}
              onChange={(e) =>
                setForgotPassword((prev) => ({
                  ...prev,
                  otp: Number(e.target.value),
                }))
              }
            />
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              className="bg-white text-black border border-black hover:bg-black hover:text-white"
              onClick={handleForgotPassword}
            >
              {isClickable ? "Resend OTP" : `Resend OTP in ${timer} seconds`}
            </AlertDialogAction>
            <AlertDialogAction onClick={handleOTP}>
              Submit OTP
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default ChangePassword;
