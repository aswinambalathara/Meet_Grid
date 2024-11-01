// ------------------------------------------Controllers------------------------------------------------------------------------------
import AuthUserController from "../controllers/user/authController";


// ------------------------------------------Use-Cases------------------------------------------------------------------------------
import createUseCases from './usecases'

const {authUserUseCase} = createUseCases

// ------------------------------------------Controller-creators------------------------------------------------------------------------------

const createControllers = ()=>({
userAuthController:new AuthUserController(authUserUseCase)
})

export default createControllers();