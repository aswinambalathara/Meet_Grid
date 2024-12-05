import { FilterQuery } from "mongoose";
import IUser from "../interfaces/entities/IUser";
import IUserRepository from "../interfaces/repository/IUserRepository";
import UserModel from "../models/UserModel";

export default class UserRepository implements IUserRepository {
  private model = UserModel;

  async create(user: IUser): Promise<IUser> {
    const newUser = new this.model(user);
    return await newUser.save();
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await this.model.findOne({ email: email });
  }

  async findAll(): Promise<IUser[]> {
    return await this.model.find();
  }

  async findById(id: string): Promise<IUser | null> {
    return await this.model.findById(id);
  }

  async update(id: string, user: Partial<IUser>): Promise<IUser | null> {
    return await this.model.findByIdAndUpdate(id, user, { new: true });
  }

  async verifyByToken(token: string): Promise<IUser | null> {
    return await this.model.findOne({
      "verificationToken.token": token,
      "verificationToken.expiry": { $gt: Date.now() },
    });
  }

  async getPaginatedUsers(
    offset: number,
    limit: number,
    searchTerm?: string
  ): Promise<IUser[]> {
    const query: FilterQuery<IUser> = {};

    if (searchTerm) {
      const regex = new RegExp(searchTerm, "i");
      query.$or = [
        { fullName: regex },
        { email: regex },
        { phone: regex },
        { "professionalInfo.companyName": regex },
      ];
    }

    return await this.model
      .find(query)
      .skip(offset * limit)
      .limit(limit)
      .select(["-password", "-verificationToken", "-otp"])
      .exec();
  }
}
