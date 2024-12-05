import { StatusCode } from "../types/index";

export default class CustomError extends Error {
  public statusCode: StatusCode;

  constructor(message: string, statusCode: StatusCode) {
    super(message);
    this.statusCode = statusCode;
  }
  public toJSON(): { message: string; statusCode: StatusCode } {
    return {
      message: this.message,
      statusCode: this.statusCode,
    };
  }
}
