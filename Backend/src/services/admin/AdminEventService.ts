import IEventRepository from "../../interfaces/repository/IEventRepository";
import { payloadResponse, response, StatusCode } from "../../types";
import CustomError from "../../utils/CustomError";

export default class AdminEventService {
  constructor(private eventRepository: IEventRepository) {}

  async getEvents(): Promise<payloadResponse> {
    const events = await this.eventRepository.findAll();
    return { data: events, status: true, message: "All Events" };
  }

  async changeEventStatus(
    isApproved: boolean,
    eventId: string,
    message?:string
  ): Promise<response> {
    const event = await this.eventRepository.findById(eventId);
    if (!event) {
      throw new CustomError("Event not found", StatusCode.NotFound);
    }

    if (isApproved) {
      event.eventStatus.status = "Active";
    } else {
      event.eventStatus = {status:'Rejected',message:message}
    }

    await event.save();
    return {
      message: `Event ${isApproved ? "Approved" : "Reject"}`,
      status: true,
    };
  }
}
