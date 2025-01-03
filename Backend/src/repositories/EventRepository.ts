import IEvent from "../interfaces/entities/IEvent";
import IEventRepository from "../interfaces/repository/IEventRepository";
import EventModel from "../models/EventModel";

export default class EventRepository implements IEventRepository {
  private model = EventModel;

  async findByCategory(categoryId: string): Promise<IEvent | null> {
    return await this.model.findOne({ category: categoryId });
  }
  async findById(id: string): Promise<IEvent | null> {
    return await this.model.findById(id);
  }
  async findAll(filters?: Partial<IEvent>): Promise<IEvent[]> {
    return await this.model.find({filters});
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
  async find(filters: Partial<IEvent>): Promise<IEvent | null> {
    return await this.model.findOne({filters});
  }
}
