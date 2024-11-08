import IUserRepository from '../../interfaces/repository/IUserRepository';
import IUser from '../../interfaces/entities/IUser';

export default class UserAuthService{
    private userRepository:IUserRepository;

    constructor(userRepository:IUserRepository){
        this.userRepository = userRepository
    }

    async createUser(userData:IUser):Promise<void>{
        
    }

    async verifyRegisteredUser(token:string):Promise<void>{

    }

    async doUserLogin(email:string,password:string):Promise<void>{

    }
    
    async doOAuthLogin(email:string,name:string,profile?:string):Promise<void>{
        
    }

    async sendUserOTPLogin (email:string):Promise<void>{

    }

    async validateUserOTPLogin(email:string,otp:number):Promise<void>{

    }

    async requestForgotPasswordReset(email:string):Promise<void>{

    }

    async validateResetToken(token:string):Promise<void>{

    }

    async updateForgotPassword(email:string,password:string):Promise<void>{
        
    }

    async refreshAccessToken(token:string):Promise<void>{

    }
}