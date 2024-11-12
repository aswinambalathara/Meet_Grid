"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";

interface RequireAuthProps {
  children: ReactNode;
}

function RequireUserAuth({ children }: RequireAuthProps) {
  const { userToken } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (userToken) {
        // Redirect if userToken exists
        router.replace("/");
      } else {
        // Allow the component to render once token is verified to be absent
        setLoading(false);
      }
  }, [userToken, router]);

  if (loading) return null;

  return <>{children}</>;
}

export default RequireUserAuth;
