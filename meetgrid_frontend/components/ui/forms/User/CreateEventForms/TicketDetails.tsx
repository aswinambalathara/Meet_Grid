import { Input } from "@/components/ui/input";
import { EventFormData, TicketsDetailFormData } from "@/lib/utility/types";
import { Label } from "@radix-ui/react-label";
import React from "react";
import { useFormContext } from "react-hook-form";
import { data } from "currency-codes";

function TicketDetails() {
  const {
    register,
    formState: { errors },
  } = useFormContext<EventFormData>();

  //currency data
  const currencies = data;
  return (
    <div className="h-full p-16">
      <h1 className="mb-5">Ticket Details</h1>

      <div className="flex justify-between items-center gap-3 mb-5 text-sm">
        <div className="form-control flex flex-col gap-2 w-full">
          <Label htmlFor="ticketType">Ticket Type <span className="text-red-600">*</span></Label>
          <select
            {...register("ticket.ticketType")}
            id="ticketType"
            className="bg-slate-100 h-10 rounded p-2 cursor-pointer"
            defaultValue={""}
          >
            <option value={""} disabled>
              Select Ticket Type
            </option>
            <option value="Paid">Paid</option>
            <option value="Free">Free</option>
          </select>
          <small className="text-red-600">
            {errors?.ticket?.ticketType ? errors.ticket.ticketType.message : ""}
          </small>
        </div>
        <div className="form-control flex flex-col gap-2 w-full">
          <Label htmlFor="ticketPrice">Ticket Price <span className="text-red-600">*</span></Label>
          <Input
            {...register("ticket.price")}
            type="text"
            id="ticketPrice"
            placeholder="Ticket Price"
            className="bg-slate-100 h-10"
          />
          <small className="text-red-600">
            {errors?.ticket?.price ? errors.ticket.price.message : ""}
          </small>
        </div>
      </div>

      <div className="flex justify-between items-center gap-3 mb-5 text-sm">
        <div className="form-control flex flex-col gap-2 w-full ">
          <Label htmlFor="currency">Currency <span className="text-red-600">*</span></Label>
          <select
            {...register("ticket.currency")}
            id="currency"
            defaultValue={""}
            className="bg-slate-100 h-10 rounded text-black px-2"
          >
            <option value="" hidden>
              Select Currency
            </option>
            {currencies.map((currency, idx) => (
              <option value={currency.code} key={currency.code}>
                {currency.code} - {currency.currency}
              </option>
            ))}
          </select>
          <small className="text-red-600">
            {errors.ticket?.currency ? errors.ticket?.currency.message : ""}
          </small>
        </div>
        <div className="form-control flex flex-col gap-2 w-full">
          <Label htmlFor="Quantity">Available Tickets <span className="text-red-600">*</span></Label>
          <Input
            {...register("ticket.availableTickets")}
            type="number"
            id="availableTickets"
            placeholder="Available Tickets"
            className="bg-slate-100 h-10"
          />
          <small className="text-red-600">
            {errors.ticket?.availableTickets ? errors.ticket?.availableTickets.message : ""}
          </small>
        </div>
      </div>

      <div className="flex justify-between items-center gap-3 mb-5">
        <div className="form-control flex flex-col gap-2 basis-2/4">
          <Label htmlFor="registration-deadline" className="text-sm">
            Registration Deadline <span className="text-red-600">*</span>
          </Label>
          <input
            {...register("ticket.registrationDeadline")}
            type="datetime-local"
            id="registration-deadline"
            className="bg-slate-100 h-10 px-3 rounded text-sm"
          />
          <small className="text-red-600">
            {errors.ticket?.registrationDeadline
              ? errors.ticket?.registrationDeadline.message
              : ""}
          </small>
        </div>
      </div>
    </div>
  );
}

export default TicketDetails;
