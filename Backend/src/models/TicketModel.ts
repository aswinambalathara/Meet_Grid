import { model, Schema } from "mongoose";
import ITicket from "../interfaces/entities/ITicket";

const TicketSchema = new Schema<ITicket>({
  eventId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "event",
  },
  bookedBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  ticketPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  attendees: {
    type: [
      {
        fullName: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String },
        linkedinUrl: { type: String },
        organisation: { type: String },
        designation: { type: String },
      },
    ],
    required: true,
  },
  billingAddress: {
    type: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      pincode: { type: Number, required: true },
    },
    required: true,
  },
  payment: {
    type: {
      paymentId: { type: String },
      paymentStatus: {
        type: String,
        enum: ["Pending", "Confirmed"],
        default: "Pending",
      },
      transactionDate: { type: Date },
      method: { type: String },
    },
  },
});

const TicketModel = model("ticket", TicketSchema);
export default TicketModel;
