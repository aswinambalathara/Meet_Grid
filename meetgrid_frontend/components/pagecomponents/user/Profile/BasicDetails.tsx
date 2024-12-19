"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import ProfileFormInput from "@/components/ui/Inputs/ProfileFormInput";
import IUser from "@/interfaces/IUser";
import { getUserProfile } from "@/lib/api/user/AuthorisedRoutes";
import React, { useEffect, useRef, useState } from "react";
import { basicDetailsSchema } from "@/lib/utility/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

function BasicDetails() {
  const editBioRef = useRef<HTMLTextAreaElement>(null);
  const [isBioEditing, setBioEditing] = useState(false);
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(true);
  const [isEmailVerified, setVerification] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    getValues,
  } = useForm({
    resolver: zodResolver(basicDetailsSchema),
  });

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const data = await getUserProfile();
        reset(data.data);
        if (data.data.bio) {
          setBio(data.data.bio);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchUserProfile();
  }, [reset]);

  const handleSetLocation = () => {};

  const handleBioEdit = () => {
    const elem = editBioRef.current;
    if (elem) {
      elem.disabled = !elem.disabled;
      elem.focus();
    }
    setBioEditing(!isBioEditing);
  };
  const displayValues = getValues();
  if (loading) return null;

  return (
    <div className="container overflow-y-auto h-full p-10 text-black flex flex-col">
      <div className="top-part flex items-start">
        <div className="left basis-1/6">
          <div className="image-container bg-gray-600 h-24 w-24 rounded-full"></div>
          <small>Upload Image</small>
        </div>

        <div className="right basis-5/6">
          <h3 className="font-semibold text-black text-lg">
            {displayValues.fullName}
          </h3>
          <div className="bio w-full mt-2">
            <label htmlFor="bio" className="text-sm">
              Bio
            </label>
            <div className="relative">
              <textarea
                ref={editBioRef}
                disabled
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                name="bio"
                id="bio"
                placeholder="enter something about you"
                rows={5}
                className="text-black rounded-lg w-full p-1 px-2 text-sm bg-white/50"
              />
              <i
                className={`fa-regular ${
                  !isBioEditing && "fa-pen-to-square text-blue-900"
                } absolute right-3 top-3 cursor-pointer`}
                onClick={handleBioEdit}
              ></i>
            </div>
          </div>
        </div>
      </div>

      <form className="form-section flex flex-col gap-3">
        <ProfileFormInput
          label="Full Name"
          id="fullName"
          value={displayValues.fullName}
          inputType="text"
          placeholder="Full Name"
          {...register("fullName")}
        />
        <ProfileFormInput
          inputType="email"
          label="Email Address"
          id="email"
          placeholder="Email"
          value={displayValues.email}
          {...register("email")}
        />
        <ProfileFormInput
          id="phone"
          inputType="text"
          label="Phone Number"
          {...register("phone")}
          value={displayValues.phone}
          placeholder="Phone Number"
        />

        <Accordion
          type="single"
          className="bg-white/50  rounded-md mt-2"
          collapsible
        >
          <AccordionItem value="item-1" className="px-2">
            <AccordionTrigger>Location</AccordionTrigger>
            <AccordionContent className="bg-slate-300/75 rounded mb-2 p-4 flex flex-col gap-4">
              <ProfileFormInput
                value={displayValues.location?.addressLine || ""}
                id="location.addressLine"
                label="Address Line"
                inputType="text"
                disabled={true}
                {...register("location.addressLine")}
                placeholder="Address Line"
              />
              <div className="address-row-2 flex items-center justify-between gap-2">
                <ProfileFormInput
                  value={displayValues.location?.city || ""}
                  id="location.city"
                  label="City"
                  inputType="text"
                  disabled={true}
                  {...register("location.city")}
                  placeholder="City"
                />
                <ProfileFormInput
                  value={displayValues.location?.state || ""}
                  id="location.state"
                  label="State"
                  inputType="text"
                  disabled={true}
                  {...register("location.state")}
                  placeholder="State"
                />
              </div>
              <div className="address-row-3 flex items-center justify-between gap-2">
                <ProfileFormInput
                  value={displayValues.location?.country || ""}
                  id="location.country"
                  label="Country"
                  inputType="text"
                  disabled={true}
                  {...register("location.country")}
                  placeholder="Country"
                />
                <ProfileFormInput
                  value={displayValues.location?.postalCode}
                  id="location.postalCode"
                  label="Postal Code"
                  inputType="text"
                  disabled={true}
                  {...register("location.postalCode")}
                  placeholder="Postal Code"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="flex items-center justify-center mt-3">
          <Button size={"lg"} className="bg-violet-700 text-white ">
            Update Basic Details
          </Button>
        </div>
      </form>
    </div>
  );
}

export default BasicDetails;
