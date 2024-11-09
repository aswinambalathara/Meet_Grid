import { Router } from "express";

import BcryptService from "../../utils/BcryptService";
import NodeMailerService from "../../utils/EmailService";
import JoiService from "../../utils/ValidatorService";
import JWTService from "../../utils/JwtService";

import UserRepository from "../../repositories/UserRepository";
import UserAuthService from "../../services/user/UserAuthService";
import AuthUserController from "../../controllers/user/UserAuthController";
import CryptoService from "../../utils/CryptoService";

const router = Router();

const bcryptService = new BcryptService();
const emailService = new NodeMailerService();
const validatorService = new JoiService();
const jwtService = new JWTService();
const tokenService = new CryptoService();

const userRepository = new UserRepository();
const userAuthService = new UserAuthService(
  userRepository,
  jwtService,
  bcryptService,
  validatorService,
  emailService,
  tokenService
);
const authUserController = new AuthUserController(userAuthService);

router.post(
  "/create",
  authUserController.handleUserSignUp.bind(authUserController)
);
router.get(
  "/verify-user",
  authUserController.handleUserVerification.bind(authUserController)
);
router.post(
  "/login",
  authUserController.handleUserLogin.bind(authUserController)
);

router.post(
  "/login/send-otp",
  authUserController.handleOTPLogin.bind(authUserController)
);

export default router;
