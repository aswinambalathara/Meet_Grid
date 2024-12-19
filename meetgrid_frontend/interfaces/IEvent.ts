export default interface IEvent {
  title: string;
  description: string;
  category: string;
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
  eventLogo: string;
  eventBanner: string;
  tickets: {
    ticketType: "Free" | "Paid";
    price: number;
    currency: string;
    available: number;
  };
}
