"use client";
import React, { useEffect, useState } from "react";
import ResetPassword from "@/components/pagecomponents/user/Auth/ResetPassword";
import { useSearchParams, useRouter, notFound } from "next/navigation";
import toast from "react-hot-toast";
import { validateResetToken } from "@/lib/api/user/AuthRoutes";
import { useAuth } from "@/lib/hooks/useAuth";
//import BrownButton from "../ui/Buttons/BrownButton";
//import Link from "next/link";

function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const { resetUserEmail } = useAuth();
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      try {
        await validateResetToken(token!);
        setIsTokenValid(true);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      validateToken();
    } else {
      router.push("/error");
    }
  }, [token, router, resetUserEmail]);

  if (loading)
    return (
      <>
        <div className="w-full min-h-screen flex items-center justify-center text-white">
          <div className="spinner" style={{ width: 24, height: 24 }}></div>
        </div>
      </>
    );

  return isTokenValid ? (
    <ResetPassword />
  ) : notFound()
  
//   (
//     <>
//       <div className="w-full min-h-screen flex flex-col gap-3 items-center justify-center text-white">
//         <h1 className="text-2xl">Try Again!!</h1>
//         <h3>Invalid or Expired Token</h3>
//         <Link href={"/"}>
//           <BrownButton type="button" className="border" label="Back to home" />
//         </Link>
//       </div>
//     </>
//   );
}

export default ResetPasswordPage;
