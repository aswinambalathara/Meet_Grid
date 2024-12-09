import React from "react";
import { Input } from "../../input";
import { Label } from "../../label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function BasicEventDetails() {
  return (
    <div className="h-full p-16">
      <h1 className="mb-5">Basic Event Details</h1>
      <div className="form-control flex flex-col mb-5 gap-2">
        <Label htmlFor="event-title">Event Title</Label>
        <Input
          type="text"
          id="event-title"
          placeholder="Event title"
          className="bg-slate-100 h-10"
        />
      </div>
      <div className="form-control flex flex-col mb-5 gap-2">
        <Label htmlFor="event-description">Event Description</Label>
        <Input
          type="text"
          id="event-description"
          placeholder="Event description"
          className="bg-slate-100 h-10"
        />
      </div>
      <div className="flex w-full items-center gap-2 justify-between row mb-5">
        <div className="form-control flex flex-col gap-2 w-full">
          <Label htmlFor="event-category">Event Category</Label>
          <Input
            type="text"
            id="event-category"
            placeholder="Event category"
            className="bg-slate-100 h-10"
          />
        </div>
        <div className="form-control flex flex-col gap-2 w-2/4">
          <Label htmlFor="event-type">Event Type</Label>
          <Select>
            <SelectTrigger className="bg-slate-100">
              <SelectValue placeholder="Select Event Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="cursor-pointer" value="Offline">
                <i className="fa-solid fa-people-group text-green-700 me-2" />
                Offline
              </SelectItem>
              <SelectItem className="cursor-pointer" value="Online">
                <i className="fa-solid fa-globe me-2 text-blue-700" />
                Online
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="row flex gap-2">
        <div className="form-control flex flex-col gap-2 w-2/4">
          <Label htmlFor="event-date">Event Date</Label>
          <input
            type="date"
            id="event-date"
            placeholder="Event Date"
            className="bg-slate-100 h-10 px-3 rounded text-sm"
          />
        </div>
        <div className="form-control flex flex-col gap-2 w-2/4">
          <Label htmlFor="event-time">Event Time</Label>
          <input
            type="time"
            id="event-time"
            placeholder="Event Time"
            className="bg-slate-100 h-10 px-3 rounded text-sm"
          />
        </div>
      </div>
    </div>
  );
}

export default BasicEventDetails;
