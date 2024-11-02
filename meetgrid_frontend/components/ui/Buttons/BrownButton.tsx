import React from "react";
import '@/styles/user.css'

function BrownButton({
  label,
  onclick,
  type
}: {
  label: string;
  onclick?: (e:React.FormEvent) => void;
  type: "submit" | "button" | "reset"
}) {
  return <button className="auth-button py-2 rounded-lg px-2" type={type} onClick={onclick}>{label}</button>;
}

export default BrownButton;
