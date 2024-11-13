import React, { Dispatch, SetStateAction } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import IUser from "@/interfaces/IUser";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  user: IUser;
};

function AdminUserModal({ open, setOpen, user }: Props) {
  const closeModal = () => {
    setOpen(false);
  };

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="max-w-5xl bg-slate-900/50">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center justify-end">
              <Button
                variant="ghost"
                className="text-xl"
                size="icon"
                onClick={closeModal}
              >
                X
              </Button>
            </AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
          </AlertDialogHeader>
          <div className=" min-w-max border min-h-10">
            <div className="header text-white">
                <h1>{user.fullName}</h1>
                <h3>{user.gender}</h3>
            </div>
            <div className="detail wrapper flex">
                <div className="Professional"></div>

            </div>
          </div>
          <AlertDialogFooter>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default AdminUserModal;
