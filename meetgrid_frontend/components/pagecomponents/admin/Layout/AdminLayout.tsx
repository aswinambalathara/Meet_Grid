"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import React, { ReactNode, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { usePathname } from "next/navigation";

function AdminLayout({ children }: { children: ReactNode }) {
  const path = usePathname();
  const { adminToken } = useAuth();
  return (
    <div className="bg-indigo-200 min-h-screen w-full">
      {/* Sidebar is rendered regardless of token */}
      <Sidebar />
      <main
        className={`min-h-screen ${
          adminToken || !path.includes("/admin/login") ? "ml-[300px] p-10" : "ml-0 p-0"
        }`}
      >
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;
