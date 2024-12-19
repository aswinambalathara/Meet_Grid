import { Label } from "@radix-ui/react-label";
import React from "react";

function EventMedia() {
  return (
    <div className="h-full p-16">
      <h1 className="mb-5">Event Media & Additional Options</h1>
      <div className="row flex gap-2 mb-5">
        <div className="form-control flex flex-col gap-2 w-2/4">
          <Label
            htmlFor="logo"
            className="text-sm border border-blue-400 rounded-sm border-dashed py-24 text-center cursor-pointer"
          >
            Upload Logo
          </Label>
          <input
            hidden
            type="file"
            id="logo"
            className="bg-slate-100 h-10 px-3 rounded text-sm"
          />
        </div>
        <div className="form-control flex flex-col gap-2 w-2/4">
          <Label
            htmlFor="event-banner"
            className="text-sm border border-blue-400 rounded-sm border-dashed py-24 text-center cursor-pointer"
          >
            Upload Banner
          </Label>
          <input
            hidden
            type="file"
            id="event-banner"
            placeholder="Upload Banner"
            className="bg-slate-100 h-10 px-3 rounded text-sm"
          />
        </div>
      </div>
      <div className="additionalSettings ">
        <h2 className="mb-5">Additional Settings</h2>

        <div className="flex items-center pe-5 justify-between">
          <div className="form-control flex flex-col mb-5 gap-2 max-w-[200px]">
            <Label htmlFor="registration-deadline" className="text-sm">Registration Deadline</Label>
            <input
              type="datetime-local"
              id="registration-deadline"
              className="bg-slate-100 px-3 h-8 rounded text-sm"
            />
          </div>
          <div className="form-control flex items-center justify-between mb-5 gap-2 ">
            <Label htmlFor="allow-networking" className="text-sm">
              Allow Networking{'(Connecting attendees Each other)'}
            </Label>
            <input
              type="checkbox"
              id="allow-networking"
              className="bg-slate-100 h-4 w-4 rounded text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventMedia;
