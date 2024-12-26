import { Types, Document } from "mongoose";

export default interface IEvent extends Document {
  title: string;
  description: string;
  category: Types.ObjectId;
  startDate: Date;
  endDate: Date;
  registrationDeadline: Date;
  eventType: "Online" | "In-Person";
  meetLink?: string;
  timeZone?: string;
  virtualPlatform?: string;
  location?: {
    venueName: string;
    streetAddress: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    coordinates: {
      type: "Point";
      coordinates: [number, number];
    };
    googlemapLink?: string;
  };
  organizer: Types.ObjectId;
  attendees: Types.ObjectId[];
  eventLogo: {
    url: string;
    public_id: string;
  };
  eventBanner: {
    url: string;
    public_id: string;
  };
  ticket: {
    ticketType: "Free" | "Paid";
    price: number;
    currency: string;
    availableTickets: number;
  };
  status: "Active" | "Completed" | "Cancelled" | "Pending" | "Rejected";
  isActive: boolean;
  readonly createdAt: Date;
  updatedAt: Date;
}

export interface IEventCategory extends Document {
  categoryName?: string;
  categoryType?: "Professional" | "General";
  description?: string;
  createdAt?: Date;
  isDeleted?: boolean;
}
