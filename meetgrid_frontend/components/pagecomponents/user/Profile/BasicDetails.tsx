"use client";
import ProfileFormInput from "@/components/ui/Inputs/ProfileFormInput";
import IUser from "@/interfaces/IUser";
import React, { useRef, useState } from "react";

function BasicDetails() {
  const editBioRef = useRef<HTMLTextAreaElement>(null);
  const [isBioEditing, setBioEditing] = useState(false);
  const [basicDetails, setBasicDetails] = useState<IUser>({
    fullName: "",
    email: "",
    phone: "",
    location: {
      addressLine: "",
      city: "",
      country: "",
      postalCode: "",
      state: "",
    },
    image: "",
    bio: "",
  });

  const handleSetBasicDetails = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    setBasicDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBioEdit = () => {
    const elem = editBioRef.current;
    if (elem) {
      elem.disabled = !elem.disabled;
      elem.focus();
    }
    setBioEditing(!isBioEditing);
  };

  return (
    <div className="container overflow-y-auto h-full p-10 text-black flex flex-col">
      <div className="top-part flex items-start">
        <div className="left basis-1/6">
          <div className="image-container bg-gray-600 h-24 w-24 rounded-full"></div>
          <small>Upload Image</small>
        </div>

        <div className="right basis-5/6">
          <h3 className="font-semibold text-black text-lg">Aswin Nair T M </h3>
          <div className="bio w-full mt-2">
            <label htmlFor="bio" className="text-sm">
              Bio
            </label>
            <div className="relative">
              <textarea
                ref={editBioRef}
                disabled
                onChange={handleSetBasicDetails}
                value={basicDetails.bio}
                name="bio"
                id="bio"
                placeholder="enter something about you"
                rows={5}
                className="text-black rounded-lg w-full p-1 px-2 text-sm bg-white/50"
              />
              <i
                className={`fa-regular ${
                  isBioEditing
                    ? "fa-square-check text-green-700"
                    : "fa-pen-to-square text-blue-900"
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
          value={basicDetails.fullName!}
          inputType="text"
          name="fullName"
          placeholder="Full Name"
          onChange={handleSetBasicDetails}
        />
        <ProfileFormInput
          inputType="string"
          label="Email Address"
          id="email"
          name="email"
          placeholder="Email"
          onChange={handleSetBasicDetails}
          value={basicDetails.email}
        />
        <ProfileFormInput
          id="phone"
          name="phone"
          inputType="text"
          label="Phone Number"
          onChange={handleSetBasicDetails}
          value={basicDetails.phone!}
          placeholder="Phone Number"
        />
      </form>
    </div>
  );
}

export default BasicDetails;
