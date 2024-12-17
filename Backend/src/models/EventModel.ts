import { model, Schema } from "mongoose";
import IEvent from "../interfaces/entities/IEvent";

const eventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: true,
    },
    description: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    subCategory: { type: String, required: true },
    date: {
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
    },
    eventTime: {
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
    },
    eventType: { type: String, enum: ["Online", "In-Person"], required: true },

    meetLink: { type: String },
    timeZone: { type: String },

    location: {
      address: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      pincode: { type: String },
      coordinates: {
        type: { type: String, enum: ["Point"] },
        coordinates: { type: [Number] },
      },
    },

    organizer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    attendees: [{ type: Schema.Types.ObjectId, ref: "User" }],
    eventLogo: { type: String },
    eventBanner: { type: String },
    tickets: [
      {
        ticketType: { type: String, enum: ["Free", "Paid"], required: true },
        price: { type: Number, required: true },
        currency: { type: String, required: true },
        available: { type: Number, required: true },
        sold: { type: Number, default: 0 },
      },
    ],
    status: {
      type: String,
      enum: ["Active", "Completed", "Cancelled", "Pending", "Rejected"],
      default: "Pending",
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const EventModel = model("event", eventSchema);
export default EventModel;
