import { NextFunction, Response } from "express";
import { StatusCode } from "../types";
import IJWTService from "../interfaces/utilServices/IJWTService";
import { CustomRequest } from "../types";
import IUserRepository from "../interfaces/repository/IUserRepository";
import { redisClient } from "../config/configRedis";

export default class UserAuthMiddleware {
  constructor(
    private tokenService: IJWTService,
    private userRepository: IUserRepository
  ) {
    this.exec = this.exec.bind(this);
  }

  async exec(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
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

      const userSession = await redisClient.get(`user:${payload.id}`);

      if (userSession) {
        const sessionData = JSON.parse(userSession);
        console.log('redis hit')
        if (sessionData.isBlocked) {
          res
            .status(StatusCode.Forbidden)
            .json({ message: "User is blocked", isBlocked: true });
          return;
        }

        req.user = { email: payload.email, id: payload.id };
        next();
        return
      }

      console.log('database hit')
      const user = await this.userRepository.findById(payload.id);
      if (!user) {
        res.status(StatusCode.NotFound).json({ message: "User not found" });
        return;
      }

      const sessionData = {
        id: user?._id,
        email: user?.email,
        isBlocked: user?.isBlocked,
      };

      await redisClient.set(`user:${user?.id}`, JSON.stringify(sessionData));

      if (user?.isBlocked) {
        res
          .status(StatusCode.Forbidden)
          .json({ message: "User is blocked", isBlocked: true });
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
