import { NextFunction, Response } from "express";
import { StatusCode } from "../types";
import IJWTService from "../interfaces/utilServices/IJWTService";
//import { errorLogger } from "../utils/logger";
import { CustomRequest } from "../types";

export default class AdminAuthMiddleware {
  constructor(private tokenService: IJWTService) {
    this.exec = this.exec.bind(this);
  }

  exec(req: CustomRequest, res: Response, next: NextFunction): void {
    try {
      const authHeader = req.headers.authorization || req.headers.Authorization;
      const tokenString = Array.isArray(authHeader)
        ? authHeader[0]
        : authHeader;
      if (!tokenString?.startsWith("Bearer ")) {
        res.status(StatusCode.Unauthorized).json({
          message: "Unauthorized: No or invalid Access token provided",
        });
        return;
      }
      const token = tokenString?.split(" ")[1];
      if (!token) {
        res
          .status(StatusCode.Unauthorized)
          .json({ message: "Unauthorized: Access Token is missing" });
        return;
      }
      const { id, email } = this.tokenService.verifyAccessToken(token!);
      if (!id || !email) {
        res
          .status(StatusCode.Unauthorized)
          .json({ message: "Unauthorized: Invalid Access Token" });
        return;
      }

      req.admin = { email, id };
      next();
    } catch (error) {
      if (error instanceof Error && error.message === "Token Expired") {
        res
          .status(StatusCode.Unauthorized)
          .json({ message: "Access token expired" });
        return;
      }
      res
        .status(StatusCode.Unauthorized)
        .json({ message: "Unauthorized: Invalid Access token" });
      return;
    }
  }
}
