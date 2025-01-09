import Razorpay from "razorpay";
import { RAZORPAY_KEY, RAZORPAY_SECRET } from "./env";

const razorpayInstance = new Razorpay({
  key_id: RAZORPAY_KEY!,
  key_secret: RAZORPAY_SECRET,
});

export default razorpayInstance;
