import { Response,request,NextFunction } from "express";
import AuthenticationUseCase from '../../../application/user/AuthenticationUseCase'


export default class AuthUserController{
    constructor(private authUseCase:AuthenticationUseCase){}
    
}