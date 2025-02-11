import IUser from "./IUser";

export default interface IEvent {
  readonly _id?: string;
  title: string;
  description: string;
  category: string;
  startDate: Date;
  endDate: Date;
  eventType: "Online" | "In-Person";
  meetLink?: string;
  timeZone?: string;
  virtualPlatform?: string;
  organizer?: Partial<IUser>;
  location?: {
    venueName?: string;
    streetAddress?: string;
    city?: string;
    state?: string;
    country?: string;
    pincode?: string;
    coordinates?: {
      type: "Point";
      coordinates: [number, number];
    };
    googleMapLink?: string;
  };
  eventLogo?: {
    url?: string;
    public_id?: string;
  };
  eventBanner?: {
    url?: string;
    public_id?: string;
  };
  ticket: {
    ticketName?: string;
    ticketDescription?: string;
    ticketType: "Free" | "Paid";
    price: number;
    currency: string;
    availableTickets: number;
    registrationDeadline: Date;
  };
  eventStatus?: {
    status:"Active" | "Completed" | "Cancelled" | "Pending" | "Rejected",
    message?:string
  };
}
