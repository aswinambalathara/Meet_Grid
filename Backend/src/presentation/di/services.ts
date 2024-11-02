import BcryptService from "../../infra/services/bcryptService";
import CryptoService from "../../infra/services/cryptoService";
import NodeMailerService from "../../infra/services/NodeMailerService";
import JoiService from "../../infra/services/validationService";


export const bcryptService = new BcryptService();
export const cryptoService = new CryptoService();
export const nodeMailerService = new NodeMailerService();
export const joiService = new JoiService();