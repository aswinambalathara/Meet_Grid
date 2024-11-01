
import AuthenticationUseCase from "../../application/user/AuthenticationUseCase";

import {userRepository} from './repositories'

import {bcryptService,cryptoService} from './services'

const createUseCases = () =>({
    authUserUseCase:new AuthenticationUseCase(userRepository,bcryptService,cryptoService)
})

export default createUseCases();