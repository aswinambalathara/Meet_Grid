import ITicket from "../entities/ITicket";
import IRepository from "./IRepository";

export default interface ITicketRepository extends IRepository<ITicket>{
    findById(id: string): Promise<ITicket | null>;
    findAll?(): Promise<ITicket[]>;
    create(entity: ITicket): Promise<ITicket>;
    update(id: string, entity: Partial<ITicket>): Promise<ITicket | null>;
}