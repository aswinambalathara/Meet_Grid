import { Request, Response, NextFunction } from "express";
import { errorLogger } from "../utils/logger";
import CustomError from "../utils/CustomError";
import { StatusCode } from "../types";

export default function errorHandler(
  error: CustomError | Error,
  req: Request,
  res: Response,
  _next: NextFunction
):void {
  const statusCode = (error instanceof CustomError && error.statusCode) || StatusCode.InternalServerError;
  const message = error.message || "Internal Server Error";

  if (error instanceof CustomError) {
    errorLogger(req, res, (err) => {
      if (err) {
        console.error("Error during logging: ", err);
      } else {
        console.error("CustomError logged:", message);
      }
    });
  } else {
    errorLogger(req, res, (err) => {
      if (err) {
        console.error("Error during logging: ", err);
      } else {
        console.error("Unexpected error logged:", message);
      }
    });
  }

  res.status(statusCode).json({
    message,
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  });
}
