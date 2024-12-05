"use client";

import React, { useEffect, useState } from "react";
import Logo from "@/components/ui/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { userLogout } from "@/lib/api/user/AuthRoutes";
import toast from "react-hot-toast";

function Navbar() {
  const path = usePathname();
  const { userToken, logout } = useAuth();
  const [isAuthorised, setAuthorisation] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleLogOut = async () => {
    try {
      await userLogout();
      logout("userToken");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        //console.error(error);
      }
    }
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
              onClick={toggleDropdown}
              className="bg-[#1B1919] px-4 py-2 rounded-full hover:bg-transparent hover:ring-slate-100 hover:ring-1 cursor-pointer"
            >
              <i className="fa-solid fa-user"></i>
              {isDropdownOpen && (
                <ul
                  className="absolute right-10 top-20 mt-2 w-36 bg-blue-50 text-black rounded-lg shadow-lg z-50"
                  onMouseLeave={closeDropdown} // Close dropdown on mouse leave (optional)
                >
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                    <Link href="/profile">Profile</Link>
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    onClick={handleLogOut}
                  >
                    Logout
                  </li>
                </ul>
              )}
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
