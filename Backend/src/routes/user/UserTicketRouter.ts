import { Router } from "express";
import JoiService from "../../utils/validatorService";
import UserTicketController from "../../controllers/user/UserTicketController";
import TicketService from "../../services/user/TicketService";
import TicketRepository from "../../repositories/TicketRepository";
import { RazorpayService } from "../../utils/RazorpayService";
import UserRepository from "../../repositories/UserRepository";
import EventRepository from "../../repositories/EventRepository";
import CryptoService from "../../utils/CryptoService";

const validatorService = new JoiService();
const cryptoService = new CryptoService();
const razorpayService = new RazorpayService(cryptoService);

const ticketRepository = new TicketRepository();
const userRespository = new UserRepository();
const eventRepository = new EventRepository();

const ticketService = new TicketService(
  ticketRepository,
  eventRepository,
  userRespository,
  validatorService,
  razorpayService
);

const ticketController = new UserTicketController(ticketService);

const router = Router();

router.post(
  "/checkout",
  ticketController.handlePaymentCreation.bind(ticketController)
);

router.patch(
  "/checkout/verify",
  ticketController.handleVerifyPayment.bind(ticketController)
);

router.get(
  "/get-ticket",
  ticketController.handleGenerateTicket.bind(ticketController)
);

export default router;
