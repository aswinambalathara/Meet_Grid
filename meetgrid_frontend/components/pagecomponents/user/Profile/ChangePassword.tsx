import { Button } from "@/components/ui/button";
import ProfileFormInput from "@/components/ui/Inputs/ProfileFormInput";
import React, { useState } from "react";

function ChangePassword() {
  const [currentPassoword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
            disabled = {false}
            editIcon={false}
          />
          <small className="absolute right-0 text-xs mt-1 text-violet-800 cursor-pointer">Forgot Password ?</small>
        </div>
        <ProfileFormInput
          inputType="text"
          label="New Password"
          id="newPassword"
          name="newPassword"
          placeholder="New Password"
          onChange={() => {}}
          value={newPassword}
          disabled = {false}
          editIcon={false}
        />
        <ProfileFormInput
          id="confirmPassword"
          name="confirmPassword"
          inputType="text"
          label="Confirm Password"
          onChange={() => {}}
          value={confirmPassword}
          disabled = {false}
          placeholder="Confirm Password"
          editIcon={false}
        />

        <div className="flex items-center justify-center mt-3">
          <Button
            size={"lg"}
            className="bg-violet-700 text-white "
          >
            Update Password
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;
