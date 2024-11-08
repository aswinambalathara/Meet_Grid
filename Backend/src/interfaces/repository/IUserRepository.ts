import IRepository from "./IRepository";
import IUser from "../entities/IUser";

export default interface IUserRepository extends IRepository<IUser>{
    findByEmail(email:string):Promise<IUser | null>;
    verifyByToken(token:string):Promise<IUser | null>;
} 