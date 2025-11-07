import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const Schema = mongoose.Schema;

const productSchema = new Schema(
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
    itemFeatures: [
      {
        type: String,
        trim: true,
      },
    ],
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    images: [
      {
        type: String,
        trim: true,
      },
    ],
    banner: {
      type: String,
      optional: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Remove _id and __v
productSchema.set("toJSON", {
  transform: (doc: any, ret: Record<string, any>) => {
    // delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
