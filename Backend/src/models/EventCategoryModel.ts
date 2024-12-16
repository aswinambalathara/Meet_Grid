import { model, Schema } from "mongoose";
import { IEventCategory } from "../interfaces/entities/IEvent";

const eventCategorySchema = new Schema<IEventCategory>({
  categoryName: {
    type: String,
    required: true,
    trim: true,
  },
  categoryType: {
    type: String,
    enum: ["general", "professional"],
    required: true,
  },

  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },

  description: {
    type: String,
    trim: true,
  },
});

const eventCategoryModel = model<IEventCategory>("admin", eventCategorySchema);
export default eventCategoryModel;
