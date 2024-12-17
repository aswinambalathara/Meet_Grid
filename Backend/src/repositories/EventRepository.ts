import IEvent from "../interfaces/entities/IEvent";
import IEventRepository from "../interfaces/repository/IEventRepository";
import EventModel from "../models/EventModel";
import { EventFilter } from "../types";

export default class EventRepository implements IEventRepository {
  private model = EventModel;

  async findByCategory(categoryId: string): Promise<IEvent | null> {
    return await this.model.findOne({ category: categoryId });
  }
  async findById(id: string): Promise<IEvent | null> {
    return await this.model.findById(id);
  }
  async findAll(filters: EventFilter): Promise<IEvent[]> {
    const query: Record<string, unknown> = {};
    if (filters?.category) query.category = filters.category;
    if (filters?.coordinates) query.location = { $in: filters.coordinates };
    
    return await this.model.find(query);
  }
  async create(event: IEvent): Promise<IEvent> {
    const newEvent = new this.model(event);
    return await newEvent.save();
  }
  async update(id: string, event: Partial<IEvent>): Promise<IEvent | null> {
    return await this.model.findByIdAndUpdate(id, event, { new: true });
  }
  async delete?(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id);
  }
}
