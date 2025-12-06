import mongoose from "mongoose";

const Schema = mongoose.Schema;

const headerFooterContentSchema = new Schema({
  logoText: {
    type: String,
    required: true,
  },
  displaylogoImage: {
    type: Boolean,
    required: true,
  },
  displayLogoText: {
    type: Boolean,
    required: true,
  },
  logoImage: {
    type: String,
    required: true,
  },
});

export default mongoose.model("HeaderFooterContent", headerFooterContentSchema);
