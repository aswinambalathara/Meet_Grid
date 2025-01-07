import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AttendeeSchema } from "@/lib/utility/schemas";
import { AttendeeFormData } from "@/lib/utility/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

function AttendeeForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<AttendeeFormData>({
    resolver: zodResolver(AttendeeSchema),
    mode: "all",
  });

  const onSubmit = (data: AttendeeFormData) => {
    console.log(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full bg-slate-100/75 p-5 rounded"
    >
      <div className="heading flex w-full items-center mb-5">
        <h2 className="whitespace-nowrap">
          Attendee Registration<span>(1 of 3)</span>
        </h2>
        <hr className="flex-grow ml-2 border-1" />
      </div>
      <div className="form-control flex flex-col gap-1 mb-5">
        <Label>Full Name</Label>
        <Input {...register("fullName")} type="text" />
        <small className="text-red-600 transition-all">
          {errors.fullName && errors.fullName.message}
        </small>
      </div>
      <div className="form-control flex flex-col gap-1 mb-5">
        <Label>Phone</Label>
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
    </form>
  );
}

export default AttendeeForm;
