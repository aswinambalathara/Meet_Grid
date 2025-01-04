import { EventFilter } from "../../types";
import IEvent from "../entities/IEvent";
import IRepository from "./IRepository";

export default interface IEventRepository extends IRepository<IEvent> {
  findByCategory(categoryId: string): Promise<IEvent | null>;
  findAll(): Promise<IEvent[]>;
  findEvents(filters:EventFilter):Promise<IEvent[]>;
  find(filters?: Partial<IEvent>): Promise<IEvent | null>;
}
