import IUser from "../../domain/entities/IUserEntity";
import IUserRepository from "../../domain/interfaces/repositories/IUserRepository";
import IPasswordService from "../../domain/interfaces/services/IBcryptService";
import ITokenService from "../../domain/interfaces/services/ICryptoService";

export default class AuthenticationUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordService: IPasswordService,
    private customTokenService: ITokenService
  ) {}
  async register(user: IUser): Promise<string> {
    user.password = await this.passwordService.hash(user.password);
    const token = this.customTokenService.generateToken()
    const verificationToken = {
        token : token,
        expiry : new Date(Date.now() + 24 * 60 * 60 * 1000)
    }
    user.verificationToken = verificationToken
    const { _id } = await this.userRepository.create(user);
    
    return `User created with ID ${_id}`;
  }
}
