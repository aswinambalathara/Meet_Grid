import IUser from "../../entities/IUserEntity";
import IRepository from "./IRepository";

export default interface IUserRepository extends IRepository<IUser>{
    findByEmail(email:string):Promise<IUser | null>;
}