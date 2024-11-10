import { Response, Request, NextFunction } from "express";
import { Cookie, StatusCode } from "../../types/index";
import { CLIENT_URL } from "../../config/env";
import UserAuthService from "../../services/user/UserAuthService";

export default class AuthUserController {
  constructor(private userAuthService: UserAuthService) {
    this.userAuthService = userAuthService;
  }

  async handleUserSignUp(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userData = req.body;
      const result = await this.userAuthService.createUser(userData);
      res.status(StatusCode.Created).json(result);
    } catch (error) {
      next(error);
    }
  }

  async handleUserVerification(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { token } = req.query;
      if (typeof token !== "string") {
        res.status(StatusCode.BadRequest).send("Invalid Token");
        return;
      }
      await this.userAuthService.verifyRegisteredUser(token);
      res.status(StatusCode.Success).redirect(`${CLIENT_URL}/auth/login`);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async handleUserLogin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, password } = req.body;
      const { accessToken, refreshToken, status, message } =
        await this.userAuthService.doUserLogin(email, password);
      res.cookie(Cookie.User, refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      res.status(StatusCode.Success).json({
        accessToken,
        status,
        message,
      });
    } catch (error) {
      next(error);
    }
  }

  async handleOTPLogin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email } = req.body;
      const result = await this.userAuthService.sendUserOTPLogin(email);
      res.status(StatusCode.Accepted).json(result);
    } catch (error) {
      next(error);
    }
  }

  async handleResendOTP(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email } = req.body;
      const result = await this.userAuthService.resendOTPLogin(email);
      res.status(StatusCode.Success).json(result);
    } catch (error) {
      next(error);
    }
  }

  async validateOTPLogin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, otp } = req.body;
      const { accessToken, refreshToken, message, status } =
        await this.userAuthService.validateUserOTPLogin(otp, email);
      res.cookie(Cookie.User, refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      res.status(StatusCode.Success).json({
        accessToken,
        message,
        status,
      });
    } catch (error) {
      next(error);
    }
  }

  async handleForgotPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email } = req.body;
      const result = await this.userAuthService.requestForgotPasswordReset(
        email
      );
      res.status(StatusCode.Success).json(result);
    } catch (error) {
      next(error);
    }
  }

  async validateResetToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.body;
      const result = await this.userAuthService.validateResetToken(token);
      res.status(StatusCode.Success).json(result);
    } catch (error) {
      next(error);
    }
  }

  async handlePasswordUpdate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, password } = req.body;
      const result = await this.userAuthService.updateForgotPassword(
        email,
        password
      );
      res.status(StatusCode.Accepted).json(result);
    } catch (error) {
      next(error);
    }
  }

  async handleRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userToken } = req.cookies;
      const { accessToken } = await this.userAuthService.refreshAccessToken(
        userToken
      );
      res.status(StatusCode.Success).json({ accessToken });
    } catch (error) {
      next(error);
    }
  }

  async handleUserLogout(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userToken } = req.cookies;
      if (!userToken) res.status(StatusCode.NoContent);
      res.clearCookie(Cookie.User, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      });
      res.status(StatusCode.Success).json({ message: "Logout Successfull" });
    } catch (error) {
      next(error);
    }
  }
}
