import { Router } from "express";

import UserRepository from "../../repositories/UserRepository";
import AdminUserService from "../../services/admin/AdminUserService";
import AdminController from "../../controllers/admin/AdminController";

import JoiService from "../../utils/validatorService";
import EventCategoryRepository from "../../repositories/EventCategoryRepository";
import AdminEventCategoryService from "../../services/admin/AdminEventCategoryService";

const validatorService = new JoiService();

const userRepository = new UserRepository();
const eventCategoryRepository = new EventCategoryRepository();
const adminEventCategoryService = new AdminEventCategoryService(
  eventCategoryRepository,
  validatorService
);
const adminUserService = new AdminUserService(userRepository, validatorService);
const adminController = new AdminController(
  adminUserService,
  adminEventCategoryService
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

router.delete(
  "/event-categories/delete/:id",
  adminController.handleDeleteEventCategory.bind(adminController)
);
export default router;
