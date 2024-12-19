import IUserRepository from "../../interfaces/repository/IUserRepository";
import IUser from "../../interfaces/entities/IUser";
import BcryptService from "../../utils/bcryptService";
import JoiService from "../../utils/validatorService";
import EmailService from "../../utils/emailService";
import CustomError from "../../utils/CustomError";
import {
  StatusCode,
  payloadResponse,
  professionalInfoProps,
  response,
} from "../../types";
import generateOTP from "../../utils/OTPService";

export default class UserService {
  constructor(
    private userRepository: IUserRepository,
    private validatorService: JoiService,
    private bcryptService: BcryptService,
    private emailService: EmailService
  ) {}

  async getProfile(userId: string): Promise<payloadResponse> {
    this.validatorService.validateIdFormat(userId);
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new CustomError("User not found", StatusCode.NotFound);
    }
    return {data:user,status:true,message:"Found User"};
  }

  async updateBasicDetails(
    userId: string,
    user: Partial<IUser>
  ): Promise<response> {
    this.validatorService.validateIdFormat(userId);
    const foundUser = await this.userRepository.findById(userId);
    if (!foundUser) {
      throw new CustomError("User not found", StatusCode.NotFound);
    }
    this.validatorService.validateRequiredFields({
      email: user.email,
      phone: user.phone,
      location: user.location,
    });
    this.validatorService.validateEmailFormat(user.email!);
    this.validatorService.validatePhoneNumber(user.phone!);
    await this.userRepository.update(userId, user);
    return { status: true, message: "User Basic Details Updated" };
  }

  async updateProfessionalDetails(
    userId: string,
    user: professionalInfoProps
  ): Promise<payloadResponse> {
    this.validatorService.validateIdFormat(userId);
    const foundUser = await this.userRepository.findById(userId);
    if (!foundUser) {
      throw new CustomError("User not found", StatusCode.NotFound);
    }
    this.validatorService.validateRequiredFields({
      companyName: user.companyName,
      jobTitle: user.jobTitle,
      linkedinUrl: user.linkedinUrl,
      skills: user.skills,
    });
    foundUser.professionalInfo = { ...foundUser.professionalInfo, ...user };
    await this.userRepository.update(userId, foundUser);
    return {
      status: true,
      message: "Professional detail Updated",
      data: foundUser.professionalInfo,
    };
  }

  async sendEmailVerification(
    userId: string,
    email: string
  ): Promise<response> {
    this.validatorService.validateIdFormat(userId);
    this.validatorService.validateEmailFormat(email);
    const isEmailExist = await this.userRepository.findByEmail(email);
    if (isEmailExist) {
      throw new CustomError(
        "Email already exist with another account",
        StatusCode.Conflict
      );
    }
    const foundUser = await this.userRepository.findById(userId);
    if (!foundUser) {
      throw new CustomError("User not found", StatusCode.NotFound);
    }
    const otp = {
      otp: generateOTP(6),
      expiry: new Date(Date.now() + 24 * 60 * 60 * 1000),
    };

    await this.emailService.sendMail({
      email: email,
      name: foundUser.fullName,
      pathOfTemplate: "/otpVerification.html",
      subject: `Email OTP Verification [${foundUser.fullName}]`,
      otp: otp.otp,
    });
    foundUser.isVerified = false;
    foundUser.email = email;
    foundUser.otp = otp;

    await foundUser.save();
    return { status: true, message: `Verification Mail sent to ${email}` };
  }

  async verifyNewEmail(otpInput: number, userId: string): Promise<response> {
    this.validatorService.validateLength(String(otpInput), 6);
    const foundUser = await this.userRepository.findById(userId);
    if (!foundUser) {
      throw new CustomError("User not found", StatusCode.NotFound);
    }
    const { otp } = foundUser;
    if (otp?.otp !== otpInput || otp.expiry < new Date(Date.now())) {
      throw new CustomError(
        "Invalid OTP or OTP expired",
        StatusCode.BadRequest
      );
    }
    foundUser.isVerified = true;
    await foundUser.save();
    return { status: true, message: "Email verified" };
  }

  async changePassword(
    userId: string,
    newPassword: string,
    currentPassword?: string,
    otpInput?: number
  ): Promise<response> {
    this.validatorService.validateIdFormat(userId);
    const foundUser = await this.userRepository.findById(userId);
    if (!foundUser) {
      throw new CustomError("User not found", StatusCode.NotFound);
    }

    if (!currentPassword && !otpInput) {
      throw new CustomError(
        "Either current password or OTP must be provided",
        StatusCode.BadRequest
      );
    }

    if (currentPassword) {
      const isPasswordValid = await this.bcryptService.compare(
        currentPassword,
        foundUser.password
      );
      if (!isPasswordValid) {
        throw new CustomError(
          "Wrong Current Password",
          StatusCode.Unauthorized
        );
      }
    } else if (otpInput) {
      const { otp } = foundUser;
      if (otp?.otp !== otpInput || otp.expiry < new Date(Date.now())) {
        throw new CustomError(
          "Invalid OTP or OTP expired",
          StatusCode.BadRequest
        );
      }
    }
    foundUser.password = await this.bcryptService.hash(newPassword);
    await foundUser.save();
    return { status: true, message: "Password changed successfully" };
  }

  async sendPasswordChangeOTP(userId: string): Promise<response> {
    const foundUser = await this.userRepository.findById(userId);
    if (!foundUser) {
      throw new CustomError("User not found", StatusCode.NotFound);
    }
    const otp = {
      otp: generateOTP(6),
      expiry: new Date(Date.now() + 15 * 60 * 1000),
    };
    await this.emailService.sendMail({
      email: foundUser.email,
      name: foundUser.fullName,
      pathOfTemplate: "/otpVerification.html",
      subject: "User Verification",
      otp: otp.otp,
    });
    foundUser.otp = otp;
    await foundUser.save();
    return {
      status: true,
      message: `OTP verification mail sent to ${foundUser.email}`,
    };
  }

  async deactivateAccount(userId: string, password: string): Promise<response> {
    this.validatorService.validatePassword(password);
    const foundUser = await this.userRepository.findById(userId);
    if (!foundUser) {
      throw new CustomError("User not found", StatusCode.NotFound);
    }
    const isPasswordValid = await this.bcryptService.compare(
      password,
      foundUser.password
    );
    if (!isPasswordValid) {
      throw new CustomError("Invalid Password", StatusCode.Unauthorized);
    }

    foundUser.isDeactivated = true;
    await foundUser.save();
    return { status: true, message: "Account Deactivated Successfully" };
  }

  //   async uploadImage(userId:string,image:string):Promise<void>{

  //   }
}
