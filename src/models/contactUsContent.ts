import mongoose from "mongoose";

const Schema = mongoose.Schema;

const contactUsContentSchema = new Schema({
  sectionType: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    optional: true,
  },
  subTitle: {
    type: String,
    optional: true,
  },
  description: {
    type: String,
    optional: true,
  },
  phone: {
    type: String,
    optional: true,
  },
  email: {
    type: String,
    optional: true,
  },
  address: {
    type: String,
    optional: true,
  },
  workHours: {
    type: String,
    optional: true,
  },
  mapLink: {
    type: String,
    optional: true,
  },
  contactFormTitle: {
    type: String,
    optional: true,
  },
  contactFormDescription: {
    type: String,
    optional: true,
  },
  facebookLink: {
    type: String,
    optional: true,
  },
  instagramLink: {
    type: String,
    optional: true,
  },
  whatsappLink: {
    type: String,
    optional: true,
  },
});

export default mongoose.model("ContactUsContent", contactUsContentSchema);
