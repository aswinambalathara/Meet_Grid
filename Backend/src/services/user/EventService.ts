import { Types } from "mongoose";
import IEvent from "../../interfaces/entities/IEvent";
import IEventRepository from "../../interfaces/repository/IEventRepository";
import { EventFilter, payloadResponse } from "../../types";
import JoiService from "../../utils/validatorService";
import IEventCategoryRepository from "../../interfaces/repository/IEventCategoryRepository";

export default class EventService {
  constructor(
    private eventRepository: IEventRepository,
    private eventCategoryRepository: IEventCategoryRepository,
    private validatorService: JoiService
  ) {}

  async getEventCategories(): Promise<payloadResponse> {
    const eventCategories = await this.eventCategoryRepository.findAll();
    return { status: true, data: eventCategories, message: "Event Categories" };
  }

  async create(userId: string, event: IEvent): Promise<payloadResponse> {
    this.validatorService.validateRequiredFields({
      title: event.title,
      description: event.description,
      category: event.category,
      startDate: event.startDate,
      endDate: event.endDate,
      eventType: event.eventType,
      eventLogo: event.eventLogo,
      eventBanner: event.eventBanner,
      tickets: event.ticket,
    });
    this.validatorService.validateIdFormat(userId);
    event.organizer = new Types.ObjectId(userId);

    const createEvent = await this.eventRepository.create(event);
    return {
      status: true,
      data: createEvent,
      message: "Event Created Successfull",
    };
  }

  async getEvents(filters: EventFilter): Promise<IEvent[]> {
    return await this.eventRepository.findAll(filters);
  }

  //async getEvent(userId: string, eventId: string): Promise<void> {}
}
