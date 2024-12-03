import { Request, Response, NextFunction } from "express";
import AdminAuthService from "../../services/admin/AdminAuthService";
import { StatusCode, Cookie } from "../../types";
export default class AdminAuthController {
  constructor(private adminAuthService: AdminAuthService) {}

  async handleAdminLogin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const adminData = req.body;
      const { accessToken, refreshToken } =
        await this.adminAuthService.doAdminLogin(adminData);

      res.cookie(Cookie.Admin, refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      res.status(StatusCode.Success).json({ accessToken });
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
      const { adminToken } = req.cookies;
      //console.log('adminRefreshToken: ',adminToken);
      const { accessToken } = await this.adminAuthService.refreshAccessToken(
        adminToken
      );
      res.status(StatusCode.Success).json({ accessToken });
    } catch (error) {
      next(error);
    }
  }

  async handleAdminLogout(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { adminToken } = req.cookies;
      if (!adminToken) res.status(StatusCode.NoContent);
      res.clearCookie(Cookie.Admin, {
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
