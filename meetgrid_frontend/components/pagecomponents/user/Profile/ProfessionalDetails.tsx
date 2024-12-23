"use client";
import { Button } from "@/components/ui/button";
import ProfileFormInput from "@/components/ui/Inputs/ProfileFormInput";
import TagInput from "@/components/ui/Inputs/TagInput";
import IUser from "@/interfaces/IUser";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { professionalDetailsSchema } from "@/lib/utility/schemas";
import { ProfileProfessionalFormData } from "@/lib/utility/types";
import toast from "react-hot-toast";
import { updateProfessionalDetails } from "@/lib/api/user/AuthorisedRoutes";

function ProfessionalDetails({
  userData,
  setUserData,
}: {
  userData: IUser;
  setUserData: Dispatch<SetStateAction<IUser>>;
}) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileProfessionalFormData>({
    resolver: zodResolver(professionalDetailsSchema),
    defaultValues: {
      companyName: userData.professionalInfo?.companyName || "",
      jobTitle: userData.professionalInfo?.jobTitle || "",
      linkedinUrl: userData.professionalInfo?.linkedinUrl || "",
      experience: userData.professionalInfo?.experience || 0,
      skills: userData.professionalInfo?.skills! || "",
    },
    mode: "onChange",
    reValidateMode: "onSubmit",
  });
  const [skills, setSkills] = useState<string[]>(
    userData.professionalInfo?.skills! || []
  );

  useEffect(() => {
    //reset(userData.professionalInfo)
    //setSkills(userData.professionalInfo?.skills!)
  }, []);

  const handleInputChange = () => {};
  const handleOnSubmit = async (formData: ProfileProfessionalFormData) => {
    if (skills) {
      formData.skills = skills;
    }
    try {
      const result = await updateProfessionalDetails(formData);
      setUserData((prev) => ({
        ...prev,
        professionalInfo: result.data,
      }));
      toast.success(result.message);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="container overflow-y-auto h-full p-10 text-black flex flex-col">
      <form
        className="form-section flex flex-col gap-3"
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <ProfileFormInput
          label="Company name"
          id="companyName"
          {...register("companyName")}
          type="text"
          disabled={false}
          mandatory
          placeholder="Company name"
          error={errors.companyName ? errors.companyName.message : ""}
        />
        <ProfileFormInput
          type="text"
          label="Job Title"
          id="jobTitle"
          mandatory
          {...register("jobTitle")}
          disabled={false}
          error={errors.jobTitle ? errors.jobTitle.message : ""}
          placeholder="Job Title"
        />
        <ProfileFormInput
          type="number"
          label="Experience"
          mandatory
          id="experience"
          {...register("experience")}
          disabled={false}
          min={0}
          error={errors.experience ? errors.experience.message : ""}
          placeholder="Years of Experience"
        />
        <ProfileFormInput
          id="linkedinUrl"
          {...register("linkedinUrl")}
          type="text"
          label="Linkedin URL"
          disabled={false}
          error={errors.linkedinUrl ? errors.linkedinUrl.message : ""}
          placeholder="Linkedin URL"
        />
        <TagInput setSkills={setSkills} skills={skills || []} />
        <div className="flex items-center justify-center mt-3">
          <Button
            size={"lg"}
            className="bg-violet-700 text-white"
            type="submit"
          >
            Update Professional Details
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ProfessionalDetails;
