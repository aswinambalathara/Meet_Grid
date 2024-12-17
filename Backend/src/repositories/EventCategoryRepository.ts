import { IEventCategory } from "../interfaces/entities/IEvent";
import IEventCategoryRepository from "../interfaces/repository/IEventCategoryRepository";
import EventCategoryModel from "../models/EventCategoryModel";

export default class EventCategoryRepository
  implements IEventCategoryRepository
{
  private model = EventCategoryModel;

  async create(eventCategory: IEventCategory): Promise<IEventCategory> {
    const newEventCategory = new this.model(eventCategory);
    return await newEventCategory.save();
  }

  async findByName(categoryName: string): Promise<IEventCategory | null> {
    return await this.model.findOne({ categoryName: categoryName });
  }

  async findById(eventId: string): Promise<IEventCategory | null> {
    return await this.model.findById(eventId);
  }

  async findAll(): Promise<IEventCategory[]> {
    return await this.model.find();
  }

  async update(
    eventId: string,
    eventCategory: Partial<IEventCategory>
  ): Promise<IEventCategory | null> {
    return await this.model.findByIdAndUpdate(eventId, eventCategory,{new:true});
  }

  async delete(categoryId: string): Promise<void> {
     await this.model.findByIdAndDelete(categoryId);
  }
}
