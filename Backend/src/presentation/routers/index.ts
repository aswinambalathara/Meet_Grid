import { Router } from "express";
import authRoutes from './user/authRoutes'

const app = Router();
app.use('/',authRoutes)

export default app