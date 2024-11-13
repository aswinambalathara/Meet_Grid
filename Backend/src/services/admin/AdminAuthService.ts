import IAdmin from "../../interfaces/entities/IAdmin";
import IAdminRepository from "../../interfaces/repository/IAdminRepository";
import IJWTService from "../../interfaces/utilServices/IJWTService";
import { StatusCode, TokenResponse } from "../../types";
import BcryptService from "../../utils/BcryptService";
import CustomError from "../../utils/CustomError";

export default class AdminAuthService {
  constructor(
    private adminRepository: IAdminRepository,
    private jwtService: IJWTService,
    private bcryptService: BcryptService
  ) {}

  async doAdminLogin(admin: IAdmin): Promise<TokenResponse> {
    const { email, password } = admin;
    const foundAdmin = await this.adminRepository.findByEmail(email);
    if (!foundAdmin)
      throw new CustomError("Account not found", StatusCode.NotFound);

    const isAuthorised = foundAdmin.password === password;
    
    if (!isAuthorised)
      throw new CustomError("Invalid credentials", StatusCode.Unauthorized);

    const accessToken = this.jwtService.createAccessToken(
      foundAdmin.email,
      foundAdmin._id!
    );
    const refreshToken = this.jwtService.createRefreshToken(
      foundAdmin.email,
      foundAdmin._id!
    );

    return {
      accessToken,
      refreshToken,
      message: "Login Successfull",
      status: true,
    };
  }

  async refreshAccessToken(token: string): Promise<{ accessToken: string }> {
    const { email } = this.jwtService.verifyRefreshToken(token);
    const admin = await this.adminRepository.findByEmail(email);
    if (!admin) throw new CustomError("Unauthorised", StatusCode.Unauthorized);
    const accessToken = this.jwtService.createAccessToken(email, admin._id!);
    return { accessToken };
  }
}
