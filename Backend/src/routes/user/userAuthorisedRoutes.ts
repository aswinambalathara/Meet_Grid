import { Router } from "express";
import UserController from "../../controllers/user/UserController";
import UserService from "../../services/user/UserService";
import UserRepository from "../../repositories/UserRepository";
import JoiService from "../../utils/validatorService";
import BcryptService from "../../utils/bcryptService";
import NodeMailerService from "../../utils/emailService";

//dependencies
const userRepository = new UserRepository();
const validatorService = new JoiService();
const bcryptService = new BcryptService();
const emailService = new NodeMailerService();

const userService = new UserService(
  userRepository,
  validatorService,
  bcryptService,
  emailService
);
const userController = new UserController(userService);
const router = Router();

router.get("/profile", userController.handleGetProfile.bind(userController));
router.patch(
  "/profile/basic-details",
  userController.handleUpdateBasicDetails.bind(userController)
);
router.patch(
  "/profile/professional-details",
  userController.handleUpdateProfessionalDetails.bind(userController)
);
router.post(
  "/profile/basic-details/send-mail",
  userController.handleSendVerificationMail.bind(userController)
);
router.post(
  "/profile/basic-details/verify-email",
  userController.handleVerifyEmail.bind(userController)
);
router.patch(
  "/profile/change-password",
  userController.handleChangePassword.bind(userController)
);
router.get(
  "/profile/change-password/send-otp",
  userController.handleSendPasswordChangeOTP.bind(userController)
);
router.patch(
  "/profile/deactivate-account",
  userController.handleDeactivateAccount.bind(userController)
);

export default router;
