
import AuthenticationUseCase from "../../application/user/AuthenticationUseCase";
import AdminAuthUseCase from "../../application/admin/AdminAuthUseCase";
import {userRepository,adminRepository} from './repositories'

import {bcryptService,cryptoService,nodeMailerService,joiService,jwtService} from './services'

const createUseCases = () =>({
    authUserUseCase:new AuthenticationUseCase(userRepository,bcryptService,cryptoService,jwtService,nodeMailerService,joiService),
    adminAuthUseCase:new AdminAuthUseCase(adminRepository,jwtService)
})

export default createUseCases();