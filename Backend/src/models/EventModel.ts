import { model, Schema } from "mongoose";
import IEvent from "../interfaces/entities/IEvent";

const eventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: true,
    },
    description: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "eventCategory", required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    eventType: { type: String, enum: ["Online", "In-Person"], required: true },
    virtualDetails: {
      type: {
        virtualPlatform: { type: String },
        meetLink: { type: String },
        timeZone: { type: String },
        accessInstructions: { type: String },
      },
      required: false,
    },
    location: {
      type: {
        venueName: { type: String },
        streetAddress: { type: String },
        city: { type: String },
        state: { type: String },
        country: { type: String },
        pincode: { type: String },
        coordinates: {
          type: { type: String, enum: ["Point"] },
          coordinates: { type: [Number] },
        },
        googleMapLink: { type: String },
      },
      required: false,
    },

    organizer: { type: Schema.Types.ObjectId, ref: "user", required: true },
    attendees: [{ type: Schema.Types.ObjectId, ref: "user" }],
    eventLogo: {
      type: {
        url: { type: String },
        public_id: { type: String },
      },
      required: true,
    },
    eventBanner: {
      type: {
        url: { type: String },
        public_id: { type: String },
      },
      required: true,
    },
    ticket: {
      type: {
        ticketType: { type: String, enum: ["Free", "Paid"], required: true },
        price: { type: Number, required: true },
        currency: { type: String, required: true },
        availableTickets: { type: Number, required: true },
        registrationDeadline: { type: Date, required: true },
        ticketName: { type: String, required: true, default: "Normal Ticket" },
        ticketDescription: { type: String, required: true, default: "This is a normal ticket" },
      },
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Completed", "Cancelled", "Pending", "Rejected"],
      default: "Pending",
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

eventSchema.index({ location: "2dsphere" });

const EventModel = model("event", eventSchema);
export default EventModel;
