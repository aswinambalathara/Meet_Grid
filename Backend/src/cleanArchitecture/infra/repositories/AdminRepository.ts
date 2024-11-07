import IAdmin from "../../domain/entities/IAdminEntity";
import IAdminRepository from "../../domain/interfaces/repositories/IAdminRepository";
import adminModel from "../models/adminModel";

export default class AdminRepository implements IAdminRepository<IAdmin> {
  model = adminModel;
  async findByEmail(email: string): Promise<IAdmin | null> {
    try {
      return await this.model.findOne({ email: email });
    } catch (error) {
      throw error
    }
  }
}
