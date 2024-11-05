import React, { ReactNode } from "react";
import BrownButton from "../Buttons/BrownButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


function EnterEmail({button,handleClick}:{button:ReactNode,handleClick:()=>void}) {
  return (
    <Dialog>
       <DialogTrigger asChild>
       {button}
       </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-blue-950/40 text-white">
        <DialogHeader>
          <DialogTitle>Enter Email</DialogTitle>
          <DialogDescription className="text-white">
          Enter your email to receive a password reset link.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">
              Email
            </Label>
            <Input
              id="name"
              placeholder="example@gmail.com"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <BrownButton label="Submit Email" onclick={handleClick} className="px-4 " type="submit" />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EnterEmail;
