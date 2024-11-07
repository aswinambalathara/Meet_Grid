import IUser from "../../domain/entities/IUserEntity";
import IUserRepository from "../../domain/interfaces/repositories/IUserRepository";
import IPasswordService from "../../domain/interfaces/services/IBcryptService";
import ITokenService from "../../domain/interfaces/services/ICryptoService";
import IEmailService from "../../domain/interfaces/services/IMailService";
import IValidationService from "../../domain/interfaces/services/IValidationService";
import {
  NotFoundError,
  ValidationError,
  ConflictError,
  ForbiddenError,
  UnauthorizedError,
} from "../errors/errors";
import { SERVER_URL, CLIENT_URL } from "../../../config/env";
import IJWTService from "../../domain/interfaces/services/IJWTService";


type LoginResponse = {
  userName: string;
  accessToken: string;
  refreshToken: string;
  status: boolean,
  message:string
};

type response = {
  status: boolean,
  message:string
}

export default class AuthenticationUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordService: IPasswordService,
    private cryptoService: ITokenService,
    private TokenService: IJWTService, 
    private mailService: IEmailService,
    private validatorService: IValidationService
  ) {}
  async register(user: IUser): Promise<response> {
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
      throw new ConflictError("User already exist with this mail");
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
    console.log(`${SERVER_URL}/verify_email/${token}`)
    return {status:true,message:`User created, verification link send to email${user.email}`}
  }

  async verifyEmail(token: string): Promise<string> {
    const user = await this.userRepository.verifyByToken(token);

    if (!user) {
      throw new UnauthorizedError("Invalid or Expired token");
    }
    user.isVerified = true;
    await this.userRepository.update(user._id!, user);
    return `User verified`;
  }

  async loginUser(user: IUser): Promise<LoginResponse> {
    const { email, password } = user;
    const foundUser = await this.userRepository.findByEmail(email);

    if (!foundUser) {
      throw new NotFoundError("User not found with email");
    }
    if (foundUser.isBlocked) {
      throw new ForbiddenError("User blocked");
    }

    if (!foundUser.isVerified) {
      const token = this.cryptoService.generateToken();
      const verificationToken = {
        token: token,
        expiry: new Date(Date.now() + 24 * 60 * 60 * 1000),
      };
      foundUser.verificationToken = verificationToken;
      await this.userRepository.update(foundUser._id!,user)
      await this.mailService.sendMail({
        email:foundUser.email,
        name: foundUser.fullName,
        pathOfTemplate: "../../../public/userVerification.html",
        subject: "Verification Mail",
        link: `${SERVER_URL}/verify_email/${token}`,
      });
      throw new ForbiddenError(`User not verified, OTP sent to ${foundUser.email}`);
    }

    const validPassword = await this.passwordService.compare(
      password,
      foundUser.password
    );

    if (!validPassword) {
      throw new UnauthorizedError("Invalid Password");
    }

    const refreshToken = this.TokenService.createRefreshToken(
      foundUser.email,
      foundUser._id!
    );
    const accessToken = this.TokenService.createAccessToken(
      foundUser.email,
      foundUser._id!
    );

    return { accessToken, refreshToken, userName: foundUser.fullName, status:true, message:"Login Successfull" };
  }

  async sendOTP(email: string): Promise<{ email: string; message: string }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    if (user.isBlocked) {
      throw new ForbiddenError("User Blocked");
    }

    if (!user.isVerified) {
      const token = this.cryptoService.generateToken();
      const verificationToken = {
        token: token,
        expiry: new Date(Date.now() + 24 * 60 * 60 * 1000),
      };
      user.verificationToken = verificationToken;
      await this.userRepository.update(user._id!,user)
      await this.mailService.sendMail({
        email:user.email,
        name: user.fullName,
        pathOfTemplate: "../../../public/userVerification.html",
        subject: "Verification Mail",
        link: `${SERVER_URL}/verify_email/${token}`,
      });
      throw new ForbiddenError(`User not verified, OTP send to ${user.email}`);
    }

    const OTP = this.generateOTP();
    const otp = {
      otp: OTP,
      expiry: new Date(Date.now() + 10 * 60 * 1000),
    };
    user.otp = otp;
    await this.userRepository.update(user._id!, user);
    await this.mailService.sendMail({
      email,
      name: user.fullName,
      pathOfTemplate: "../../../public/otpVerification.html",
      subject: "OTP Authentication Mail",
      otp: OTP,
    });
    return { email: email, message: `OTP send to ${email}` };
  }

  private async verifyOTP(email: string, otp: number): Promise<IUser> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundError("Invalid email or User not found");
    }
    if (user.otp?.otp !== Number(otp) || Number(user.otp.expiry) < Date.now()) {
      throw new UnauthorizedError("Invalid OTP or OTP expired");
    }
    return user;
  }

  async verifyOTPLogin(otp: string, email: string): Promise<LoginResponse> {
    const user = await this.verifyOTP(email, Number(otp));
    if (user.isBlocked) {
      throw new ForbiddenError("User blocked");
    }
    const refreshToken = this.TokenService.createRefreshToken(
      user.email,
      user._id!
    );
    const accessToken = this.TokenService.createAccessToken(
      user.email,
      user._id!
    );
    return { refreshToken, accessToken, userName: user.fullName , status:true, message:"Login successfull"};
  }

  async forgotPassword(email:string):Promise<{resetToken:string,message:string}>{
    
     this.validatorService.validateEmailFormat(email);
    
    const foundUser = await this.userRepository.findByEmail(email);
    if(!foundUser){
      throw new NotFoundError("User not found");
    }

    if(foundUser.isBlocked){
      throw new Error('User blocked');
    }

    const resetToken = this.cryptoService.generateToken();
    foundUser.verificationToken = {
      token:resetToken,
      expiry:new Date(Date.now() + 10 * 60 * 1000)
    }
    await this.userRepository.update(foundUser._id!,foundUser);
    
    await this.mailService.sendMail({
      email:foundUser.email,
      name:foundUser.fullName,
      subject:"Reset Password",
      pathOfTemplate:"../../../public/resetPassword.html",
      link:`${CLIENT_URL}/forgot_password/reset?token=${resetToken}`
    })
    return {resetToken:resetToken,message:"Reset password email sent"}
  }

  async validateResetToken (token:string):Promise<response>{
    const result = await this.userRepository.verifyByToken(token);
    if (!result) {
      throw new UnauthorizedError("Invalid or Expired token");
    }
    return {status:true,message:"Token valid"}
  }

  async changeForgotPassword (email:string,password:string):Promise<response>{
    const foundUser = await this.userRepository.findByEmail(email);
    if(!foundUser){
      throw new NotFoundError("User not found")
    }
    foundUser.password = await this.passwordService.hash(password);
    await this.userRepository.update(foundUser._id!,foundUser);
    return {status:true,message:"Password Changed successfully"}
  }
  
  private generateOTP(length: number = 6): number {
    let otp = "";
    const digits = "0123456789";

    for (let i = 0; i < length; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }

    return Number(otp);
  }
}
