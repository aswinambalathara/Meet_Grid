"use client";

import React, { useEffect } from "react";
import { Label } from "../../../label";
import { Input } from "../../../input";
import IEvent from "@/interfaces/IEvent";
import moment from "moment-timezone";
import Map from "@/components/pagecomponents/user/HostEvents/Map";
import { Controller, FieldErrors, useFormContext } from "react-hook-form";
import { EventFormData } from "@/lib/utility/types";
import { Textarea } from "@/components/ui/textarea";

type EventLocationDetailsProps = {
  eventType: IEvent["eventType"];
};

function EventLocationDetails({ eventType }: EventLocationDetailsProps) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<EventFormData>();

  useEffect(()=>{},[])

  const timeZones = moment.tz.names();
  const offlineErrors:FieldErrors<Extract<EventFormData,{ eventType: "In-Person" }>> = errors
  const onlineErrors:FieldErrors<Extract<EventFormData,{ eventType: "Online" }>> = errors

  if (eventType === "Online") {
    return (
      <div className="h-full p-16">
        <h1 className="mb-5">Location & Venue Details</h1>
        <div className="form-control flex flex-col mb-5 gap-2">
          <Label htmlFor="virtual-platform">
            Virtual Meet Platform <span className="text-red-600">*</span>
          </Label>
          <Input
            {...register("virtualDetails.virtualPlatform")}
            type="text"
            id="virtual-platform"
            placeholder="Virtual Meet Platform"
            className="bg-slate-100 h-10"
          />
          <small className="text-red-600">
            {onlineErrors.virtualDetails?.virtualPlatform ? onlineErrors.virtualDetails.virtualPlatform.message : ""}
          </small>
        </div>
        <div className="form-control flex flex-col mb-5 gap-2">
          <Label htmlFor="virtual-link">
            Virtual Meet Link <span className="text-red-600">*</span>
          </Label>
          <Input
            {...register("virtualDetails.meetLink")}
            type="text"
            id="virtual-link"
            placeholder="Virtual Meet Link"
            className="bg-slate-100 h-10"
          />
          <small className="text-red-600">
            {onlineErrors.virtualDetails?.meetLink ? onlineErrors.virtualDetails.meetLink.message : ""}
          </small>
        </div>
        <div className="form-control flex flex-col mb-5 gap-2">
          <Label htmlFor="time-zone">
            Time Zone <span className="text-red-600">*</span>
          </Label>
          <select
            className="h-10 cursor-pointer bg-slate-100 text-sm text-gray-500 rounded shadow-sm"
            {...register("virtualDetails.timeZone")}
            id="timezone"
            defaultValue={""}
          >
            <option value="" disabled>
              Select Time zone
            </option>
            {timeZones.map((timeZone, index) => (
              <option
                className="text-black cursor-pointer"
                value={timeZone}
                key={index}
              >
                {timeZone}
              </option>
            ))}
          </select>
          <small className="text-red-600">
            {onlineErrors.virtualDetails?.timeZone ? onlineErrors.virtualDetails.timeZone.message : ""}
          </small>
        </div>
        <div className="form-control flex flex-col mb-5 gap-2">
          <Label htmlFor="access-instructions">Access Instructions</Label>

          <Controller
            name="virtualDetails.accessInstructions"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                id="access instructions"
                placeholder="Enter access instructions"
                className="bg-slate-100 h-10"
              />
            )}
          />
          <small className="text-red-600">
            {onlineErrors.virtualDetails?.accessInstructions ? onlineErrors.virtualDetails.accessInstructions.message : ""}
          </small>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full p-16">
      <h1 className="mb-5">Location & Venue Details</h1>
      <div className="form-control flex flex-col mb-5 gap-2">
        <Label htmlFor="venue-name">
          Venue Name <span className="text-red-600">*</span>
        </Label>
        <Input
          {...register("location.venueName")}
          type="text"
          id="venue-name"
          placeholder="Venue Name"
          className="bg-slate-100 h-10"
        />
        <small className="text-red-600">
          {offlineErrors.location?.venueName ? offlineErrors.location?.venueName.message : ""}
        </small>
      </div>
      <div className="form-control flex flex-col mb-5 gap-2">
        <Label htmlFor="street-address">
          Street Address <span className="text-red-600">*</span>
        </Label>
        <Input
          {...register("location.streetAddress")}
          type="text"
          id="street-address"
          placeholder="Street Address"
          className="bg-slate-100 h-10"
        />
        <small className="text-red-600">
          {offlineErrors.location?.streetAddress
            ? offlineErrors.location?.streetAddress.message
            : ""}
        </small>
      </div>
      <div className="flex w-full items-center gap-2 justify-between row mb-5">
        <div className="form-control flex flex-col gap-2 w-full">
          <Label htmlFor="country">
            Country <span className="text-red-600">*</span>
          </Label>
          <Input
            {...register("location.country")}
            type="text"
            id="country"
            placeholder="Country"
            className="bg-slate-100 h-10"
          />
          <small className="text-red-600">
            {offlineErrors.location?.country ? offlineErrors.location?.country.message : ""}
          </small>
        </div>
        <div className="form-control flex flex-col gap-2 w-full">
          <Label htmlFor="state">
            State/Province/Region <span className="text-red-600">*</span>
          </Label>
          <Input
            {...register("location.state")}
            type="text"
            id="state"
            placeholder="State/Province/Region"
            className="bg-slate-100 h-10"
          />
          <small className="text-red-600">
            {offlineErrors.location?.state ? offlineErrors.location?.state.message : ""}
          </small>
        </div>
      </div>
      <div className="row flex gap-2 mb-5">
        <div className="form-control flex flex-col gap-2 w-full">
          <Label htmlFor="city">
            City <span className="text-red-600">*</span>
          </Label>
          <Input
            {...register("location.city")}
            type="text"
            id="city"
            placeholder="City"
            className="bg-slate-100 h-10"
          />
          <small className="text-red-600">
            {offlineErrors.location?.city ? offlineErrors.location?.city.message : ""}
          </small>
        </div>

        <div className="form-control flex flex-col gap-2 w-full">
          <Label htmlFor="pincode">
            Postal / Zipcode <span className="text-red-600">*</span>
          </Label>
          <Input
            {...register("location.pincode")}
            type="text"
            id="pincode"
            placeholder="Postal / Zipcode"
            className="bg-slate-100 h-10"
          />
          <small className="text-red-600">
            {offlineErrors.location?.pincode ? offlineErrors.location?.pincode.message : ""}
          </small>
        </div>
      </div>

      <div className="location-section flex flex-col w-full">
        <Map errors={offlineErrors}/>
      </div>
    </div>
  );

}

export default EventLocationDetails;
