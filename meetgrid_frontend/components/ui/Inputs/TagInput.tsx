import React, {
  Dispatch,
  SetStateAction,
  KeyboardEvent,
  useState,
} from "react";
import { Input } from "../input";
import { ProfileProfessionalFormData } from "@/lib/utility/types";

type TagInputProps = {
  skills: string[];
  setSkills: Dispatch<SetStateAction<string[]>>;
};

function TagInput({ setSkills, skills }: TagInputProps) {
  const [skill, setSkill] = useState("");
  const [skillError, setError] = useState("");
  const handleAddSkill = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!/^[a-zA-Z\s]+$/.test(skill)) {
        setError("Only Text Allowed");
        return;
      }

      if (skill.length > 20) {
        setError("Skill cannot be longer than 20 characters");
        return;
      }

      setSkills((prev) => [...prev, skill.trim()]);
      setError("");
      setSkill("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    if (skill) {
      const filtered = skills.filter((skl) => skl !== skill);
      console.log(filtered);
      setSkills(filtered);
    }
  };

 // console.log(skills)

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
            className=" text-black border border-black shadow-sm shadow-black px-3 py-1 rounded text-sm mb-1 capitalize"
          >
            {skill}
            <i
              className="fa-regular fa-circle-xmark ms-2 text-red-600 cursor-pointer"
              onClick={() => handleRemoveSkill(skill)}
            ></i>
          </div>
        ))}
      </div>
      <small className="text-xs text-zinc-500">
        Add skill by pressing 'Enter'
      </small>

      <div className="tagInputWrapper">
        <label className="text-xs">Add Skills</label>
        <Input
          className="border border-blue-950"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          onKeyDown={handleAddSkill}
        />
        <small className="text-red-600">{skillError}</small>
      </div>
    </div>
  );
}

export default TagInput;
