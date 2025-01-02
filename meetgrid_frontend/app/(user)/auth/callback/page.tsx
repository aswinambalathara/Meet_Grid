"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

function GoogleCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setCredentials } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    if (error) {
      router.push(`/auth/login?error=${encodeURIComponent(error)}`);
      return;
    }
    if (!token) {
      router.push("/auth/login");
      return;
    }
    setCredentials("userToken", token);
    router.push("/");
  }, [searchParams, router]);
  return <></>;
}

export default GoogleCallback;
