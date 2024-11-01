import ITokenService from "../../domain/interfaces/services/ICryptoService";
import crypto from 'crypto'

export default class CryptoService implements ITokenService{
     generateToken(): string {
        return crypto.randomBytes(32).toString('hex')
    }
}
