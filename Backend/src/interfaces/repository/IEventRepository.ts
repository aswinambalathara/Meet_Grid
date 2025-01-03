import IEvent from "../entities/IEvent";
import IRepository from "./IRepository";

export default interface IEventRepository extends IRepository<IEvent> {
  findByCategory(categoryId: string): Promise<IEvent | null>;
  findAll(filters?: Partial<IEvent>): Promise<IEvent[]>;
  find(filters?: Partial<IEvent>): Promise<IEvent | null>;
}
