import crypto from "crypto";

export default class CryptoService {
  generateToken(): string {
    return crypto.randomBytes(32).toString("hex");
  }

  generateNanoId(length: number): string {
    const charset =
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const bytes = crypto.randomBytes(length);
    let id = "";

    for (let i = 0; i < length; i++) {
      id += charset[bytes[i] % charset.length];
    }

    return id;
  }
}
