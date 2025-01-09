import ITicket from "../interfaces/entities/ITicket";
import ITicketRepository from "../interfaces/repository/ITicketRepository";
import TicketModel from "../models/TicketModel";

export default class TicketRepository implements ITicketRepository {
  private model = TicketModel;
  async findById(id: string): Promise<ITicket | null> {
    return await this.model.findById(id);
  }
  async findAll?(): Promise<ITicket[]> {
    return await this.model.find();
  }
  async create(entity: ITicket): Promise<ITicket> {
    return await this.model.create(entity);
  }
  async update(id: string, entity: Partial<ITicket>): Promise<ITicket | null> {
    return await this.model.findByIdAndUpdate(id, entity, { new: true });
  }
}
