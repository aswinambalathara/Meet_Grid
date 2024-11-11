import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

function UserManagement() {
  return (
    <div className="w-full container">
      <div className="search-container mb-10 flex flex-col gap-2">
        <Label className="text-white font-medium">Search User</Label>
        <div className="text-white relative flex items-center">
          <Input
            type="text"
            id="search-term"
            placeholder="Search User"
            className="py-5"
          />
          <i className="fa-solid fa-magnifying-glass absolute right-3"></i>
        </div>
      </div>
      <div className="users-container bg-slate-300/50 rounded-lg min-h-10">

      </div>
    </div>
  );
}

export default UserManagement;
