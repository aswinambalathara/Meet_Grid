
import AuthenticationUseCase from "../../application/user/AuthenticationUseCase";

import {userRepository} from './repositories'

import {bcryptService,cryptoService,nodeMailerService,joiService} from './services'

const createUseCases = () =>({
    authUserUseCase:new AuthenticationUseCase(userRepository,bcryptService,cryptoService,nodeMailerService,joiService)
})

export default createUseCases();