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
    googlemapLink?: string;
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
    ticketType: "Free" | "Paid";
    price: number;
    currency: string;
    availableTickets: number;
    registrationDeadline: Date;
  };
}
