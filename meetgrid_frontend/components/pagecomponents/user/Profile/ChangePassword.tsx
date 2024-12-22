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
import { changePasswordSendOTP } from "@/lib/api/user/AuthorisedRoutes";
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
  } = useForm<ProfilePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    mode:'onChange',
    reValidateMode:'onSubmit'
  });
  const [forgotPassword, setForgotPassword] = useState<{
    flag: boolean;
    otp: number | null;
  }>({
    flag: false,
    otp: null,
  });
  const [isModalOpen, setModalOpen] = useState(false);

  const handleForgotPassword = async () => {
    try {
      const result = await changePasswordSendOTP()
      console.log(result)
    } catch (error) {
      if(error instanceof Error){
        toast.error(error.message)
      }
      
    }
  };

  const handleFormSubmit = () => {};

  return (
    <div className="container overflow-y-auto h-full p-10 text-black flex flex-col">
      <form
        className="form-section flex flex-col gap-3"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div className="currentPwordWrap relative">
          <ProfileFormInput
            {...register("currentpassword")}
            label="Current Password"
            id="currentPassword"
            type="password"
            placeholder="Current Password"
            disabled={false}
            editIcon={false}
            error={errors.currentpassword ? errors.currentpassword.message : ""}
          />
          <small
            className="absolute right-0 text-xs mt-1 text-violet-800 cursor-pointer"
            onClick={handleForgotPassword}
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
            <Input placeholder="Enter OTP to continue" />
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>RESET</AlertDialogCancel>
            <AlertDialogAction>Submit OTP</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default ChangePassword;
