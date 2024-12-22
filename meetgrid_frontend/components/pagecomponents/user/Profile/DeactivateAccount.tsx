import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import IUser from "@/interfaces/IUser";
import { deactivateAccount } from "@/lib/api/user/AuthorisedRoutes";
import { userLogout } from "@/lib/api/user/AuthRoutes";
import { useAuth } from "@/lib/hooks/useAuth";
import React, { MouseEvent, useState } from "react";
import toast from "react-hot-toast";

function DeactivateAccount({userData}:{userData:IUser}) {
  const {logout} = useAuth()
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')
  const handleOnSubmit = async (e:MouseEvent<HTMLButtonElement>) =>{
    e.preventDefault()
    const confirm = window.confirm('Your Account will be Deactivated, Are you sure?')
    if(confirm){
      if(password.length<6){
        setError('Password must be atleat 6 letters')
        return
      }
      try {
        const result = await deactivateAccount(password)
        toast.success(result.message)
        if(result.status){
          await userLogout()
          logout('userToken')
        }
      } catch (error) {
        if(error instanceof Error){
          toast.error(error.message);
          setError(error.message)
        }
      }
    }
  }

  return (
    <div className="container overflow-y-auto h-full p-10 text-black flex flex-col">
      <h1 className="font-bold text-red-700">Deactivating Account</h1>
      <strong className="mb-2">Are you sure you want to deactivate your account ?</strong>
      <i className="text-sm mb-2">
        Once deactivated, your account will remain inactive for 30 days, during
        which you can reactivate it by logging in. After 30 days, all your
        account data will be permanently deleted and cannot be recovered. If you
        have any concerns, please contact our support team before proceeding.
      </i>
      <div className="action-section flex gap-2 ">
        <Input placeholder="Enter your password to Continue" type="password" onChange={(e)=>setPassword(e.target.value)} className="text-black bg-white/75"/>
        <Button type="submit" onClick={handleOnSubmit} className="bg-red-700 hover:bg-red-800">Deactivate Account</Button>
      </div>
      <small className="text-red-600 mt-1">{error}</small>
    </div>
  );
}

export default DeactivateAccount;
