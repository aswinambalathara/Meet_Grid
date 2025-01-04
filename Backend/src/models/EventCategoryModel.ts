import { model, Schema } from "mongoose";
import { IEventCategory } from "../interfaces/entities/IEvent";

const eventCategorySchema = new Schema<IEventCategory>(
  {
    categoryName: {
      type: String,
      required: true,
      trim: true,
      lowercase:true
    },
    categoryType: {
      type: String,
      enum: ["General", "Professional"],
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const EventCategoryModel = model<IEventCategory>(
  "eventCategory",
  eventCategorySchema
);
export default EventCategoryModel;
