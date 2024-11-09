import { Request, Response, NextFunction } from "express";
import AdminUserService from "../../services/admin/AdminUserService";
import { StatusCode } from "../../types";

export default class AdminController {
  constructor(private adminUserService: AdminUserService) {}

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
      const { id } = req.body;
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
        message: `Patient ${isBlocked ? "Unblocked" : "Blocked"} Successfully`,
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
      const { id, isActivated } = req.body;
    } catch (error) {
      next(error);
    }
  }
}
