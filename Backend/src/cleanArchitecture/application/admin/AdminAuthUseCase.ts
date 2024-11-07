import IAdminRepository from "../../domain/interfaces/repositories/IAdminRepository";
import IAdmin from "../../domain/entities/IAdminEntity";
import {
  ApplicationError,
  ConflictError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from "../errors/errors";
import IJWTService from "../../domain/interfaces/services/IJWTService";

export default class AdminAuthUseCase {
  constructor(
    private adminRepository: IAdminRepository<IAdmin>,
    private tokenService: IJWTService
  ) {}

  async login(admin: IAdmin): Promise<{refreshToken:string,accessToken:string}> {
    const { email, password } = admin;
    const foundAdmin = await this.adminRepository.findByEmail(email);
    if (!foundAdmin) {
      throw new NotFoundError("Admin not found");
    }

    if (foundAdmin.password !== password) {
      throw new UnauthorizedError("Invalid Credentials");
    }

    const refreshToken =  this.tokenService.createRefreshToken(foundAdmin.email,foundAdmin._id!);
    const accessToken = this.tokenService.createAccessToken(foundAdmin.email,foundAdmin._id!);
    return {refreshToken,accessToken}
  }

  async refreshAccessToken(token:string):Promise<{accessToken:string}>{

    return {accessToken:''}
  }
}
