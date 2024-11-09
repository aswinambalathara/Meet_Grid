import { model, Schema } from "mongoose";
import IAdmin from "../interfaces/entities/IAdmin";

const adminSchema = new Schema<IAdmin>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const adminModel = model<IAdmin>("admin", adminSchema);
export default adminModel;
