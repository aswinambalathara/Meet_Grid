"use client";

import React, { useEffect, useState } from "react";
import AdminLoginForm from "@/components/ui/forms/adminLoginForm";
import "@/styles/admin.css";
import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter} from "next/navigation";

function AdminLogin() {
  const { adminToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
      if (adminToken) {
          router.push('/admin'); // Redirect logged-in users
      }
  }, [adminToken, router]);

  if (adminToken) return null;

  return (
    <div className="admin-container min-h-screen admin-auth-background flex items-center justify-center">
      <div className="flex flex-col sm:flex-row w-full sm:w-fit items-center min-h-[600px] bg-white/50 rounded-lg">
        <div className="adminlogin-note p-10 text-center">
          <h1 className="text-2xl font-bold text-blue-900">Meet Grid</h1>
          <h3>Admin Login</h3>
        </div>
        <AdminLoginForm />
      </div>
    </div>
  );
}

export default AdminLogin;
