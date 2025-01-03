"use client";

import React from "react";
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
import { category, EventFormData } from "@/lib/utility/types";

function BasicEventDetails({ categories }: { categories: category[] }) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<EventFormData>();

  return (
    <div className="h-full p-16">
      <h1 className="mb-5">Basic Event Details</h1>
      <div className="form-control flex flex-col mb-5 gap-2">
        <Label htmlFor="event-title">
          Event Title <span className="text-red-600">*</span>
        </Label>
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
        <Label htmlFor="event-description">
          Event Description<span className="text-red-600">*</span>
        </Label>
        <textarea
          {...register("description")}
          id="event-description"
          placeholder="Event description"
          rows={5}
          className="bg-slate-100 rounded text-sm p-2"
        />
        <small className="text-red-600">
          {errors.description ? errors.description.message : ""}
        </small>
      </div>
      <div className="flex w-full items-center gap-2 justify-between row mb-5">
        <div className="form-control flex flex-col gap-2 w-full">
          <Label htmlFor="event-category">
            Event Category<span className="text-red-600">*</span>
          </Label>
          <select
            {...register("category")}
            id="event-category"
            className="bg-slate-100 h-10 rounded text-sm capitalize"
          >
            <option value="" hidden>
              Select Category
            </option>
            {categories.map((category, idx) => (
              <option className="capitalize" value={category._id} key={category._id}>
                {category.categoryName}
              </option>
            ))}
          </select>
          <small className="text-red-600">
            {errors.category ? errors.category.message : ""}
          </small>
        </div>
        <div className="form-control flex flex-col gap-2 w-2/4">
          <Label htmlFor="event-type">
            Event Type<span className="text-red-600">*</span>
          </Label>
          <Controller
            name="eventType"
            control={control}
            defaultValue={"In-Person"}
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
                    <SelectItem value="In-Person">
                      <i className="fa-solid fa-people-group text-green-700 me-2" />
                      In-Person
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
          <Label htmlFor="event-startDate">
            Event Start Date <span className="text-red-600">*</span>
          </Label>
          <input
            {...register("startDate")}
            type="datetime-local"
            min={new Date().toISOString().slice(0, 16)}
            id="event-startDate"
            placeholder="Event Start Date"
            className="bg-slate-100 h-10 px-3 rounded text-sm"
          />
          <small className="text-red-600">
            {errors.startDate ? errors.startDate.message : ""}
          </small>
        </div>
        <div className="form-control flex flex-col gap-2 w-2/4">
          <Label htmlFor="event-endDate">
            Event End Date<span className="text-red-600">*</span>
          </Label>
          <input
            {...register("endDate")}
            type="datetime-local"
            min={new Date().toISOString().slice(0, 16)}
            id="event-endDate"
            placeholder="Event End Date"
            className="bg-slate-100 h-10 px-3 rounded text-sm"
          />
          <small className="text-red-600">
            {errors.endDate ? errors.endDate.message : ""}
          </small>
        </div>
      </div>
    </div>
  );
}

export default BasicEventDetails;
