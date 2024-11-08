import IUser from '../interfaces/entities/IUser';
import IUserRepository from '../interfaces/repository/IUserRepository';
import UserModel from '../models/UserModel';

export default class UserRepository implements IUserRepository{
    private model = UserModel;

    async create(user: IUser): Promise<IUser> { 
        try {
            const newUser = new this.model(user);
            return await newUser.save();
        } catch (error) {
            throw error;
        }
    }
    async delete(id: string): Promise<void> {
        try {
             await this.model.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    }
    async findByEmail(email: string): Promise<IUser | null> {
        try {
            return await this.model.findOne({email:email});
        } catch (error) {
            throw error;
        }
    }

    async findAll(): Promise<IUser[]> {
        try {
            return await this.model.find();
        } catch (error) {
            throw error;
        }
    }

    async findById(id: string): Promise<IUser | null> {
        try {
            return await this.model.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async update(id: string, user: Partial<IUser>): Promise<IUser | null> {
        try {
            return await this.model.findByIdAndUpdate(id,user,{new:true});
        } catch (error) {
            throw error;
        }
    }

    async verifyByToken(token:string):Promise<IUser | null>{
        try {
            return await this.model.findOne({
                'verificationToken.token':token,
                'verificationToken.expiry':{$gt:Date.now()}
            });
        } catch (error) {
            throw error;
        }
    }
}