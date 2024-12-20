import Joi from "joi";
import { StatusCode } from "../types";
import CustomError from "./CustomError";

export default class JoiService {
  public validateRequiredFields(input: object): void {
    const schema = Joi.object().keys(
      Object.keys(input).reduce<{ [key: string]: Joi.Schema }>((acc, key) => {
        acc[key] = Joi.required();
        return acc;
      }, {})
    );

    const { error } = schema.validate(input);
    if (error) {
      throw new CustomError(
        `Missing required fields: ${error.details
          .map((detail) => detail.message)
          .join(", ")}`,
        StatusCode.BadRequest
      );
    }
  }

  public validateEmailFormat(email: string): boolean {
    const schema = Joi.string().email();
    const { error } = schema.validate(email);
    if (error) {
      throw new CustomError("Invalid email format", StatusCode.BadRequest);
    }
    return true;
  }

  public validateLength(
    field: string,
    minLength: number,
    maxLength: number = Infinity
  ): boolean {
    const schema = Joi.string().min(minLength).max(maxLength);
    const { error } = schema.validate(field);
    if (error) {
      throw new CustomError(
        `Invalid length for field, expected between ${minLength} and ${maxLength} characters`,
        StatusCode.BadRequest
      );
    }
    return true;
  }

  public validatePhoneNumber(phoneNumber: string): boolean {
    const schema = Joi.string().min(4).max(15);
    const { error } = schema.validate(phoneNumber);
    if (error) {
      throw new CustomError(
        "Invalid phone number format",
        StatusCode.BadRequest
      );
    }
    return true;
  }

  public validatePassword(password: string): boolean {
    const schema = Joi.string()
      .min(6)
      .pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/);
    const { error } = schema.validate(password);
    if (error) {
      throw new CustomError(
        "Password must be at least 6 characters, include at least one uppercase letter, one number, and one special character",
        StatusCode.UnprocessableEntity
      );
    }
    return true;
  }

  public validateIdFormat(id: string): boolean {
    const schema = Joi.string().pattern(new RegExp("^[a-fA-F0-9]{24}$"));
    const { error } = schema.validate(id);
    if (error) {
       throw new CustomError("Invalid ID format", StatusCode.BadRequest);
    }
    return true;
 }
}
