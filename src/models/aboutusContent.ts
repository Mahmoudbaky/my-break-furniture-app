import mongoose from "mongoose";
import { optional } from "zod";
const Schema = mongoose.Schema;

const heroContentSchema = new Schema({
  sectionType: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
    optional: true,
  },
  description: {
    type: String,
    optional: true,
  },
  buttonText: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    optional: true,
  },
  link: {
    type: String,
    required: true,
  },
});

export default mongoose.model("AboutUsContent", heroContentSchema);
