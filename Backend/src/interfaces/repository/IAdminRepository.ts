import IAdmin from "../entities/IAdmin";

export default interface IAdminRepository{
  findByEmail(email: string): Promise<IAdmin | null>;
}
