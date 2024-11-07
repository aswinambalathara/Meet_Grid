import bcrypt from 'bcrypt';
import IPasswordService from '../../domain/interfaces/services/IBcryptService';

export default class BcryptService implements IPasswordService{
    async hash(password: string): Promise<string> {
        return await bcrypt.hash(password,10);
    }
    async compare(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainPassword,hashedPassword);
    }
}