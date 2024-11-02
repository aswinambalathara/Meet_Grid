"use client";

import "@/styles/user.css";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BrownButton from "@/components/Buttons/BrownButton";
import { useState } from "react";
import Link from "next/link";
import IUser from "@/interfaces/IUser";
import Error from "@/components/Error/Error";

function UserSignUp() {
  const [Peye, setPeye] = useState(true);
  const [CPeye, setCPeye] = useState(true);
  const [user, setUser] = useState<IUser>({
    email: "",
    fullName: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((user) => ({
      ...user,
      [name]: value,
    }));
  };

const validateInput = (e:React.ChangeEvent<HTMLInputElement>) =>{
  
  let errorMessage = ''

  const {name,value} = e.target;
  switch(name){
    case 'fullName':
      if (!value.trim()) {
        errorMessage = 'Full Name is required';
      } else if (value.length < 3) {
        errorMessage = 'Full Name must be at least 3 characters';
      }
      break;
    
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          errorMessage = 'Email is required';
        } else if (!emailRegex.test(value)) {
          errorMessage = 'Invalid email format';
        }
        break;

    case 'password':
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
       if(!passwordRegex.test(value)){
        errorMessage = "Password must be at least 6 characters, include at least one uppercase letter, one number, and one special character"
      }
      break;
    
      case 'confirmPassword':
        if (value !== user.password) {
          errorMessage = 'Passwords do not match';
        }
        break;

      default:
        break;
  }

  setErrors((prevErrors) => ({
    ...prevErrors,
    [name]: errorMessage
  }));
}

  const handleSubmit = () => {};
  return (
    <div className="SignUp-Container container min-h-screen bg-user-background flex items-center justify-center">
      <div className="user-auth-background md:w-3/4 min-h-[600px] rounded-xl flex flex-col md:flex-row items-center justify-between py-16 px-4 lg:px-28 md:py-0">
        <div className="signup-note text-white text-center mb-8 md:mb-0">
          <Link href="/">
            <h2 className="font-bold text-3xl">MEET GRID</h2>
          </Link>
          <h4>Connecting You to Events, and Events to Connections.</h4>
        </div>
        <form
          action=""
          className="auth-form min-h-[500px] w-full sm:w-[450px] p-7 text-white flex flex-col items-center rounded-lg"
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
                onBlur={validateInput}
                className="placeholder:text-slate-300 border-amber-950 shadow-none focus-visible:ring-slate-300"
              />
              <i className="fa-regular fa-user"></i>
              <Error />
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
                value={user.email}
                placeholder="Email Address"
                className="placeholder:text-slate-300 border-amber-950 shadow-none focus-visible:ring-slate-300"
              />
              <i className="fa-regular fa-envelope"></i>
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
            </div>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-5">
            <BrownButton label="Sign Up" onclick={handleSubmit} />
          </div>
          <div>
            <p className="text-sm">
              Already have an account?{" "}
              <span className="text-sm font-semibold text-stone-900">
                Login
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserSignUp;
