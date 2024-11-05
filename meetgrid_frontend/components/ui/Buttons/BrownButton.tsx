import React from "react";
import '@/styles/user.css'

function BrownButton({
  label,
  onclick,
  type,
  className
}: {
  label: string;
  onclick?: (e:React.FormEvent) => void;
  type: "submit" | "button" | "reset",
  className?:string
}) {
  return <button className={`auth-button py-2 rounded-lg px-2 ${className}`} type={type} onClick={onclick}>{label}</button>;
}

export default BrownButton;
