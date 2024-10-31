import { model,Schema } from "mongoose";
import IUser from "../../domain/entities/IUserEntity";

const userSchema = new Schema<IUser>({
    fullName:{type:String,required:true},
    email:{type:String,required:true,unique:true},
})