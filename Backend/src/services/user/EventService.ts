import { Types } from "mongoose";
import IEvent from "../../interfaces/entities/IEvent";
import IEventRepository from "../../interfaces/repository/IEventRepository";
import { EventFilter, payloadResponse, StatusCode } from "../../types";
import JoiService from "../../utils/validatorService";
import IEventCategoryRepository from "../../interfaces/repository/IEventCategoryRepository";
import CustomError from "../../utils/CustomError";

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
    console.log(event);
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

    if (event.eventType === "In-Person") {
      this.validatorService.validateRequiredFields({
        venueName: event.location?.venueName,
        streetAddress: event.location?.streetAddress,
        city: event.location?.city,
        state: event.location?.state,
        country: event.location?.country,
        pincode: event.location?.pincode,
        coordinates: event.location?.coordinates,
        googleMapLink: event.location?.googleMapLink,
      });
    }

    if (event.eventType === "Online") {
      this.validatorService.validateRequiredFields({
        virtualPlatform: event.virtualDetails?.virtualPlatform,
        meetLink: event.virtualDetails?.meetLink,
        timeZone: event.virtualDetails?.timeZone,
      });
    }

    this.validatorService.validateIdFormat(userId);
    const isExist = await this.eventRepository.find({ title: event.title });
    if (isExist && isExist.organizer === new Types.ObjectId(userId)) {
      throw new CustomError(
        "Event Already Exist with same name",
        StatusCode.Conflict
      );
    }

    event.organizer = new Types.ObjectId(userId);
    const createEvent = await this.eventRepository.create(event);

    return {
      status: true,
      data: createEvent,
      message: "Event Created Successfull",
    };
  }

  async getEvents(filters: EventFilter): Promise<payloadResponse> {
    const result = await this.eventRepository.findEvents({
      ...filters,
      maxDistance: filters.maxDistance && Number(filters.maxDistance * 1000),
    });
    return { status: true, data: result, message: "Events" };
  }

  async getEvent(eventId: string): Promise<payloadResponse> {
    const result = await this.eventRepository.findById(eventId)
    console.log(result)
    return { data: result!, message: "Event", status: true };
  }
}
