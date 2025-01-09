import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AttendeeSchema } from "@/lib/utility/schemas";
import { AttendeeFormData } from "@/lib/utility/types";
import { RootState } from "@/redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

type props = {
  attendeeIndex: number;
  onSubmit: (index: number, data: AttendeeFormData) => void;
  quantity: number;
};

function AttendeeForm({ attendeeIndex, quantity, onSubmit }: props) {
  const { attendees = [] } = useSelector((state: RootState) => state.checkout);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<AttendeeFormData>({
    resolver: zodResolver(AttendeeSchema),
    defaultValues: {
      fullName: attendees[attendeeIndex].fullName,
      designation: attendees[attendeeIndex].designation,
      email: attendees[attendeeIndex].email,
      linkedinUrl: attendees[attendeeIndex].linkedinUrl,
      organisation: attendees[attendeeIndex].organisation,
      phone: attendees[attendeeIndex].phone,
    },
    mode: "all",
  });

  const handleFormSubmit = (data: AttendeeFormData) => {
    onSubmit(attendeeIndex, data);
  };
  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="w-full bg-slate-100/75 p-5 rounded"
    >
      <div className="heading flex w-full items-center mb-5">
        <h2 className="whitespace-nowrap">
          Attendee Registration
          <span>
            ({attendeeIndex + 1} of {quantity})
          </span>
        </h2>
        <hr className="flex-grow ml-2 border-1" />
      </div>
      <div className="form-control flex flex-col gap-1 mb-5">
        <Label>
          Full Name <span className="text-red-600">*</span>
        </Label>
        <Input {...register("fullName")} type="text" />
        <small className="text-red-600 transition-all">
          {errors.fullName && errors.fullName.message}
        </small>
      </div>
      <div className="form-control flex flex-col gap-1 mb-5">
        <Label>
          Phone <span className="text-red-600">*</span>
        </Label>
        <Input {...register("phone")} type="text" />
        <small className="text-red-600 transition-all ">
          {errors.phone && errors.phone.message}
        </small>
      </div>
      <div className="form-control flex flex-col gap-1 mb-5">
        <Label>Email</Label>
        <Input {...register("email")} type="email" />
        <small className="text-red-600 transition-all ">
          {errors.email && errors.email.message}
        </small>
      </div>
      <div className="form-control flex flex-col gap-1 mb-5">
        <Label>Linkedin URL</Label>
        <Input {...register("linkedinUrl")} type="text" />
        <small className="text-red-600 transition-all ">
          {errors.linkedinUrl && errors.linkedinUrl.message}
        </small>
      </div>
      <div className="form-control flex flex-col gap-1 mb-5">
        <Label>Organisation</Label>
        <Input {...register("organisation")} type="text" />
        <small className="text-red-600 transition-all ">
          {errors.organisation && errors.organisation.message}
        </small>
      </div>
      <div className="form-control flex flex-col gap-1 mb-5">
        <Label>Designation</Label>
        <Input {...register("designation")} type="text" />
        <small className="text-red-600 transition-all ">
          {errors.designation && errors.designation.message}
        </small>
      </div>
      <div className="flex justify-end">
        <Button type="submit">Save Attendee {attendeeIndex + 1}</Button>
      </div>
    </form>
  );
}

export default AttendeeForm;
