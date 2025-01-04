import React, { useState, forwardRef, useImperativeHandle } from "react";

interface ProfileFormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  editIcon?: boolean;
  error?: string;
  mandatory?: boolean;
}

const ProfileFormInput = forwardRef<HTMLInputElement, ProfileFormInputProps>(
  (
    {
      label,
      editIcon = true,
      mandatory = false,
      error,
      disabled = true,
      ...props
    },
    ref
  ) => {
    const [Editable, setEditable] = useState(disabled);

    const handleEditButton = () => {
      setEditable(!Editable);
    };

    return (
      <div className="w-full" {...props}>
        <label htmlFor={props.id} className="text-sm">
          {label} {mandatory && <span className="text-red-600">*</span>}
        </label>
        <div className="input-wrap relative">
          {editIcon && (
            <i
              className={`fa-regular ${
                Editable && "fa-pen-to-square text-blue-900"
              } absolute right-3 top-3 cursor-pointer`}
              onClick={handleEditButton}
            ></i>
          )}
          <input
            className="w-full h-10 bg-white/50 rounded-md px-2 text-sm"
            ref={ref}
            disabled={Editable}
            {...props}
          />
          <small className="ms-2 text-red-600">{error || ""}</small>
        </div>
      </div>
    );
  }
);

export default ProfileFormInput;
