import IEvent from "../../interfaces/entities/IEvent";
import IEventRepository from "../../interfaces/repository/IEventRepository";
import { EventFilter } from "../../types";
import JoiService from "../../utils/validatorService";

export default class EventService {
  constructor(
    private eventRepository: IEventRepository,
    private validatorService: JoiService
  ) {}

  async create(event:IEvent):Promise<void>{
    this.validatorService.validateRequiredFields({
      title:event.title,
      description:event.description,
      category:event.category,
      date:event.date,
      eventTime:event.eventTime,
      eventType:event.eventType
    })
  }

  async getEvents(filters:EventFilter):Promise<IEvent[]>{
    return await this.eventRepository.findAll(filters)
  }
}
