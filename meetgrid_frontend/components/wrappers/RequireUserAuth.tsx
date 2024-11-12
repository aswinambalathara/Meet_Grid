"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { notFound } from "next/navigation";

function withAuth<T extends object>(WrappedComponent: React.ComponentType<T>) {
  return function RequireUserAuth(props: T) {
    const { userToken } = useAuth();
    const [isAuthorised,setAuthorisation] = useState(true)
    useEffect(()=>{
       setAuthorisation(!!userToken)
    },[userToken])
    console.log(isAuthorised)
    if (isAuthorised) return notFound();
    return <WrappedComponent {...props} />;
  };
}

export default withAuth;
