// ------------------------------------------Controllers------------------------------------------------------------------------------
import AuthUserController from "../controllers/user/authController";
import AdminAuthController from "../controllers/admin/adminAuthController";

// ------------------------------------------Use-Cases------------------------------------------------------------------------------
import createUseCases from './usecases'

const {authUserUseCase,adminAuthUseCase} = createUseCases

// ------------------------------------------Controller-creators------------------------------------------------------------------------------

const createControllers = ()=>({
userAuthController:new AuthUserController(authUserUseCase),
adminAuthController:new AdminAuthController(adminAuthUseCase)
})

export default createControllers();