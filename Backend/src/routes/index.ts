import { Router } from "express";
import errorHandler from "../middlewares/errorHandler";
import userAuthRoutes from "./user/UserAuthRoutes";
import userProtectedRoutes from "./user/UserAuthorisedRoutes";
import eventRoutes from "./user/EventsRoutes";
import protectEventRoutes from "./user/AuthorisedEventRoutes";
import adminAuthRoutes from "./admin/AdminAuthRoutes";
import adminRoutes from "./admin/AdminRoutes";
import userTicketRoutes from './user/UserTicketRouter';
import AdminAuthMiddleware from "../middlewares/adminAuthMiddleware";
import UserAuthMiddleware from "../middlewares/userAuthMiddleware";
import JWTService from "../utils/jwtService";
import UserRepository from "../repositories/UserRepository";

const userRespository = new UserRepository();

const jwtService = new JWTService();
const adminAuthMiddlware = new AdminAuthMiddleware(jwtService);
const userAuthMiddleware = new UserAuthMiddleware(jwtService, userRespository);
const app = Router();

app.use("/user/auth", userAuthRoutes);
app.use("/user", userAuthMiddleware.exec, userProtectedRoutes);
app.use("/events", eventRoutes);
app.use("/events", userAuthMiddleware.exec, protectEventRoutes);
app.use('/tickets',userAuthMiddleware.exec,userTicketRoutes)
app.use("/admin/auth", adminAuthRoutes);
app.use("/admin", adminAuthMiddlware.exec, adminRoutes);
app.use(errorHandler);

export default app;
