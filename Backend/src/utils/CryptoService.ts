import crypto from "crypto";

export default class CryptoService {
  generateToken(): string {
    return crypto.randomBytes(32).toString("hex");
  }
}
