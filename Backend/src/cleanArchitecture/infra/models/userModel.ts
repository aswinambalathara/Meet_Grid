import { model, Schema } from "mongoose";
import IUser from "../../domain/entities/IUserEntity";

const userSchema = new Schema<IUser>({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String }, 
  image: { type: String },
  bio: { type: String },
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  professionalInfo: {
    type: {
      companyName: { type: String, required: true },
      jobTitle: { type: String, required: true },
      linkedinUrl: { type: String, required: true },
      skills: [{ type: String, required: true }],
    },
    required: false,
  },
  eventsAttended: [{ type: Schema.Types.ObjectId, ref: "events" }],
  eventsHosted: [{ type: Schema.Types.ObjectId, ref: "events" }],
  eventsAttending: [{ type: Schema.Types.ObjectId, ref: "events" }],
  verificationToken: {
    type: {
      token: { type: String, required: true },
      expiry: { type: Date, required: true },
    },
    required: false,
  },
  otp:{
    type:{
      otp:{type:Number, required:true},
      expiry:{type:Date,required:true}
    }
  },
  location: {
    type: {
      addressLine: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
    },
    required: false,
  },
  isBlocked: { type: Boolean, required: true, default: false },
  isDeactivated: { type: Boolean, required: true, default: false },
  isVerified:{type: Boolean, required:true, default:false},
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

const userModel = model<IUser>("user", userSchema);
export default userModel;
