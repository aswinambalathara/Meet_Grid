import React from "react";
import { Label } from "../../../label";
import { Input } from "../../../input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../select";
import IEvent from "@/interfaces/IEvent";

type EventLocationDetailsProps = {
  eventType: IEvent['eventType'];
};
function EventLocationDetails({ eventType }: EventLocationDetailsProps) {
  if (eventType === 'Online') {
    return (
      <div className="h-full p-16">
        <h1 className="mb-5">Location & Venue Details</h1>
        <div className="form-control flex flex-col mb-5 gap-2">
          <Label htmlFor="virtual-platform">Virtual Meet Platform</Label>
          <Input
            type="text"
            id="virtual-platform"
            placeholder="Virtual Meet Platform"
            className="bg-slate-100 h-10"
          />
        </div>
        <div className="form-control flex flex-col mb-5 gap-2">
          <Label htmlFor="virtual-link">Virtual Meet Link</Label>
          <Input
            type="text"
            id="virtual-link"
            placeholder="Virtual Meet Link"
            className="bg-slate-100 h-10"
          />
        </div>
        <div className="form-control flex flex-col mb-5 gap-2">
          <Label htmlFor="time-zonge">Time Zone</Label>
          <Input
            type="text"
            id="time-zonge"
            placeholder="Time Zone"
            className="bg-slate-100 h-10"
          />
        </div>
        <div className="form-control flex flex-col mb-5 gap-2">
          <Label htmlFor="access-instructions">Access Instructions</Label>
          <Input
            type="text"
            id="access-instructions"
            placeholder="Access Instructions"
            className="bg-slate-100 h-10"
          />
        </div>
      </div>
    );
  }
  return (
    <div className="h-full p-16">
      <h1 className="mb-5">Location & Venue Details</h1>
      <div className="form-control flex flex-col mb-5 gap-2">
        <Label htmlFor="venue-name">Venue Name</Label>
        <Input
          type="text"
          id="venue-name"
          placeholder="Venue Name"
          className="bg-slate-100 h-10"
        />
      </div>
      <div className="form-control flex flex-col mb-5 gap-2">
        <Label htmlFor="street-address">Street Address</Label>
        <Input
          type="text"
          id="street-address"
          placeholder="Street Address"
          className="bg-slate-100 h-10"
        />
      </div>
      <div className="flex w-full items-center gap-2 justify-between row mb-5">
        <div className="form-control flex flex-col gap-2 w-full">
          <Label htmlFor="city">City</Label>
          <Input
            type="text"
            id="city"
            placeholder="City"
            className="bg-slate-100 h-10"
          />
        </div>
        <div className="form-control flex flex-col gap-2 w-full">
          <Label htmlFor="state">State/Province/Region</Label>
          <Input
            type="text"
            id="state"
            placeholder="State/Province/Region"
            className="bg-slate-100 h-10"
          />
        </div>
      </div>
      <div className="row flex gap-2 mb-5">
        <div className="form-control flex flex-col gap-2 w-full">
          <Label htmlFor="country">Country</Label>
          <Input
            type="text"
            id="country"
            placeholder="Country"
            className="bg-slate-100 h-10"
          />
        </div>
        <div className="form-control flex flex-col gap-2 w-full">
          <Label htmlFor="pincode">Postal / Zipcode</Label>
          <Input
            type="text"
            id="pincode"
            placeholder="Postal / Zipcode"
            className="bg-slate-100 h-10"
          />
        </div>
      </div>

      <div className="location-section flex flex-col w-full">
        <div className="form-control flex flex-col gap-2 w-full mb-5">
          <Label htmlFor="location">Location</Label>
          <Input
            type="text"
            id="location"
            placeholder="Location"
            className="bg-slate-100 h-10"
          />
        </div>

        <div className="text-white text-center rounded map-section h-96 w-full min-h-54 bg-green-800">
          Map comes here
        </div>
      </div>
    </div>
  );
}

export default EventLocationDetails;
