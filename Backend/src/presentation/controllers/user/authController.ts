import { Response,Request,NextFunction } from "express";
import AuthenticationUseCase from '../../../application/user/AuthenticationUseCase'


export default class AuthUserController{
    constructor(private authUseCase:AuthenticationUseCase){}

    async register(req:Request,res:Response,next:NextFunction){
        try {
            const userData = req.body;
            const result = await this.authUseCase.register(userData);
            return 
        } catch (error) {
            
        }
    }
}