import IUser from "../../domain/entities/IUserEntity";
import IUserRepository from "../../domain/interfaces/repositories/IUserRepository";
import IPasswordService from "../../domain/interfaces/services/IBcryptService";
import ITokenService from "../../domain/interfaces/services/ICryptoService";
import IEmailService from "../../domain/interfaces/services/IMailService";
import IValidationService from "../../domain/interfaces/services/IValidationService";
import { SERVER_URL, CLIENT_URL } from "../../infra/config/env";

export default class AuthenticationUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordService: IPasswordService,
    private customTokenService: ITokenService,
    private mailService: IEmailService,
    private validatorService: IValidationService
  ) {}
  async register(user: IUser): Promise<string> {
    this.validatorService.validateRequiredFields({
      email: user.email,
      password: user.password,
      name: user.fullName,
    });
    this.validatorService.validateEmailFormat(user.email);
    this.validatorService.validatePassword(user.password);
    this.validatorService.validateLength(user.fullName, 3, 20);
    const existUser = await this.userRepository.findByEmail(user.email);
    if (existUser) {
      throw new Error("User already exist with this mail");
    }
    user.password = await this.passwordService.hash(user.password);
    const token = this.customTokenService.generateToken();
    const verificationToken = {
      token: token,
      expiry: new Date(Date.now() + 24 * 60 * 60 * 1000),
    };
    user.verificationToken = verificationToken;
    const { email, fullName } = await this.userRepository.create(user);
    await this.mailService.sendMail({
      email,
      name: fullName,
      pathOfTemplate: "../../../public/userVerification.html",
      subject: "Verification Mail",
      link: `${SERVER_URL}/verify_email/${token}`,
    });
    return `User created, verification link send to email${user.email}`;
  }

  async verifyEmail(token:string):Promise<string>{
    const user = this.userRepository.verifyByToken(token);
    
  }
}
