"use client";
import { usePathname } from "next/navigation";
import React from "react";

function sidebar() {
  const path = usePathname();
  if (path.includes("/admin/login")) return null;

  return <aside className="">
    <ul>
        <li>Dashboard</li>
    </ul>
  </aside>
}

export default sidebar;
