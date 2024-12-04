import React from "react";
import { UserSidebarLinks } from "@/lib/constants";
function page() {
  return (
    <div className="min-h-screen text-white flex items-center justify-center">
      <div className="profile-container bg-slate-300 w-[1350px] h-[600px] rounded-lg">
        <div className="side-bar bg-slate-500 w-64 h-full rounded-l-lg flex flex-col items-center py-5">
          <h3 className="text-xl font-semibold">Profile Settings</h3>
          <hr className="w-full mt-3" />
          <ul className="w-full px-3 py-4 flex flex-col gap-2">
            {UserSidebarLinks.map((linkObj, index) => (
              <li
                className={`bg-slate-600 p-2 rounded-sm hover:bg-slate-400 cursor-pointer transition-all ease-linear duration-200 ${linkObj?.textcolor}`}
                key={index}
              >
                {linkObj.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default page;
