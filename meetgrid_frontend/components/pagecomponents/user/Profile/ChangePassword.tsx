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
import React, { useState } from "react";

function ChangePassword() {
  const [currentPassoword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const handleInputChange = () => {};

  return (
    <div className="container overflow-y-auto h-full p-10 text-black flex flex-col">
      <form className="form-section flex flex-col gap-3">
        <div className="currentPwordWrap relative">
          <ProfileFormInput
            label="Current Password"
            id="currentPassword"
            value={currentPassoword}
            inputType="text"
            name="currentPassword"
            placeholder="Current Password"
            onChange={() => {}}
            disabled={false}
            editIcon={false}
          />
          <small
            className="absolute right-0 text-xs mt-1 text-violet-800 cursor-pointer"
            onClick={() => setModalOpen(true)}
          >
            Forgot Password ?
          </small>
        </div>
        <ProfileFormInput
          inputType="text"
          label="New Password"
          id="newPassword"
          name="newPassword"
          placeholder="New Password"
          onChange={() => {}}
          value={newPassword}
          disabled={false}
          editIcon={false}
        />
        <ProfileFormInput
          id="confirmPassword"
          name="confirmPassword"
          inputType="text"
          label="Confirm Password"
          onChange={() => {}}
          value={confirmPassword}
          disabled={false}
          placeholder="Confirm Password"
          editIcon={false}
        />

        <div className="flex items-center justify-center mt-3">
          <Button size={"lg"} className="bg-violet-700 text-white ">
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
