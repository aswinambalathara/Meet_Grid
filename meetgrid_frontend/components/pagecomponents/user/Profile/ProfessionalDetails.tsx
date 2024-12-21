"use client";
import { Button } from "@/components/ui/button";
import ProfileFormInput from "@/components/ui/Inputs/ProfileFormInput";
import TagInput from "@/components/ui/Inputs/TagInput";
import IUser from "@/interfaces/IUser";
import React, { FormEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { professionalDetailsSchema } from "@/lib/utility/schemas";
import { ProfileProfessionalFormData } from "@/lib/utility/types";

function ProfessionalDetails({ userData }: { userData: IUser }) {
  const {
    register,
    reset,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<ProfileProfessionalFormData>({
    resolver: zodResolver(professionalDetailsSchema),
    defaultValues: {
      companyName: "",
      jobTitle: "",
      linkedinUrl: "",
      skill: "",
    },
    mode: "onChange",
    reValidateMode: "onSubmit",
  });
  const [skills, setSkills] = useState<string[]>([]);

  useEffect(() => {
    //reset(userData.professionalInfo)
    //setSkills(userData.professionalInfo?.skills!)
  }, []);

  const handleInputChange = () => {};
  const handleOnSubmit = (formData: ProfileProfessionalFormData) => {};

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
          placeholder="Company name"
          error={errors.companyName ? errors.companyName.message : ""}
        />
        <ProfileFormInput
          type="text"
          label="Job Title"
          id="jobTitle"
          {...register("jobTitle")}
          disabled={false}
          error={errors.jobTitle ? errors.jobTitle.message : ""}
          placeholder="Job Title"
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
        <TagInput
          errors={errors}
          register={register}
          setSkills={setSkills}
          skills={skills || []}
          resetField={resetField}
        />
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
