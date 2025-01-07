import { Document, Types } from "mongoose";

export default interface ITicket extends Document {
  eventId: Types.ObjectId;
  bookedBy: Types.ObjectId;
  quantity: number;
  ticketPrice: number;
  totalPrice: number;
  attendees: [
    {
      fullName: string;
      phone: string;
      email?: string;
      linkedinUrl?: string;
      organisation?: string;
      designation?: string;
    }
  ];
  billingAddress: {
    street: string;
    city: string;
    state: string;
    country: string;
    pincode: number;
  };
  payment: {
    paymentId: string;
    method:string;
    paymentStatus: "Pending" | "Confirmed";
    transactionDate: Date;
  };
}
