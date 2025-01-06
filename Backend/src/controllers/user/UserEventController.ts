import EventService from "../../services/user/EventService";
import { Response, NextFunction } from "express";
import { CustomRequest, EventFilter, StatusCode } from "../../types/index";

export default class UserEventController {
  constructor(private eventService: EventService) {}

  async createEvent(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.user!;
      const result = await this.eventService.create(id, req.body);
      res.status(StatusCode.Success).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getEventCategories(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await this.eventService.getEventCategories();
      res.status(StatusCode.Success).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getEvents(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const filters = req.query as unknown as EventFilter;
      const result = await this.eventService.getEvents(filters);
      res.status(StatusCode.Success).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getEvent(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const result = await this.eventService.getEvent(id);
      res.status(StatusCode.Success).json(result);
    } catch (error) {
      next(error);
    }
  }
}
