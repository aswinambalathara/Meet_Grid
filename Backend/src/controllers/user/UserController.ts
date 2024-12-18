import { Response, NextFunction } from "express";
import { CustomRequest, StatusCode } from "../../types/index";
import UserService from "../../services/user/UserService";

export default class UserController {
  constructor(private userService: UserService) {}

  async handleGetProfile(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.user!;
      const result = await this.userService.getProfile(id);
      res.status(StatusCode.Success).json(result);
    } catch (error) {
      next(error);
    }
  }

  async handleUpdateBasicDetails(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.user!;
      const userData = req.body;
      const result = await this.userService.updateBasicDetails(id, userData);
      res.status(StatusCode.Success).json(result);
    } catch (error) {
      next(error);
    }
  }

  async handleSendVerificationMail(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.user!;
      const { email } = req.body;
      const result = await this.userService.sendEmailVerification(id, email);
      res.status(StatusCode.Success).json(result);
    } catch (error) {
      next(error);
    }
  }

  async handleVerifyEmail(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.user!;
      const { otp } = req.body;
      const result = await this.userService.verifyNewEmail(Number(otp), id);
      res.status(StatusCode.Success).json(result);
    } catch (error) {
      next(error);
    }
  }

  async handleUpdateProfessionalDetails(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.user!;
      const userData = req.body;
      const result = await this.userService.updateProfessionalDetails(
        id,
        userData
      );
      res.status(StatusCode.Success).json(result);
    } catch (error) {
      next(error);
    }
  }

  async handleChangePassword(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.user!;
      const { currentPassword, newPassword, otp } = req.body;
      const result = await this.userService.changePassword(
        id,
        newPassword,
        currentPassword,
        otp
      );
      res.status(StatusCode.Success).json(result);
    } catch (error) {
      next(error);
    }
  }

  async handleSendPasswordChangeOTP(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.user!;
      const result = await this.userService.sendPasswordChangeOTP(id);
      res.status(StatusCode.Success).json(result);
    } catch (error) {
      next(error);
    }
  }

  async handleDeactivateAccount(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.user!;
      const { password } = req.body;
      const result = await this.userService.deactivateAccount(id, password);
      res.status(StatusCode.Success).json(result);
    } catch (error) {
      next(error);
    }
  }
}
