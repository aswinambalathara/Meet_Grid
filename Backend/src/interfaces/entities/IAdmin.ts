import { Document } from "mongoose";

export default interface IAdmin extends Document {
  readonly email: string;
  password: string;
}