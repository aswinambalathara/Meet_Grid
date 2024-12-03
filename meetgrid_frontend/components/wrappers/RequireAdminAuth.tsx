"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";

function RequireAdminAuth({ children }: { children: React.ReactNode }) {
  const { adminToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!adminToken) {
      router.push("/admin/login");
    }
  }, [adminToken, router]);
  
  return <>{adminToken ? children : null}</>;
}

export default RequireAdminAuth;
