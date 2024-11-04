import IAdmin from "../../entities/IAdminEntity";

export default interface IAdminRepository<IAdmin>{
    findByEmail(email:string):Promise<IAdmin | null>;
}