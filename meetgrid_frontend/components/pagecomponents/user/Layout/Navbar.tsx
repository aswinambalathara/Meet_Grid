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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
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
      }
    }
  };

  return (
    <header className="user-nav-container w-full h-auto md:h-28 flex items-center justify-center">
      <nav className="bg-nav-brown w-full md:w-[1400px] h-auto md:h-16 rounded-none md:rounded-full flex flex-wrap items-center justify-between px-5">
        {/* Logo Section */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link href={"/"}>
            <Logo />
          </Link>

          {/* Hamburger Menu for Small Screens */}
          <button
            className="text-white text-2xl md:hidden focus:outline-none"
            onClick={toggleMenu}
          >
            <i
              className={`fa-solid ${isMenuOpen ? "fa-times" : "fa-bars"}`}
            ></i>
          </button>
        </div>

        {/* Menu Items */}
        <ul
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex md:flex-row text-white gap-6 items-center w-full md:w-auto mt-4 md:mt-0`}
        >
          <Link href={"/events"}>
            <li className="bg-[#1B1919] px-4 py-2 rounded-full hover:bg-transparent hover:ring-slate-100 hover:ring-1 cursor-pointer transition-all duration-300">
              Explore Events
            </li>
          </Link>

          {isAuthorised && (
            <li className="bg-[#1B1919] px-4 py-2 rounded-full hover:bg-transparent hover:ring-slate-100 hover:ring-1 cursor-pointer">
              Connections
            </li>
          )}

          <Link href={"/events/host-event"}>
            <li className="bg-[#1B1919] px-4 py-2 rounded-full hover:bg-transparent hover:ring-slate-100 hover:ring-1 cursor-pointer">
              Host Event
            </li>
          </Link>

          {isAuthorised ? (
            <li
              onClick={toggleDropdown}
              className="bg-[#1B1919] px-4 py-2 rounded-full hover:bg-transparent hover:ring-slate-100 hover:ring-1 cursor-pointer relative"
            >
              <i className="fa-solid fa-user"></i>
              {isDropdownOpen && (
                <ul
                  className="absolute right-0 top-12 mt-2 w-36 bg-blue-50 text-black rounded-lg shadow-lg z-50"
                  onMouseLeave={closeDropdown}
                >
                  <Link href="/profile">
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                      Profile
                    </li>
                  </Link>
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
