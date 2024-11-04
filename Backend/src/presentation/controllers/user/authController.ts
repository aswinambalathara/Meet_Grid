import { Response, Request, NextFunction } from "express";
import AuthenticationUseCase from "../../../application/user/AuthenticationUseCase";
import { StatusCode } from "../../../types";
import { CLIENT_URL } from "../../../infra/config/env";

export default class AuthUserController {
  constructor(private authUseCase: AuthenticationUseCase) {}

  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const userData = req.body;
      const result = await this.authUseCase.register(userData);
      return res.status(StatusCode.Created).json({
        statusCode: 201,
        message: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async verifyUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { token } = req.params;
      await this.authUseCase.verifyEmail(token);
      return res
        .status(StatusCode.Success)
        .redirect(`${CLIENT_URL}/auth/login`);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async loginUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const credentials = req.body;
      const result = await this.authUseCase.loginUser(credentials);
      return res.status(StatusCode.Success).json({
        message: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async loginOTP(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { email } = req.body;
      const result = await this.authUseCase.sendOTP(email);
      return res.status(StatusCode.Accepted).json({
        email: result.email,
        message: result.message,
      });
    } catch (error) {
      next(error);
    }
  }

  async verifyOTPLogin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { email, otp } = req.body;
      const result = await this.authUseCase.verifyOTPLogin(otp, email);
      return res.status(StatusCode.Success).json({
        message: result,
      });
    } catch (error) {
      next(error);
    }
  }

  
}
