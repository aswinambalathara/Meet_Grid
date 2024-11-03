
import AuthenticationUseCase from "../../application/user/AuthenticationUseCase";

import {userRepository} from './repositories'

import {bcryptService,cryptoService,nodeMailerService,joiService,jwtService} from './services'

const createUseCases = () =>({
    authUserUseCase:new AuthenticationUseCase(userRepository,bcryptService,cryptoService,jwtService,nodeMailerService,joiService)
})

export default createUseCases();