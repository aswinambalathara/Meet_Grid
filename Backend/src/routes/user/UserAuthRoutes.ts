import { Router } from "express";

import UserRepository from "../../repositories/UserRepository";
import UserAuthService from "../../services/user/UserAuthService";
import AuthUserController from "../../controllers/user/UserAuthController";


const router = Router()

const userRepository = new UserRepository();
const userAuthService = new UserAuthService(userRepository)
const authUserController = new AuthUserController(userAuthService)




export default router
