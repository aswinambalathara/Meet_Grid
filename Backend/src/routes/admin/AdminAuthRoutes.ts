import { Router } from "express";

import AdminAuthService from "../../services/admin/AdminAuthService";
import AdminAuthController from "../../controllers/admin/AdminAuthController";
import AdminRepository from "../../repositories/AdminRepository";
import JWTService from "../../utils/JwtService";
import BcryptService from "../../utils/BcryptService";

const router = Router();

const adminRepository = new AdminRepository();
const jwtService = new JWTService();
const bcryptService = new BcryptService();
const adminAuthService = new AdminAuthService(
  adminRepository,
  jwtService,
  bcryptService
);
const adminAuthController = new AdminAuthController(adminAuthService);

router.post(
  "/login",
  adminAuthController.handleAdminLogin.bind(adminAuthController)
);
router.get(
  "/refresh",
  adminAuthController.handleRefreshToken.bind(adminAuthController)
);
router.post(
  "/logout",
  adminAuthController.handleAdminLogout.bind(adminAuthController)
);
export default router;