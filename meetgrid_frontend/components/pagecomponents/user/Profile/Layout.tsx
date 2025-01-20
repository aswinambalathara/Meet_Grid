"use client";

import React, { Suspense, useEffect, useState } from "react";
import { UserSidebarLinks } from "@/lib/constants";
const BasicDetails = React.lazy(
  () => import("@/components/pagecomponents/user/Profile/BasicDetails")
);
const ProfessionalDetails = React.lazy(
  () => import("@/components/pagecomponents/user/Profile/ProfessionalDetails")
);
const DeactivateAccount = React.lazy(
  () => import("@/components/pagecomponents/user/Profile/DeactivateAccount")
);
const Events = React.lazy(
  () => import("@/components/pagecomponents/user/Profile/TicketsPage")
);
const YourEvents = React.lazy(
  () => import("@/components/pagecomponents/user/Profile/YourEvents")
);
const ChangePassword = React.lazy(
  () => import("@/components/pagecomponents/user/Profile/ChangePassword")
);
import { getUserProfile } from "@/lib/api/user/AuthorisedRoutes";
import IUser from "@/interfaces/IUser";
import { Toaster } from "react-hot-toast";
import Loading from "../Layout/Loading";
import { useSearchParams } from "next/navigation";
import { TooltipProvider } from "@/components/ui/tooltip";

function Profile() {
  const path = useSearchParams();

  const [activeSection, setActiveSection] = useState("basic");
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<IUser>({ email: "" });

  useEffect(() => {
    const events = path.get("events");
    if (events) {
      setActiveSection("events");
    }
    async function fetchUserProfile() {
      try {
        const data = await getUserProfile();
        setUserData(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchUserProfile();
  }, []);
  const renderContent = () => {
    switch (activeSection) {
      case "basic":
        return (
          <Suspense fallback={<Loading />}>
            <BasicDetails data={userData} setUserData={setUserData} />
          </Suspense>
        );
      case "professional-details":
        return (
          <Suspense fallback={<Loading />}>
            <ProfessionalDetails
              userData={userData}
              setUserData={setUserData}
            />
          </Suspense>
        );
      case "events":
        return (
          <Suspense fallback={<Loading />}>
            <Events />
          </Suspense>
        );
      case "your-events":
        return (
          <Suspense fallback={<Loading />}>
            <YourEvents />
          </Suspense>
        );
      case "change-password":
        return (
          <Suspense fallback={<Loading />}>
            <ChangePassword userData={userData} />
          </Suspense>
        );
      case "deactivate-account":
        const confirm = window.confirm("Are you trying to Deactivate Account?");
        if (!confirm) {
          setActiveSection("basic");
        }
        return (
          <Suspense fallback={<Loading />}>
            <DeactivateAccount userData={userData} />
          </Suspense>
        );
        break;
    }
  };

  return (
    <div className="min-h-screen text-white flex items-center justify-center">
      <Toaster />
      <TooltipProvider>
      <div className="profile-container bg-slate-300 w-[1350px] h-[600px] rounded-lg flex">
        <div className="side-bar bg-slate-500 w-64 h-full rounded-l-lg flex flex-col items-center py-5">
          <h3 className="text-xl font-semibold">Profile Settings</h3>
          <hr className="w-full mt-3" />
          <ul className="w-full px-3 py-4 flex flex-col gap-2">
            {UserSidebarLinks.map((linkObj, index) => (
              <li
                className={` p-2 ${
                  linkObj.href === activeSection
                    ? "bg-slate-400 text-sm text-slate-900 font-medium"
                    : "bg-slate-600"
                } ${
                  linkObj.href === "deactivate-account" && "text-red-500"
                } rounded-sm hover:bg-slate-400 cursor-pointer transition-all ease-linear duration-200`}
                key={index}
                onClick={() => setActiveSection(linkObj.href)}
              >
                {linkObj.label}
              </li>
            ))}
          </ul>
        </div>
        <div className="content w-full p-2">{!loading && renderContent()}</div>
      </div>
      </TooltipProvider>
    </div>
  );
}

export default Profile;
