import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    id: {
      type: String,
      default: uuidv4,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      optional: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// Remove _id and __v
// categorySchema.set("toJSON", {
//   transform: (doc: any, ret: Record<string, any>) => {
//     delete ret._id;
//     delete ret.__v;
//     return ret;
//   },
// });

const Category = mongoose.model("Category", categorySchema);

export default Category;
