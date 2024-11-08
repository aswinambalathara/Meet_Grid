import { Response, Request, NextFunction } from 'express';
import { StatusCode } from '../../types/index';
import { CLIENT_URL } from '../../config/env';
import UserAuthService from '../../services/user/UserAuthService';


export default class AuthUserController {
  
  constructor(private userAuthService: UserAuthService) {
    this.userAuthService = userAuthService;
  }

  async handleUserSignUp(
    req: Request, 
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const userData = req.body;
      const result = await this.userAuthService.createUser(userData);
      return res.status(StatusCode.Created).json(result);
    } catch (error) {
      next(error);
    }
  }

  async handleUserVerification( 
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { token } = req.params;
      await this.userAuthService.verifyRegisteredUser(token);
      return res
        .status(StatusCode.Success)
        .redirect(`${CLIENT_URL}/auth/login`);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async handleUserLogin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const {email,password} = req.body;
      const result = await this.userAuthService.doUserLogin(email,password);
      // const { accessToken, refreshToken, status, message, userName } = result;
      return res.status(StatusCode.Success).json({
        // accessToken,
        // status,
        // message,
        // userName,
      });
    } catch (error) {
      next(error);
    }
  }

  async handleOTPLogin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { email } = req.body;
      const result = await this.userAuthService.sendUserOTPLogin(email);

      return res.status(StatusCode.Accepted).json({
        // email: result.email,
        // message: result.message,
      });
    } catch (error) {
      next(error);
    }
  }

  async validateOTPLogin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { email, otp } = req.body;
      const result = await this.userAuthService.validateUserOTPLogin(otp, email);
      // const { accessToken, message, refreshToken, status, userName } = result;
      return res.status(StatusCode.Success).json({
        // accessToken,
        // message,
        // status,
        // userName,
      });
    } catch (error) {
      next(error);
    }
  }

  async handleForgotPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { email } = req.body;
      const result = await this.userAuthService.requestForgotPasswordReset(email);
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
      const result = await this.userAuthService.validateResetToken(token);
      return res.status(StatusCode.Success).json(result);
    } catch (error) {
      next(error);
    }
  }

  async handlePasswordUpdate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { email, password } = req.body;
      const result = await this.userAuthService.updateForgotPassword(
        email,
        password
      );
      return res.status(StatusCode.Accepted).json(result);
    } catch (error) {
      next(error);
    }
  }
}
