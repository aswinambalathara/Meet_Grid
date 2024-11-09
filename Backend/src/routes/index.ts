import { Router } from 'express';
import errorHandler from '../middlewares/errorHandler';
import userAuthRoutes from './user/UserAuthRoutes';
import userProtectedRoutes from './user/UserAuthorisedRoutes';
import adminAuthRoutes from './admin/AdminAuthRoutes'
const app = Router();

app.use('/user/auth',userAuthRoutes);
app.use('/user',userProtectedRoutes);
app.use('/admin/auth',adminAuthRoutes)
app.use(errorHandler); 
export default app; 