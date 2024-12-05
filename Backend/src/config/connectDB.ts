import mongoose from "mongoose";
import { MONGO_URI } from "./env";
export const connectDB = async (): Promise<void> => {
  try {
    const URI = MONGO_URI as string;
    const conn = await mongoose.connect(URI);
    console.log(`Database Connected to ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error connecting to MongoDB: ${error.message}`);
    } else {
      console.error("Unknown error occurred while connecting to MongoDB");
    }
  }
};
