import React, { useRef, useState } from "react";
import { Input } from "../input";

interface ProfileFormInputProps {
  name: string;
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  inputType: string;
  disabled?: boolean;
  editIcon?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function ProfileFormInput({
  name,
  id,
  label,
  value,
  inputType,
  placeholder,
  disabled = true,
  editIcon = true,
  onChange,
}: ProfileFormInputProps) {
  const [isEditing, setEditing] = useState(!disabled);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEditButton = () => {
    const input = inputRef.current;
    if (input) {
      input.disabled = !input.disabled;
      input.focus();
    }
    setEditing(!isEditing);
  };

  return (
    <div className="w-full">
      <label htmlFor={name} className="text-sm">
        {label}
      </label>
      <div className="input-wrap relative">
        {editIcon && (
          <i
            className={`fa-regular ${
              isEditing
                ? "fa-square-check text-green-700"
                : "fa-pen-to-square text-blue-900"
            } absolute right-3 top-3 cursor-pointer`}
            onClick={handleEditButton}
          ></i>
        )}
        <input
          className="w-full h-10 bg-white/50 rounded-md px-2 text-sm"
          type={inputType}
          placeholder={placeholder}
          id={id}
          name={name}
          value={value}
          ref={inputRef}
          disabled={disabled}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default ProfileFormInput;
