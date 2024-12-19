import React, { useState, forwardRef, useImperativeHandle } from "react";

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

const ProfileFormInput = forwardRef<HTMLInputElement, ProfileFormInputProps>(
  (
    {
      name,
      id,
      label,
      value,
      inputType,
      placeholder,
      disabled = true,
      editIcon = true,
      onChange,
    },
    ref
  ) => {
    const [isEditing, setEditing] = useState(!disabled);

    const handleEditButton = () => {
      setEditing(!isEditing); // Toggle the editing state
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
                !isEditing && "fa-pen-to-square text-blue-900"
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
            ref={ref}
            disabled={!isEditing} // Control disabled state with React state
            onChange={onChange}
          />
        </div>
      </div>
    );
  }
);

export default ProfileFormInput;
