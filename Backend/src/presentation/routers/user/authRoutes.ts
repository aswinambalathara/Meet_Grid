import { Router } from "express";
import createControllers from "../../di/controllers";

const router = Router();
const {userAuthController} = createControllers

router.post('/register',userAuthController.register.bind(userAuthController))

export default router;