"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";

function RequireUserAuth({ children }: { children: React.ReactNode }) {
  const { userToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!userToken) {
      router.push("/");
    }
  }, [userToken, router]);

  return <>{userToken ? children : null}</>;
}

export default RequireUserAuth;
