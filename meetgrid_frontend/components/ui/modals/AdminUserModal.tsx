import React, { Dispatch, SetStateAction } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import moment from "moment";
import IUser from "@/interfaces/IUser";
import Image from "next/image";

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
        <AlertDialogContent className="max-w-5xl bg-gradient-to-br from-blue-950/70 to-black/60 gap-4">
          <AlertDialogHeader className="">
            <AlertDialogTitle className="flex items-center gap-2 justify-end">
              <div className="ring-1 ring-white h-[90%] items-center px-2 rounded text-white text-sm inline-flex gap-1">
                <p>Status:</p>
                <p
                  className={`${
                    user.isBlocked
                      ? "text-orange-500"
                      : user.isDeactivated
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {user.isBlocked
                    ? "Blocked"
                    : user.isDeactivated
                    ? "Deactivated"
                    : "Active"}
                </p>
              </div>
              <Button
                variant="ghost"
                className="text-xl text-white border border-white"
                size="icon"
                onClick={closeModal}
              >
                <i className="fa-solid fa-xmark"></i>
              </Button>
            </AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
          </AlertDialogHeader>
          <div className="modal-content text-white p-5 flex flex-col gap-10">
            <div className="top-sec flex gap-10 items-end">
              <div className="profile-Img h-32 w-32 bg-white rounded-full overflow-hidden flex items-center justify-center">
                {user.image ? (
                  <Image
                    src={user.image.url}
                    alt="User Image"
                    width={128}
                    height={128}
                    className="object-cover"
                  />
                ) : (
                  <Image
                    src="/images/profile-img.jpg"
                    alt="User Image"
                    width={128}
                    height={128}
                    className="object-cover"
                  />
                )}
              </div>
              <div className="basic-info flex flex-col gap-1 ">
                <h2 className="font-semibold text-xl capitalize">
                  {user.fullName}
                </h2>
                <p>
                  <i className="fa-solid fa-envelope me-2 text-green-300"></i>
                  {user.email}
                </p>
                {user.phone && (
                  <p>
                    <i className="fa-solid fa-phone me-2 text-blue-300"></i>
                    {user.phone}
                  </p>
                )}
                <p>
                  <i className="fa-solid fa-up-right-from-square me-2 text-cyan-300"></i>
                  <span>Joined at:</span>{" "}
                  {user.createdAt &&
                    moment(user.createdAt).format("MMM D, YYYY")}
                </p>
              </div>
            </div>
            <div className="bottom-sec flex w-full gap-3">
              <div className="location-details flex flex-col gap-1 border border-white min-h-36 w-1/2 rounded">
                <p className="bg-white/50 p-2 text-green-900 font-semibold">
                  Location Info
                </p>
                <div className="content flex flex-col gap-1 p-2"></div>
              </div>
              <div className="prof-info flex flex-col gap-1 border border-white min-h-36 w-1/2 rounded">
                <p className="bg-white/50 p-2 text-cyan-900 font-semibold">
                  Professional Info
                </p>
                <div className="content flex flex-col gap-1 p-2 text-sm">
                  {user.professionalInfo ? (
                    <>
                      <p>
                        <span>Company: </span>
                        {user.professionalInfo?.companyName}
                      </p>
                      <p>
                        <span>Job Title: </span>
                        {user.professionalInfo?.jobTitle}
                      </p>
                      <p>
                        <span>Experience(In yrs): </span>
                        {user.professionalInfo?.experience} 
                      </p>
                    </>
                  ) : (
                    <p className="text-center">Not updated</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default AdminUserModal;
