"use client";

import React from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { notFound } from "next/navigation";

function withAuth<T extends object>(WrappedComponent: React.ComponentType<T>) {
  return function RequireUserAuth(props: T) {
    const { adminToken } = useAuth();

    if (adminToken) return notFound();
    return <WrappedComponent {...props} />;
  };
}

export default withAuth;
