import BcryptService from "../../infra/services/bcryptService";
import CryptoService from "../../infra/services/cryptoService";

export const bcryptService = new BcryptService();
export const cryptoService = new CryptoService();
