import { Request, Response, NextFunction } from "express";
import {
  ApplicationError,
  ValidationError,
  NotFoundError,
  ConflictError,
  ForbiddenError,
  UnauthorizedError,
  InternalServerError,
} from "../../application/errors/errors";

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let statusCode = 500;
  let message = "Internal Server Error";

  if (err instanceof ValidationError) {
    statusCode = 400;
    message = err.message;
  } else if (err instanceof NotFoundError) {
    statusCode = 404;
    message = err.message;
  } else if (err instanceof ApplicationError) {
    statusCode = 400;
    message = err.message;
  } else if (err instanceof ConflictError) {
    statusCode = 409;
    message = err.message;
  } else if (err instanceof ForbiddenError) {
    statusCode = 403;
    message = err.message;
  } else if (err instanceof UnauthorizedError) {
    statusCode = 401;
    message = err.message;
  } else if (err instanceof InternalServerError) {
    statusCode = 500;
    message = err.message;
  }

  console.error(
    `[${new Date().toISOString()}] ${statusCode} - ${message} - ${err.stack}`
  );
  res.status(statusCode).json({ error: message });
}
