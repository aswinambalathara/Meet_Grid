import { throwDeprecation } from "process";
import IUser from "../../domain/entities/IUserEntity";
import IUserRepository from "../../domain/interfaces/repositories/IUserRepository";
import IPasswordService from "../../domain/interfaces/services/IBcryptService";
import ITokenService from "../../domain/interfaces/services/ICryptoService";
import IEmailService from "../../domain/interfaces/services/IMailService";
import IValidationService from "../../domain/interfaces/services/IValidationService";
import { SERVER_URL, CLIENT_URL } from "../../infra/config/env";
import IJWTService from "../../domain/interfaces/services/IJWTService";

type LoginResponse = {
  userName: string;
  accessToken: string;
  refreshToken: string;
};

export default class AuthenticationUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordService: IPasswordService,
    private cryptoService: ITokenService,
    private TokenService : IJWTService,
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
    const token = this.cryptoService.generateToken();
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

  async verifyEmail(token: string): Promise<string> {
    const user = await this.userRepository.verifyByToken(token);

    if (!user) {
      throw new Error("Invalid or Expired token");
    }
    user.isVerified = true;
    await this.userRepository.update(user._id!, user);
    return `User verified`;
  }

  async loginUser(user: IUser): Promise<LoginResponse> {
    const { email, password } = user;
    const foundUser = await this.userRepository.findByEmail(email);

    if (!foundUser) {
      throw new Error("User not found with email");
    }
    if(foundUser.isBlocked){
      throw new Error("User blocked");
    }

    if(!foundUser.isVerified){
      throw new Error ("User not verified");
    }

    const validPassword = await this.passwordService.compare(password,foundUser.password);
    if(!validPassword){
      throw new Error("Invalid Password")
    }

    const refreshToken = this.TokenService.createRefreshToken(foundUser.email,foundUser._id!);
    const accessToken = this.TokenService.createAccessToken(foundUser.email,foundUser._id!);

    return {accessToken,refreshToken,userName:foundUser.fullName};

  }
}
