import IAdmin from "../entities/IAdmin";
import IRepository from "./IRepository";

export default interface IAdminRepository{
  findByEmail(email: string): Promise<IAdmin | null>;
}
