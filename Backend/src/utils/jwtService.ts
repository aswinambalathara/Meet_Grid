import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";
import { StatusCode } from "../types";
import CustomError from "./CustomError";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config/env";
import IJWTService from "../interfaces/utilServices/IJWTService";

export default class JWTService implements IJWTService {
  private signToken(
    payLoad: object,
    secret: string,
    expiresIn: string
  ): string {
    return jwt.sign(payLoad, secret, { expiresIn });
  }

  private verifyToken(token: string, secret: string): JwtPayload {
    try {
      return jwt.verify(token, secret) as JwtPayload;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new CustomError("Token Expired", StatusCode.Unauthorized);
      }
      throw new CustomError("Invalid Token", StatusCode.Forbidden);
    }
  }

  createAccessToken(email: string, id: string): string {
    return this.signToken({ email, id }, ACCESS_TOKEN_SECRET!, "20m");
  }
  verifyAccessToken(token: string): { email: string; id: string } {
    const decoded = this.verifyToken(token, ACCESS_TOKEN_SECRET!);
    return { email: decoded.email, id: decoded.id };
  }
  createRefreshToken(email: string, id: string): string {
    return this.signToken({ email, id }, REFRESH_TOKEN_SECRET!, "7d");
  }
  verifyRefreshToken(token: string): { email: string; id: string } {
    const decoded = this.verifyToken(token, ACCESS_TOKEN_SECRET!);
    return { email: decoded.email, id: decoded.id };
  }
}
