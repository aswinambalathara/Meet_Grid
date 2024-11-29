import React, { ReactNode, useState } from "react";
import BrownButton from "../Buttons/BrownButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validateEmail } from "@/lib/utility/authFormValidation";
import ErrorComponent from "@/components/ui/errors/Error";
function EnterEmail({
  button,
  handleClick,
  description,
}: {
  button: ReactNode;
  handleClick: (email: string) => Promise<boolean | void>;
  description: string;
}) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleSubmit = async () => {
    const error = validateEmail(email);
    if (error) {
      setError(error);
      return;
    }
    setLoading(true);
    const result = await handleClick(email);
    if (result !== null) {
      if (result) {
        setOpen(false);
      }
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{button}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-blue-950/40 text-white">
        <DialogHeader>
          <DialogTitle>Enter Email</DialogTitle>
          <DialogDescription className="text-white">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Email</Label>
            <Input
              id="name"
              placeholder="example@gmail.com"
              className="col-span-3"
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <ErrorComponent error={error} />}
          </div>
        </div>
        <DialogFooter>
          <BrownButton
            label="Submit Email"
            onclick={handleSubmit}
            className="px-4 "
            type="submit"
            loading={loading}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EnterEmail;
