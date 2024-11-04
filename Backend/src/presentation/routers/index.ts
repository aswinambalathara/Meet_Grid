import { Router } from "express";
import errorHandler from "../middlewares/ErrorHandler";
import authRoutes from './user/authRoutes'

const app = Router();
app.use('/',authRoutes)

app.use(errorHandler);
export default app