import { Types, Document } from "mongoose";

export default interface IEvent extends Document {
  title: string;
  description: string;
  category: Types.ObjectId;
  subCategory: string;
  date: {
    startDate: Date;
    endDate: Date;
  };
  eventTime: {
    startTime: string;
    endTime: string;
  };
  eventType: "Online" | "In-Person";
  meetLink?: string;
  timeZone?: string;
  location?: {
    address: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    coordinates: {
      type: "Point";
      coordinates: [number, number];
    };
  };
  organizer: Types.ObjectId;
  attendees: Types.ObjectId[];
  eventLogo: string;
  eventBanner: string;
  tickets: {
    ticketType: "Free" | "Paid";
    price: number;
    currency: string;
    available: number;
    sold: number;
  }[];
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
}
