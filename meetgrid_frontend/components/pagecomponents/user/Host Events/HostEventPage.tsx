"use client";

import { Button } from "@/components/ui/button";
import BasicEventDetails from "@/components/ui/forms/User/CreateEventForms/BasicEventDetails";
import EventLocationDetails from "@/components/ui/forms/User/CreateEventForms/EventLocationDetails";
import React from "react";

function HostEventPage() {
  return (
    <div className="h-screen bg-sky-100 sm:mb-5 sm:mx-16 rounded-lg overflow-auto">
      <div className="header bg-gradient-to-r from-pink-800 flex items-center justify-center to-blue-950 h-28 rounded-b-full">
        <h1 className={`capitalize md:text-4xl text-white font-bold poltawski`}>
          Bring your event to Life: Create, Host, and Connect
        </h1>
      </div>
      <div className="form-content flex flex-col gap-3">
        {/* <BasicEventDetails/> */}
        <EventLocationDetails eventType="online" />
        <div className="flex items-center justify-end gap-2 pe-10 mb-5">
          <Button variant={"outline"}>Previous</Button>
          <Button>Save & Continue</Button>
        </div>
      </div>
    </div>
  );
}

export default HostEventPage;
