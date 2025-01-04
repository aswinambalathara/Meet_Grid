"use client";
import React, { useState } from "react";
import "@/styles/user.css";
import { Input } from "@/components/ui/input";
import BrownButton from "../Buttons/BrownButton";

function EnterEmail() {
  const [email, setEmail] = useState("");
  const handleSubmit = () => {};
  return (
    <div className="flex flex-col">
      <h2 className="mb-10 font-normal text-lg text-center">
        Enter Your Email Here
      </h2>
      <Input
        type="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email Address"
        className="mb-4"
      />
      <BrownButton label="Send OTP" type="button" onclick={handleSubmit} />
    </div>
  );
}

export default EnterEmail;
