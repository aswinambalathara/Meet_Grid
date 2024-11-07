import { Request, Response, NextFunction } from "express";
import AdminAuthUseCase from "../../../application/admin/AdminAuthUseCase";
import { StatusCode } from "../../../types";
import { rmSync } from "fs";

export default class AdminAuthController {
  constructor(private adminAuthUsecase: AdminAuthUseCase) {}

  async login(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const admin = req.body;
      const result = await this.adminAuthUsecase.login(admin);
      const {accessToken,refreshToken} = result
      return res.status(StatusCode.Accepted).json({
        
      })
    } catch (error) {
      next(error);
    }
  }
  
}
