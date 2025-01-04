import { IEventCategory } from "../entities/IEvent";

export default interface IEventCategoryRepository {
  create(eventCategory: IEventCategory): Promise<IEventCategory>;
  findAll(): Promise<IEventCategory[]>;
  findById(eventId: string): Promise<IEventCategory | null>;
  update(eventId: string,eventCategory:Partial<IEventCategory>): Promise<IEventCategory | null>;
  delete(eventId: string): Promise<void>;
  findByName(categoryName:string):Promise<IEventCategory | null>
}
