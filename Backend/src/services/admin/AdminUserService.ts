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

  async getUsers(
    offset: number,
    limit: number,
    searchTerm?: string
  ): Promise<IUser[]> {
    if (searchTerm !== "undefined") {
      return await this.userRepository.getPaginatedUsers(
        offset,
        limit,
        searchTerm
      );
    } else {
      return await this.userRepository.getPaginatedUsers(offset, limit);
    }
  }

  async toggleUserBlockStatus(
    id: string,
    isBlocked: boolean
  ): Promise<{ isBlocked: boolean; message: string }> {
    this.validatorService.validateIdFormat(id);
    const updatedUser = await this.userRepository.update(id, {
      isBlocked: !isBlocked,
    });
    if (!updatedUser)
      throw new CustomError(
        "Error while updating | User Not Found",
        StatusCode.NotFound
      );
    return {
      isBlocked: updatedUser.isBlocked!,
      message: isBlocked ? "User Blocked" : "User Unblocked",
    };
  }

  async getUser(id: string): Promise<IUser> {
    this.validatorService.validateIdFormat(id);
    const user = await this.userRepository.findById(id);
    if (!user)
      throw new CustomError("User not found with id", StatusCode.NotFound);
    return user;
  }

  async toggleUserActivationStatus(
    id: string,
    isDeactivated: boolean
  ): Promise<IUser> {
    this.validatorService.validateIdFormat(id);
    const updatedUser = await this.userRepository.update(id, {
      isDeactivated: !isDeactivated,
    });
    if (!updatedUser)
      throw new CustomError("User not found with Id", StatusCode.NotFound);
    return updatedUser;
  }
}
