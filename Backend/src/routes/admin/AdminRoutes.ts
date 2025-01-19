import { Router } from "express";

import UserRepository from "../../repositories/UserRepository";
import AdminUserService from "../../services/admin/AdminUserService";
import AdminController from "../../controllers/admin/AdminController";

import JoiService from "../../utils/validatorService";
import EventCategoryRepository from "../../repositories/EventCategoryRepository";
import EventRepository from "../../repositories/EventRepository";
import AdminEventCategoryService from "../../services/admin/AdminEventCategoryService";
//import TicketRepository from "../../repositories/TicketRepository";
import AdminEventService from "../../services/admin/AdminEventService";

const validatorService = new JoiService();

const userRepository = new UserRepository();
const eventCategoryRepository = new EventCategoryRepository();
const eventRepository = new EventRepository();
//const ticketRepository = new TicketRepository()
const adminEventCategoryService = new AdminEventCategoryService(
  eventCategoryRepository,
  validatorService
);
const adminEventService = new AdminEventService(eventRepository);
const adminUserService = new AdminUserService(userRepository, validatorService);
const adminController = new AdminController(
  adminUserService,
  adminEventCategoryService,
  adminEventService
);
const router = Router();

router.get("/users", adminController.handleGetUsers.bind(adminController));
router.get("/users/:id", adminController.handleGetUser.bind(adminController));
router.patch(
  "/users/block",
  adminController.handleToggleUserBlockStatus.bind(adminController)
);
router.patch(
  "/users/activation",
  adminController.handleToggleUserActivationStatus.bind(adminController)
);
router.post(
  "/event-categories/create",
  adminController.handleCreateEventCategory.bind(adminController)
);
router.get(
  "/event-categories/get-categories",
  adminController.handleGetEventCategories.bind(adminController)
);

router.patch(
  "/event-categories/delete/:id",
  adminController.handleDeleteEventCategory.bind(adminController)
);

router.patch(
  "/event-categories/edit",
  adminController.handleEditEventCategory.bind(adminController)
);

router.get(
  "/events/get-events",
  adminController.handlegetEvents.bind(adminController)
);

router.patch(
  "/events/approve-event/:id",
  adminController.handleApproveEvent.bind(adminController)
);
router.patch(
  "/events/reject-event/:id",
  adminController.handleRejectEvent.bind(adminController)
);
export default router;
