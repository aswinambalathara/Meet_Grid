import IAdminRepository from "../interfaces/repository/IAdminRepository";
import IAdmin from "../interfaces/entities/IAdmin";
import AdminModel from "../models/AdminModel";

export default class AdminRepository implements IAdminRepository {
  private model = AdminModel;

  async findByEmail(email: string): Promise<IAdmin | null> {
    try {
      return await this.model.findOne({ email: email });
    } catch (error) {
      throw error;
    }
  }
}
