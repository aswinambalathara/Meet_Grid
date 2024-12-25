import EventService from "../../services/user/EventService";
import { Response, NextFunction } from "express";
import { CustomRequest, StatusCode } from "../../types/index";

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
}
