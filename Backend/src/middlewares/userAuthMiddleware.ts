import { NextFunction, Response } from "express";
import { StatusCode } from "../types";
import IJWTService from "../interfaces/utilServices/IJWTService";
import { CustomRequest } from "../types";

export default class UserAuthMiddleware {
  constructor(private tokenService: IJWTService) {
    this.exec = this.exec.bind(this);
  }

  exec(req: CustomRequest, res: Response, next: NextFunction): void {
    try {
      const authHeader = req.headers.authorization as string | undefined;
      const token = authHeader?.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : null;
      if (!token) {
        res.status(StatusCode.Unauthorized).json({
          message: "Unauthorized: No or Invalid Access token provided",
        });
        return;
      }

      const payload = this.tokenService.verifyAccessToken(token);
      if (!payload?.id || !payload?.email) {
        res.status(StatusCode.Unauthorized).json({
          message: "Unauthorized: Invalid Access Token",
        });
        return;
      }

      req.user = { email: payload.email, id: payload.id };
      next();
    } catch (error) {
      if (error instanceof Error && error.message === "Token Expired") {
        res.status(StatusCode.Unauthorized).json({
          message: "Access token expired",
        });
        return;
      }
      console.error("Unexpected error in AdminAuthMiddleware", error);
      res.status(StatusCode.Unauthorized).json({
        message: "Unauthorized: Invalid Access token",
      });
    }
  }
}
