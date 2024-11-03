import IJWTService from "../../domain/interfaces/services/IJWTService";
import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config/env";

export default class JWTService implements IJWTService {
  private signToken(
    payload: object,
    secret: string,
    expiresIn: string
  ): string {
    return jwt.sign(payload, secret, { expiresIn });
  }
  private verifyToken(token: string, secret: string): JwtPayload {
    try {
      return jwt.verify(token, secret) as JwtPayload;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new Error("Token Expired");
      }
      throw new Error("Invalid token");
    }
  }
  createAccessToken(email: string, id: string): string {
    return this.signToken({ email, id }, ACCESS_TOKEN_SECRET!, "15m");
  }
  createRefreshToken(email: string, id: string): string {
    return this.signToken({ email, id }, REFRESH_TOKEN_SECRET!, "7d");
  }
  verifyAccessToken(token: string): { email: string; id: string } {
    const { email, id } = this.verifyToken(token, ACCESS_TOKEN_SECRET!);
    return { email, id };
  }
  verifyRefreshToken(token: string): { email: string; id: string } {
    const decoded = this.verifyToken(token, REFRESH_TOKEN_SECRET!);
    return { email: decoded.email, id: decoded.id };
  }
}
