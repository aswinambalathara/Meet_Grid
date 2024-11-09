import IUser from "../../interfaces/entities/IUser";
import IUserRepository from "../../interfaces/repository/IUserRepository";
import { StatusCode } from "../../types";
import CustomError from "../../utils/CustomError";
import JoiService from "../../utils/ValidatorService";

export default class AdminUserService {
  constructor(
    private userRepository: IUserRepository,
    private validatorService: JoiService
  ) {}

  async getUsers(offset: number, limit: number,searchTerm?:string): Promise<IUser[]> {
    return await this.userRepository.getPaginatedUsers(offset, limit,searchTerm);
  }

  async toggleUserBlockStatus(id: string, isBlocked: boolean): Promise<IUser> {
    this.validatorService.validateIdFormat(id);
    const updatedUser = await this.userRepository.update(id, {
      isBlocked: !isBlocked,
    });
    if (!updatedUser)
      throw new CustomError(
        "Error while updating | User Not Found",
        StatusCode.NotFound
      );
    return updatedUser;
  }

  async getUser(id: string): Promise<IUser> {
    this.validatorService.validateIdFormat(id);
    const user = await this.userRepository.findById(id);
    if (!user)
      throw new CustomError("User not found with id", StatusCode.NotFound);
    return user;
  }
  
}
