import mongoose from "mongoose";

const reservationContactSettingsSchema = new mongoose.Schema({
  displayBookingButton: {
    type: Boolean,
    default: true,
  },
  displayWhatsappButton: {
    type: Boolean,
    default: true,
  },
  displayPhoneButton: {
    type: Boolean,
    default: true,
  },
  displayAddToCartButton: {
    type: Boolean,
    default: true,
  },
  address: {
    type: String,
    default: "",
  },
  whatsappNumber: {
    type: String,
    default: "",
  },
  phoneNumber: {
    type: String,
    default: "",
  },
  sectionDescription: {
    type: String,
    default: "",
  },
});

const ReservationContactSettings = mongoose.model(
  "ReservationContactSettings",
  reservationContactSettingsSchema
);

export default ReservationContactSettings;
