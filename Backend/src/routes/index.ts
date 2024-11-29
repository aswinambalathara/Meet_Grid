import { Router } from "express";
import errorHandler from "../middlewares/errorHandler";
import userAuthRoutes from "./user/UserAuthRoutes";
import userProtectedRoutes from "./user/userAuthorisedRoutes";
import adminAuthRoutes from "./admin/AdminAuthRoutes";
import adminRoutes from "./admin/AdminRoutes";
import AdminAuthMiddleware from "../middlewares/adminAuthMiddleware";

import JWTService from "../utils/jwtService";

const jwtService = new JWTService();
const adminAuthMiddlware = new AdminAuthMiddleware(jwtService);

const app = Router();

app.use("/user/auth", userAuthRoutes);
app.use("/user", userProtectedRoutes);
app.use("/admin/auth", adminAuthRoutes);
app.use("/admin", adminRoutes);

app.use(errorHandler);

export default app;
