import { Router } from "express";
import EventCategoryRepository from "../../repositories/EventCategoryRepository";
import EventRepository from "../../repositories/EventRepository";
import JoiService from "../../utils/validatorService";
import UserEventController from "../../controllers/user/UserEventController";
import EventService from "../../services/user/EventService";

const eventCategoryRepository = new EventCategoryRepository();
const eventRepository = new EventRepository();
const validatorService = new JoiService();

const eventService = new EventService(
  eventRepository,
  eventCategoryRepository,
  validatorService
);
const eventController = new UserEventController(eventService);
const router = Router();

router.post(
  "/createEvent",
  eventController.handleCreateEvent.bind(eventController)
);

router.post('/check-out',)


export default router;
