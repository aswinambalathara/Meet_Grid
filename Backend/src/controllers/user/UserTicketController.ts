import { NextFunction, Response } from "express";
import TicketService from "../../services/user/TicketService";
import { CustomRequest, StatusCode } from "../../types";

export default class UserTicketController {
  constructor(private ticketService: TicketService) {}

  async handlePaymentCreation(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const ticketData = req.body;
      const { id } = req.user!;
      const result = await this.ticketService.createTicketOrder(id, ticketData);
      console.log(result)
      res.status(StatusCode.Success).json(result); 
    } catch (error) {
      next(error);
    }
  }

  async handleVerifyPayment(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { orderId, ticketId, paymentId, signature } = req.body;
      const result = await this.ticketService.verifyPayment(
        ticketId,
        orderId,
        paymentId,
        signature
      );
      res.status(StatusCode.Accepted).json(result);
    } catch (error) {
      next(error);
    }
  }

  // async handleGenerateTicket(
  //   req: CustomRequest,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> {
  //   try {
  //       //not implemented
  //       res.status(StatusCode.Accepted)
  //   } catch (error) {
  //       next(error)
  //   }
  // }
}
