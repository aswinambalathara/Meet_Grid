import React from "react";
import '@/styles/user.css'

function BrownButton({
  label,
  onclick,
}: {
  label: string;
  onclick: () => void;
}) {
  return <button className="auth-button py-2 rounded-lg px-2" onClick={onclick}>{label}</button>;
}

export default BrownButton;
