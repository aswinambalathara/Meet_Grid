import { Router } from "express";

import UserRepository from "../../repositories/UserRepository";
import AdminUserService from "../../services/admin/AdminUserService";
import AdminController from "../../controllers/admin/AdminController";

import JoiService from "../../utils/validatorService";

const validatorService = new JoiService()

const userRepository = new UserRepository()
const adminUserService = new AdminUserService(userRepository,validatorService)
const adminController = new AdminController(adminUserService)
const router = Router()


router.get('/users',adminController.handleGetUsers.bind(adminController));
router.get('/users/:id',adminController.handleGetUser.bind(adminController));
router.patch('/users/block',adminController.handleToggleUserBlockStatus.bind(adminController));
router.patch('/users/activation',adminController.handleToggleUserActivationStatus.bind(adminController));

export default router