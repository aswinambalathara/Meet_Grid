"use client";

import React, { useEffect, useState } from "react";
import Logo from "@/components/ui/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";

function Navbar() {
  const path = usePathname();
  const {  userToken, logout, } = useAuth();
  const [isAuthorised, setAuthorisation] = useState(false);

  useEffect(() => {
    setAuthorisation(!!userToken);
  }, [userToken]);
  if (
    path.includes("auth") ||
    path.includes("/auth/signup") ||
    path.includes("/admin")
  ) {
    return null;
  }

  const handleLogOut = () => {
    logout("userToken");
  };
  return (
    <header
      className={`user-nav-container w-full h-28 flex items-center justify-center`}
    >
      <nav className="bg-nav-brown w-[1400px] h-16 rounded-full flex items-center justify-between px-5">
        {/* <h2 className="text-white font-bold text-2xl ms-4">MEET GRID</h2> */}
        <Logo />
        <ul className="nav-left flex text-white gap-6 items-center">
          <li className="bg-[#1B1919] px-4 py-2 rounded-full hover:bg-transparent hover:ring-slate-100 hover:ring-1 cursor-pointer transition-all duration-300">
            Explore Events
          </li>

          {isAuthorised && (
            <li className="bg-[#1B1919] px-4 py-2 rounded-full hover:bg-transparent hover:ring-slate-100 hover:ring-1 cursor-pointer">
              Connections
            </li>
          )}

          <li className="bg-[#1B1919] px-4 py-2 rounded-full hover:bg-transparent hover:ring-slate-100 hover:ring-1 cursor-pointer">
            Host Event
          </li>

          {isAuthorised ? (
            <li
              onClick={handleLogOut}
              className="bg-[#1B1919] px-4 py-2 rounded-full hover:bg-transparent hover:ring-slate-100 hover:ring-1 cursor-pointer"
            >
              <i className="fa-solid fa-user"></i>
            </li>
          ) : (
            <li className="bg-[#1B1919] px-4 py-2 rounded-full hover:bg-transparent hover:ring-slate-100 hover:ring-1 cursor-pointer">
              <Link href="/auth/login">Login/Signup</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
