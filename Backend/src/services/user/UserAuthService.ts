import IUserRepository from "../../interfaces/repository/IUserRepository";
import IUser from "../../interfaces/entities/IUser";
import IJWTService from "../../interfaces/utilServices/IJWTService";
import BcryptService from "../../utils/BcryptService";
import ValidatorService from "../../utils/ValidatorService";
import EmailService from "../../utils/EmailService";
import CustomError from "../../utils/CustomError";
import { StatusCode, TokenResponse, response } from "../../types";
import CryptoService from "../../utils/CryptoService";
import { SERVER_URL } from "../../config/env";
import generateOTP from "../../utils/OTPService";

export default class UserAuthService {
  constructor(
    private userRepository: IUserRepository,
    private jwtService: IJWTService,
    private bcryptService: BcryptService,
    private validatorService: ValidatorService,
    private emailService: EmailService,
    private tokenService: CryptoService
  ) {}

  async createUser(userData: IUser): Promise<response> {
    this.validatorService.validateRequiredFields({
      email: userData.email,
      password: userData.password,
      name: userData.fullName,
    });
    this.validatorService.validateEmailFormat(userData.email);
    this.validatorService.validatePassword(userData.password);

    const isUserExist = await this.userRepository.findByEmail(userData.email);
    if (isUserExist)
      throw new CustomError(
        "User already exist with email",
        StatusCode.Conflict
      );
    userData.password = await this.bcryptService.hash(userData.password);
    const token = this.tokenService.generateToken();
    const verificationToken = {
      token,
      expiry: new Date(Date.now() + 24 * 60 * 60 * 1000),
    };
    userData.verificationToken = verificationToken;
    const { email, fullName } = await this.userRepository.create(userData);
    await this.emailService.sendMail({
      email,
      name: fullName,
      pathOfTemplate: "../../../public/userVerification.html",
      subject: "Verification Mail",
      link: `${SERVER_URL}/user/auth/verify-user?token=${token}`,
    });
    console.log(`link: ${SERVER_URL}/user/auth/verify-user?token=${token}`);
    return {
      status: true,
      message: `User created verification link has sent to ${email}`,
    };
  }

  async verifyRegisteredUser(token: string): Promise<void> {
    const foundUser = await this.userRepository.verifyByToken(token);
    if (!foundUser)
      throw new CustomError(
        "Invalid or Expired token",
        StatusCode.Unauthorized
      );
    foundUser.isVerified = true;
    await this.userRepository.update(foundUser._id!, foundUser);
  }

  async doUserLogin(email: string, password: string): Promise<TokenResponse> {
    const foundUser = await this.userRepository.findByEmail(email);

    if (!foundUser) {
      throw new CustomError("User not found", StatusCode.NotFound);
    }

    if (foundUser.isBlocked)
      throw new CustomError("User Blocked", StatusCode.Forbidden);

    if (!foundUser.isVerified) {
      const token = this.tokenService.generateToken();

      const verificationToken = {
        token: token,
        expiry: new Date(Date.now() + 24 * 60 * 60 * 1000),
      };

      foundUser.verificationToken = verificationToken;

      await this.userRepository.update(foundUser._id!, foundUser);

      await this.emailService.sendMail({
        email: foundUser.email,
        name: foundUser.fullName,
        pathOfTemplate: "../../../public/userVerification.html",
        subject: "Verification Mail",
        link: `${SERVER_URL}/user/auth/verify-user?token=${token}`,
      });

      throw new CustomError(
        `User not verified. Verification email sent to ${foundUser.email}.`,
        StatusCode.Forbidden
      );
    }
    const isAuthorised = await this.bcryptService.compare(
      password,
      foundUser.password
    );
    if (!isAuthorised)
      throw new CustomError("Invalid Credentials", StatusCode.Unauthorized);

    const accessToken = this.jwtService.createAccessToken(
      foundUser.email,
      foundUser._id!
    );
    const refreshToken = this.jwtService.createRefreshToken(
      foundUser.email,
      foundUser._id!
    );

    return {
      accessToken,
      refreshToken,
      message: "Login Successfull",
      status: true,
    };
  }

  //   async doOAuthLogin(
  //     email: string,
  //     name: string,
  //     profile?: string
  //   ): Promise<void> {}

  async sendUserOTPLogin(email: string): Promise<response> {
    this.validatorService.validateEmailFormat(email);

    const foundUser = await this.userRepository.findByEmail(email);
    if (!foundUser)
      throw new CustomError("User not found", StatusCode.NotFound);

    if (foundUser.isBlocked)
      throw new CustomError("User Blocked", StatusCode.Forbidden);

    if (!foundUser.isVerified) {
      const token = this.tokenService.generateToken();

      const verificationToken = {
        token: token,
        expiry: new Date(Date.now() + 24 * 60 * 60 * 1000),
      };

      foundUser.verificationToken = verificationToken;

      await this.userRepository.update(foundUser._id!, foundUser);

      await this.emailService.sendMail({
        email: foundUser.email,
        name: foundUser.fullName,
        pathOfTemplate: "../../../public/userVerification.html",
        subject: "Verification Mail",
        link: `${SERVER_URL}/user/auth/verify-user?token=${token}`,
      });

      throw new CustomError(
        `User not verified. Verification email sent to ${foundUser.email}.`,
        StatusCode.Forbidden
      );
    }

    const OTP = generateOTP();
    const otp = {
      otp: OTP,
      expiry: new Date(Date.now() + 10 * 60 * 1000),
    };
    foundUser.otp = otp;

    await this.userRepository.update(foundUser._id!, foundUser);

    await this.emailService.sendMail({
      email: foundUser.email,
      name: foundUser.fullName,
      pathOfTemplate: "../../../public/otpVerification.html",
      subject: "OTP Authentication Mail",
      otp: OTP,
    });
    return { message: `OTP sent to ${foundUser.email}`, status: true };
  }

  async validateUserOTPLogin(email: string, otp: number): Promise<TokenResponse> {
    const query = {email,otp:{otp:otp,expiry:}}
    const validate = await this.userRepository.findUser(query)
  }

  //   async requestForgotPasswordReset(email: string): Promise<void> {}

  //   async validateResetToken(token: string): Promise<void> {}

  //   async updateForgotPassword(email: string, password: string): Promise<void> {}

  //   async refreshAccessToken(token: string): Promise<void> {}
}
