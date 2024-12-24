"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";
import Loading from "@/components/pagecomponents/user/Layout/Loading";

function RequireUserAuth({ children }: { children: React.ReactNode }) {
  const { userToken } = useAuth();
  const [isChecking, setIsChecking] = useState(true); 
  const router = useRouter();

  useEffect(() => {
    if (typeof userToken === "undefined") {
      const timeout = setTimeout(() => setIsChecking(false), 100);
      return () => clearTimeout(timeout);
    }

    if (!userToken) {
      router.push("/");
    } else {
      setIsChecking(false); 
    }
  }, [userToken, router]);

  if (isChecking) {
    return <Loading />; 
  }

  return <>{children}</>;
}

export default RequireUserAuth;
