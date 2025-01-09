export default interface ITicket {
  eventId: string;
  bookedBy?: string;
  quantity: number;
  ticketPrice: number;
  totalPrice: number;
  attendees?: Array<{
    fullName: string;
    phone: string;
    email?: string;
    linkedinUrl?: string;
    organisation?: string;
    designation?: string;
  }>;
  billingAddress?: {
    street: string;
    city: string;
    state: string;
    country: string;
    pincode: number;
  };
  payment: {
    paymentId: string;
    method: string;
    paymentStatus: "Pending" | "Confirmed";
    transactionDate: Date | undefined
  };
}
