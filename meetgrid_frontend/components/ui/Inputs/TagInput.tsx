import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  KeyboardEvent,
  useState,
} from "react";
import { Input } from "../input";
import {
  FieldErrors,
  UseFormRegister,
  UseFormResetField,
} from "react-hook-form";
import { ProfileProfessionalFormData } from "@/lib/utility/types";

type TagInputProps = {
  register: UseFormRegister<ProfileProfessionalFormData>;
  errors: FieldErrors<ProfileProfessionalFormData>;
  skills: string[];
  resetField: UseFormResetField<ProfileProfessionalFormData>;
  setSkills: Dispatch<SetStateAction<string[]>>;
};

function TagInput({
  register,
  errors,
  resetField,
  setSkills,
  skills,
}: TagInputProps) {
  const [skill, setSkill] = useState("");

  const handleAddSkill = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSkills((prev) => [...prev, skill.trim()]);
      setSkill("");
      resetField('skill')
      e.preventDefault()
    }
  };

  const handleRemoveSkill = ()

  return (
    <div className="container w-full  bg-white/50 p-3 flex flex-col gap-2 rounded">
      <label>Skills</label>
      <div
        className={`tags-display ${
          !skills.length ? "min-h-40" : ""
        } bg-zinc-300/35 rounded gap-2 text-black p-4 flex flex-wrap items-start overflow-y-auto`}
      >
        {skills.map((skill, idx) => (
          <div
            key={idx}
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm mb-1 capitalize"
          >
            {skill}<i className="fa-regular fa-circle-xmark ms-2 text-red-950" onClick={}></i>
          </div>
        ))}
      </div>

      <div className="tagInputWrapper">
        <label className="text-xs">Add Skills</label>
        <Input
          className="border border-blue-950"
          {...register("skill")}
          onChange={(e) => setSkill(e.target.value)}
          onKeyDown={handleAddSkill}
        />
        <small className="text-red-600">
          {errors.skill ? errors.skill.message : ""}
        </small>
      </div>
    </div>
  );
}

export default TagInput;
