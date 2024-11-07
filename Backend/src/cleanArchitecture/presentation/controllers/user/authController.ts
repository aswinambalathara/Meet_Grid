import { Response, Request, NextFunction } from "express";
import AuthenticationUseCase from "../../../application/user/AuthenticationUseCase";
import { StatusCode } from "../../../types";
import { CLIENT_URL } from "../../../../config/env";

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
      return res.status(StatusCode.Created).json(result)
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
      const {accessToken,refreshToken,status,message,userName} = result
      return res.status(StatusCode.Success).json({
        accessToken,status,message,userName
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
      const {accessToken,message,refreshToken,status,userName} = result
      return res.status(StatusCode.Success).json({
        accessToken,message,status,userName
      });
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { email } = req.body;
      const result = await this.authUseCase.forgotPassword(email);
      return res.status(StatusCode.Success).json(result);
    } catch (error) {
      next(error);
    }
  }

  async validateResetToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const token = req.body;
      const result = await this.authUseCase.validateResetToken(token);
      return res.status(StatusCode.Success).json(result);
    } catch (error) {
      next(error);
    }
  }

  async changeForgotPassword(req:Request,res:Response,next:NextFunction):Promise<any>{
    try {
      const {email,password} = req.body
      const result = await this.authUseCase.changeForgotPassword(email,password);
      return res.status(StatusCode.Accepted).json(result)
    } catch (error) {
      next(error)
    }
  }
}
