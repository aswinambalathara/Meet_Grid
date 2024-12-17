import { Request, Response, NextFunction } from "express";
import AdminUserService from "../../services/admin/AdminUserService";
import { StatusCode } from "../../types";
import AdminEventCategoryService from "../../services/admin/AdminEventCategoryService";

export default class AdminController {
  constructor(
    private adminUserService: AdminUserService,
    private adminEventCategoryService: AdminEventCategoryService
  ) {}

  async handleGetUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const searchTerm = req.query?.searchTerm as string;
      const offset = +(req.query.offset as string) || 0;
      const limit = +(req.query.limit as string) || 10;

      const users = await this.adminUserService.getUsers(
        offset,
        limit,
        searchTerm
      );
      res.status(StatusCode.Success).json(users);
    } catch (error) {
      next(error);
    }
  }

  async handleGetUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const user = await this.adminUserService.getUser(id);
      res.status(StatusCode.Success).json(user);
    } catch (error) {
      next(error);
    }
  }

  async handleToggleUserBlockStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id, isBlocked } = req.body;
      if (!id.trim() || typeof isBlocked !== "boolean") {
        res
          .status(StatusCode.BadRequest)
          .json({ message: "Id required", status: false });
      }
      await this.adminUserService.toggleUserBlockStatus(id, isBlocked);
      res.status(StatusCode.Success).json({
        message: `User ${isBlocked ? "Unblocked" : "Blocked"} Successfully`,
        status: true,
      });
    } catch (error) {
      next(error);
    }
  }

  async handleToggleUserActivationStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id, isDeactivated } = req.body;
      if (!id || typeof isDeactivated !== "boolean") {
        res.status(StatusCode.BadRequest).json({
          status: false,
          message: "Id required",
        });
      }
      await this.adminUserService.toggleUserActivationStatus(id, isDeactivated);
      res.status(StatusCode.Success).json({
        message: `User ${
          isDeactivated ? "Deactivated" : "Activated"
        } Successfully`,
        status: true,
      });
    } catch (error) {
      next(error);
    }
  }

  async handleCreateEventCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const eventCategoryData = req.body;
      const result = await this.adminEventCategoryService.create(
        eventCategoryData
      );
      res.status(StatusCode.Created).json(result);
    } catch (error) {
      next(error);
    }
  }

  async handleGetEventCategories(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await this.adminEventCategoryService.getAllCategories();
      res.status(StatusCode.Success).json(result);
    } catch (error) {
      next(error);
    }
  }

  async handleDeleteEventCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const {id} = req.params
      const result = await this.adminEventCategoryService.delete(id);
      res.status(StatusCode.Success).json(result);
    } catch (error) {
      next(error);
    }
  }

}
