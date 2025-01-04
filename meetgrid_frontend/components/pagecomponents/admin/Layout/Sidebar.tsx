"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import { AdminSidebarLinks } from "@/lib/constants";
import Link from "next/link";
import { useAuth } from "@/lib/hooks/useAuth";
import { handleAdminLogout } from "@/lib/api/admin/AdminAuthRoutes";
import { useRouter } from "next/navigation";

function Sidebar() {
  const path = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  if (path.includes("/admin/login")) return null;

  const handleLogoutBtn = async () => {
    const confirm = window.confirm("Are you trying to logout?");
    if (confirm) {
      try {
        await handleAdminLogout();
        logout("adminToken");
        router.push("/admin/login");
      } catch (error) {
        if (error instanceof Error) {
          logout("adminToken");
          console.error(error);
        }
      }
    }
  };

  return (
    <aside className=" fixed flex flex-col w-[300px] max-w-[350px] min-h-screen py-2 justify-between px-4 bg-indigo-950 text-white rounded-r-lg">
      <div>
        <div className="logo flex items-center gap-2 mt-3 mb-10 px-3">
          <Image
            src="/images/meetgrid_logo.png"
            alt="logo-image"
            width={30}
            height={30}
          />
          <h2 className="text-white font-bold text-2xl">MEET GRID</h2>
        </div>

        <ul className="w-full flex flex-col gap-4">
          {AdminSidebarLinks.map((linkObj, index) => {
            const isActive = path === linkObj.href;

            return (
              <li
                key={index}
                className={`py-2 px-3 rounded-lg border transition-all ease-linear duration-200 cursor-pointer ${
                  isActive
                    ? "bg-lime-100 text-black font-semibold"
                    : "hover:bg-lime-100 hover:text-black hover:font-semibold"
                }`}
              >
                <Link href={linkObj.href} className="gap-3 flex items-center">
                  <i className={linkObj.icon}></i>
                  {linkObj.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <button
        onClick={handleLogoutBtn}
        className="mb-4 w-full py-2 px-3 rounded-lg border flex items-center hover:font-semibold gap-3 hover:bg-lime-100 hover:text-black transition-all ease-linear duration-200 cursor-pointer"
      >
        <i className="fa-solid fa-right-to-bracket text-red-600"></i>
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;
