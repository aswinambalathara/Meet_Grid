"use client";

import React, { useState } from "react";
import { UserSidebarLinks } from "@/lib/constants";
import BasicDetails from "@/components/pagecomponents/user/Profile/BasicDetails";
import ProfessionalDetails from "@/components/pagecomponents/user/Profile/ProfessionalDetails";
import DeactivateAccount from "@/components/pagecomponents/user/Profile/DeactivateAccount";
import Events from "@/components/pagecomponents/user/Profile/EventsPage";
import ChangePassword from "@/components/pagecomponents/user/Profile/ChangePassword";

function page() {
  const [activeSection, setActiveSection] = useState("basic");

  const renderContent = () => {
    switch (activeSection) {
      case "basic":
        return <BasicDetails />;
      case "professional-details":
        return <ProfessionalDetails />;
      case "events":
        return <Events />;
      case "change-password":
        return <ChangePassword />;
      case 'deactivate-account':
        return <DeactivateAccount/>
    }
  };

  return (
    <div className="min-h-screen text-white flex items-center justify-center">
      <div className="profile-container bg-slate-300 w-[1350px] h-[600px] rounded-lg flex">
        <div className="side-bar bg-slate-500 w-64 h-full rounded-l-lg flex flex-col items-center py-5">
          <h3 className="text-xl font-semibold">Profile Settings</h3>
          <hr className="w-full mt-3" />
          <ul className="w-full px-3 py-4 flex flex-col gap-2">
            {UserSidebarLinks.map((linkObj, index) => (
              <li
                className={`bg-slate-600 p-2 rounded-sm hover:bg-slate-400 cursor-pointer transition-all ease-linear duration-200 ${
                  linkObj.textcolor || ""
                }`}
                key={index}
                onClick={() => setActiveSection(linkObj.href)}
              >
                {linkObj.label}
              </li>
            ))}
          </ul>
        </div>
        <div className="content w-full p-2">{renderContent()}</div>
      </div>
    </div>
  );
}

export default page;
