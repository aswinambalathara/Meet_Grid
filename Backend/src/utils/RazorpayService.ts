import razorpayInstance from "../config/razorpayConfig";
import { StatusCode } from "../types";
import CustomError from "./CustomError";
import IUser from "../interfaces/entities/IUser";
import { Orders } from "razorpay/dist/types/orders";
import crypto from "crypto";
import { RAZORPAY_KEY } from "../config/env";
import CryptoService from "./CryptoService";

export class RazorpayService {
  private razorpayInstance = razorpayInstance;
  constructor(private cryptoService: CryptoService) {}
  async createOrder(
    amount: number,
    user: IUser,
    ticketId: string
  ): Promise<Orders.RazorpayOrder> {
    const nanoid = this.cryptoService.generateNanoId(5)
    try {
      const options = {
        amount: 1000 * 100,
        currency: "INR",
        receipt: `PAY${nanoid}`,
        notes: {
          email: user.email,
          name: user.fullName,
          ticketId: ticketId,
        },
      };

      const order = await this.razorpayInstance.orders.create(options);
      return order;
    } catch (error) {
      console.error(error);
      throw new CustomError(
        "Something went wrong with Razorpay",
        StatusCode.PaymentError
      );
    }
  }

  async verifyPayment(
    order_id: string,
    payment_id: string,
    signature: string
  ): Promise<boolean> {
    const hmac = crypto.createHmac("sha256", RAZORPAY_KEY as string);
    hmac.update(`${order_id}|${payment_id}`);
    const generatedSignature = hmac.digest("hex");
    return generatedSignature === signature;
  }
}
