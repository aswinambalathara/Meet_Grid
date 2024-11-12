import React from "react";
import "@/styles/user.css";

function BrownButton({
  label,
  onclick,
  type,
  className,
  loading,
}: {
  label: string;
  onclick?: (e: React.FormEvent) => void;
  type: "submit" | "button" | "reset";
  className?: string;
  loading?: boolean;
}) {
  return (
    <button
      className={`auth-button py-2 rounded-lg px-2 ${className}`}
      type={type}
      onClick={onclick}
    >
      {loading ? <div className="spinner inline-block"></div> : label}
    </button>
  );
}

export default BrownButton;
