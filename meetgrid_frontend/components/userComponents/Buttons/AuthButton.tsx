import React from "react";
import '@/styles/user.css'

function authButton({
  label,
  onclick,
}: {
  label: string;
  onclick: () => void;
}) {
  return <button className="auth-button py-2 rounded-lg" onClick={onclick}>{label}</button>;
}

export default authButton;
