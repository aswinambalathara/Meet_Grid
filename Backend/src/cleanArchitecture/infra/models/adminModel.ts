import { model, Schema } from "mongoose";
import IAdmin from "../../domain/entities/IAdminEntity";

const adminSchema = new Schema<IAdmin>({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const adminModel = model<IAdmin>("admin", adminSchema);
export default adminModel;