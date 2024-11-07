import UserRepository from "../../infra/repositories/UserRepository";
import AdminRepository from "../../infra/repositories/AdminRepository";

export const userRepository = new UserRepository();
export const adminRepository = new AdminRepository();