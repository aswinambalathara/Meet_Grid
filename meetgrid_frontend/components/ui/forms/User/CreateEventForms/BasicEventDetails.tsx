"use client";

import React, { useState } from "react";
import { Input } from "../../../input";
import { Label } from "../../../label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, useFormContext } from "react-hook-form";
import { EventBasicDetailForm } from "@/lib/utility/types";

function BasicEventDetails() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<EventBasicDetailForm>();

  console.log(errors);
  return (
    <div className="h-full p-16">
      <h1 className="mb-5">Basic Event Details</h1>
      <div className="form-control flex flex-col mb-5 gap-2">
        <Label htmlFor="event-title">Event Title</Label>
        <Input
          {...register("title")}
          type="text"
          id="event-title"
          placeholder="Event title"
          className="bg-slate-100 h-10"
        />
        <small className="text-red-600">
          {errors.title ? errors.title.message : ""}
        </small>
      </div>
      <div className="form-control flex flex-col mb-5 gap-2">
        <Label htmlFor="event-description">Event Description</Label>
        <Input
          type="text"
          {...register("description")}
          id="event-description"
          placeholder="Event description"
          className="bg-slate-100 h-10"
        />
        <small className="text-red-600">
          {errors.description ? errors.description.message : ""}
        </small>
      </div>
      <div className="flex w-full items-center gap-2 justify-between row mb-5">
        <div className="form-control flex flex-col gap-2 w-full">
          <Label htmlFor="event-category">Event Category</Label>
          <Input
            {...register("category")}
            type="text"
            id="event-category"
            placeholder="Event category"
            className="bg-slate-100 h-10"
          />
          <small className="text-red-600">
            {errors.category ? errors.category.message : ""}
          </small>
        </div>
        <div className="form-control flex flex-col gap-2 w-2/4">
          <Label htmlFor="event-type">Event Type</Label>
          <Controller
            name="eventType"
            control={control}
            defaultValue={undefined}
            rules={{ required: "Event type is required" }}
            render={({ field, fieldState: { error } }) => (
              <>
                <Select
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)} // Map onValueChange to field.onChange
                >
                  <SelectTrigger className="bg-slate-100 h-10">
                    <SelectValue placeholder="Select Event Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Offline">
                      <i className="fa-solid fa-people-group text-green-700 me-2" />
                      Offline
                    </SelectItem>
                    <SelectItem value="Online">
                      <i className="fa-solid fa-globe me-2 text-blue-700" />
                      Online
                    </SelectItem>
                  </SelectContent>
                </Select>
                <small className="text-red-600">
                  {error ? error.message : ""}
                </small>
              </>
            )}
          />
        </div>
      </div>
      <div className="row flex gap-2 mb-5">
        <div className="form-control flex flex-col gap-2 w-2/4">
          <Label htmlFor="event-startDate">Event Start Date </Label>
          <input
            {...register("startDate")}
            type="date"
            min={new Date().toISOString().split("T")[0]}
            id="event-startDate"
            placeholder="Event Start Date"
            className="bg-slate-100 h-10 px-3 rounded text-sm"
          />
          <small className="text-red-600">
            {errors.startDate ? errors.startDate.message : ""}
          </small>
        </div>
        <div className="form-control flex flex-col gap-2 w-2/4">
          <Label htmlFor="event-endDate">Event End Date</Label>
          <input
            {...register("endDate")}
            type="date"
            min={new Date().toISOString().split("T")[0]}
            id="event-endDate"
            placeholder="Event End Date"
            className="bg-slate-100 h-10 px-3 rounded text-sm"
          />
          <small className="text-red-600">
            {errors.endDate ? errors.endDate.message : ""}
          </small>
        </div>
      </div>
      <div className="row flex gap-2">
        <div className="form-control flex flex-col gap-2 w-2/4">
          <Label htmlFor="event-startTime">Event Start Time</Label>
          <input
            {...register("startTime")}
            type="time"
            id="event-startTime"
            placeholder="Event Start Time"
            className="bg-slate-100 h-10 px-3 rounded text-sm"
          />
          <small className="text-red-600">
            {errors.startTime ? errors.startTime.message : ""}
          </small>
        </div>
        <div className="form-control flex flex-col gap-2 w-2/4">
          <Label htmlFor="event-endTime">Event End Time</Label>
          <input
            {...register("endTime")}
            type="time"
            id="event-endTime"
            placeholder="Event End Time"
            className="bg-slate-100 h-10 px-3 rounded text-sm"
          />
          <small className="text-red-600">
            {errors.endTime ? errors.endTime.message : ""}
          </small>
        </div>
      </div>
    </div>
  );
}

export default BasicEventDetails;
