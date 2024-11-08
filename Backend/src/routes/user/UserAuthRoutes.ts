import { Router } from 'express';

import UserRepository from '../../repositories/UserRepository';
import UserAuthService from '../../services/user/UserAuthService';
import AuthUserController from '../../controllers/user/UserAuthController';


const router = Router();
 
const userRepository = new UserRepository();
const userAuthService = new UserAuthService(userRepository);
const authUserController = new AuthUserController(userAuthService);

// router.post('/create',(req,res,next)=>{authUserController.handleUserSignUp});
// router.get('/verify-user',(req,res,next)=>{authUserController.handleUserVerification})

router.post('/create',authUserController.handleUserSignUp.bind(authUserController)); 
router.get('/verify-user',authUserController.handleUserVerification.bind(authUserController));

export default router;
