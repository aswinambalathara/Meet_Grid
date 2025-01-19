import mongoose from "mongoose";
import ITicket from "../../interfaces/entities/ITicket";
import ITicketRepository from "../../interfaces/repository/ITicketRepository";
import { payloadResponse, response, StatusCode } from "../../types";
import { RazorpayService } from "../../utils/RazorpayService";
import JoiService from "../../utils/validatorService";
import IUserRepository from "../../interfaces/repository/IUserRepository";
import IEventRepository from "../../interfaces/repository/IEventRepository";
import CustomError from "../../utils/CustomError";

export default class TicketService {
  constructor(
    private ticketRepository: ITicketRepository,
    private eventRepository: IEventRepository,
    private userRepository: IUserRepository,
    private validatorService: JoiService,
    private razorpayService: RazorpayService
  ) {}

  async createTicketOrder(
    userId: string,
    ticketData: ITicket
  ): Promise<payloadResponse> {

    this.validatorService.validateRequiredFields({
      eventId: ticketData.eventId,
      quantity: ticketData.quantity,
      ticketPrice: ticketData.ticketPrice,
      totalPrice: ticketData.totalPrice,
      attendees: ticketData.attendees,
      billingAddress: ticketData.billingAddress,
      paymentMethod: ticketData.payment.method,
    });

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new CustomError("user not found", StatusCode.NotFound);
    }

    const event = await this.eventRepository.findById(
      ticketData.eventId.toString()
    );

    if (!event) {
      throw new CustomError("Event not found with id", StatusCode.NotFound);
    }

    if (ticketData.quantity > event.ticket.availableTickets) {
      throw new CustomError(
        `Not enough tickets`,
        StatusCode.ServiceUnavailable
      );
    }

    event.ticket.availableTickets -= ticketData.quantity;
    ticketData.bookedBy = new mongoose.Types.ObjectId(userId);
    ticketData.payment.paymentStatus = "Pending";
    await event.save();
    const ticket = await this.ticketRepository.create(ticketData);
    const order = await this.razorpayService.createOrder(
     ticketData.totalPrice,
      user,
      ticket.id
    );
    return { data: order, message: "razorpay order created", status: true };

  }

  async verifyPayment(
    ticketId: string,
    orderId: string,
    paymentId: string,
    signature: string
  ): Promise<response> {
    //console.log(ticketId,orderId,paymentId,signature)
    const isVerified = await this.razorpayService.verifyPayment(
      orderId,
      paymentId,
      signature
    );
    if (!isVerified) {
      throw new CustomError("Payment Failed", StatusCode.PaymentError);
    }
    const payment: ITicket["payment"] = {
      paymentId: paymentId,
      paymentStatus: "Confirmed",
      transactionDate: new Date(Date.now()),
      method: "razorpay",
    };
    await this.ticketRepository.update(ticketId, { payment: payment });
    return { message: "Payment Successfull", status: true };
  }
}
