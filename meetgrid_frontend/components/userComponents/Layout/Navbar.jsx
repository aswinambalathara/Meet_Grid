"use client";

import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Logo from "@/components/ui/Logo";
function Navbar() {
  const path = usePathname()
  const [isLoggedIn, setLogState] = useState(false);
if(path.includes('/login') || path.includes('/login')){
  return null
}
  return (
    <header className="user-nav-container w-full h-28 flex items-center justify-center">
      <nav className="bg-nav-brown w-[1400px] h-16 rounded-full flex items-center justify-between px-5">
        {/* <h2 className="text-white font-bold text-2xl ms-4">MEET GRID</h2> */}
        <Logo/>
        <ul className="nav-left flex text-white gap-6 items-center">
          <li className="bg-[#1B1919] px-4 py-2 rounded-full hover:bg-transparent hover:ring-slate-100 hover:ring-1 cursor-pointer transition-all duration-300">
            Explore Events
          </li>
          {isLoggedIn && (
            <li className="bg-[#1B1919] px-4 py-2 rounded-full hover:bg-transparent hover:ring-slate-100 hover:ring-1 cursor-pointer">
              Connections
            </li>
          )}
          <li className="bg-[#1B1919] px-4 py-2 rounded-full hover:bg-transparent hover:ring-slate-100 hover:ring-1 cursor-pointer">
            Host Event
          </li>

          {isLoggedIn ? (
            <li className="bg-[#1B1919] px-4 py-2 rounded-full hover:bg-transparent hover:ring-slate-100 hover:ring-1 cursor-pointer">
              Aswin
            </li>
          ) : (
            <li className="bg-[#1B1919] px-4 py-2 rounded-full hover:bg-transparent hover:ring-slate-100 hover:ring-1 cursor-pointer">
              Login/Signup
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
