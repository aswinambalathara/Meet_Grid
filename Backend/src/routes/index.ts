import { Router } from 'express';
import errorHandler from '../middlewares/errorHandler';
import userAuthRoutes from './user/userAuthRoutes';
import userProtectedRoutes from './user/userAuthorisedRoutes';
const app = Router();

app.use('/user/auth',userAuthRoutes);
app.use('/user',userProtectedRoutes);

app.use(errorHandler); 
export default app; 