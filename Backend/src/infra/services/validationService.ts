import IValidationService from "../../domain/interfaces/services/IValidationService";
import Joi from "joi";

export default class JoiService implements IValidationService {
  validateEmailFormat(email: string): boolean {
    const schema = Joi.string().email();
    const { error } = schema.validate(email);
    if (error) {
      throw new Error("Invalid Email Format");
    }
    return true;
  }
  validateLength(
    field: string,
    minLength: number,
    maxLength: number = Infinity
  ): boolean {
    const schema = Joi.string().min(minLength).max(maxLength);
    const { error } = schema.validate(field);
    if (error) {
      throw new Error(
        `Invalid length for field, expected between ${minLength} and ${maxLength} characters`
      );
    }
    return true;
  }
  validatePassword(password: string): boolean {
    const schema = Joi.string()
      .min(6)
      .pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/);
    const { error } = schema.validate(password);
    if (error) {
      throw new Error(
        "Password must be at least 6 characters, include at least one uppercase letter, one number, and one special character"
      );
    }
    return true;
  }
  validatePhoneNumber(phoneNumber: string): boolean {
    const schema = Joi.string().min(4).max(15);
    const { error } = schema.validate(phoneNumber);
    if (error) {
      throw new Error("Invalid phone number format");
    }
    return true;
  }
  validateRequiredFields(input: object): void {
    const schema = Joi.object().keys(
        Object.keys(input).reduce((acc, key) => {
           acc[key] = Joi.required();
           return acc;
        }, {} as any)
     );

     const { error } = schema.validate(input);
     if (error) {
        throw new Error(
           `Missing required fields: ${error.details.map((detail) => detail.message).join(", ")}`,
        );
     }
  }
}
