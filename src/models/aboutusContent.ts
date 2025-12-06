import mongoose from "mongoose";

const Schema = mongoose.Schema;

const heroContentSchema = new Schema({
  sectionType: {
    type: String,
    required: true,
  },
  morals: {
    type: [Object],
    optional: true,
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
    optional: true,
  },
  buttonSubText: {
    type: String,
    optional: true,
  },
  image: {
    type: String,
    optional: true,
  },
  link: {
    type: String,
    optional: true,
  },
  features: {
    type: [String],
    optional: true,
  },
});

export default mongoose.model("AboutUsContent", heroContentSchema);
