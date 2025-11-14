import mongoose from "mongoose";
const Schema = mongoose.Schema;

const heroContentSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
    required: true,
  },
  buttonText: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
});

export default mongoose.model("HeroContent", heroContentSchema);
