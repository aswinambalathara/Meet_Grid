import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import React from "react";

function TicketDetails() {
  return (
    <div className="h-full p-16">
      <h1 className="mb-5">Ticket Details</h1>

      <div className="form-control flex flex-col mb-5 gap-2">
        <Label htmlFor="ticketType">Ticket Type</Label>
        <select
          name="ticketType"
          id="ticketType"
          className="bg-slate-100 h-10 rounded p-2 cursor-pointer text-sm"
          defaultValue={''}
        >
          <option value={''} disabled>Select Ticket Type</option>
          <option value="Paid">Paid</option>
          <option value="Free">Free</option>
        </select>
      </div>
      <div className="form-control flex flex-col mb-5 gap-2">
        <Label htmlFor="ticketPrice">Ticket Price</Label>
        <Input
          type="text"
          id="ticketPrice"
          placeholder="Ticket Price"
          className="bg-slate-100 h-10"
        />
      </div>
      <div className="form-control flex flex-col mb-5 gap-2">
        <Label htmlFor="Quantity">Available Tickets</Label>
        <Input
          type="text"
          id="Quantity"
          placeholder="Available Tickets"
          className="bg-slate-100 h-10"
        />
      </div>
    </div>
  );
}

export default TicketDetails;
