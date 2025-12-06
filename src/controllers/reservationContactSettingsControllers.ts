import ReservationContactSettings from "../models/reservationContactSettings.js";
import { Request, Response } from "express";

// Get all reservation contact settings
export const getReservationContactSettings = async (
  req: Request,
  res: Response
) => {
  try {
    const settings = await ReservationContactSettings.find();
    res.status(200).json({
      success: true,
      message: "Reservation contact settings fetched successfully",
      data: settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching reservation contact settings",
      error,
    });
  }
};

// Get single reservation contact settings by ID
export const getReservationContactSettingsById = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const settings = await ReservationContactSettings.findById(id);

    if (!settings) {
      return res.status(404).json({
        success: false,
        message: "Reservation contact settings not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Reservation contact settings fetched successfully",
      data: settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching reservation contact settings",
      error,
    });
  }
};

// Create reservation contact settings
export const createReservationContactSettings = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      displayBookingButton,
      displayWhatsappButton,
      displayPhoneButton,
      displayAddToCartButton,
      address,
      whatsappNumber,
      phoneNumber,
      sectionDescription,
    } = req.body;

    const newSettings = new ReservationContactSettings({
      displayBookingButton,
      displayWhatsappButton,
      displayPhoneButton,
      displayAddToCartButton,
      address,
      whatsappNumber,
      phoneNumber,
      sectionDescription,
    });

    const savedSettings = await newSettings.save();

    res.status(201).json({
      success: true,
      message: "Reservation contact settings created successfully",
      data: savedSettings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating reservation contact settings",
      error,
    });
  }
};

// Update reservation contact settings by ID
export const updateReservationContactSettings = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const {
      displayBookingButton,
      displayWhatsappButton,
      displayPhoneButton,
      displayAddToCartButton,
      address,
      whatsappNumber,
      phoneNumber,
      sectionDescription,
    } = req.body;

    const updatedSettings = await ReservationContactSettings.findByIdAndUpdate(
      id,
      {
        displayBookingButton,
        displayWhatsappButton,
        displayPhoneButton,
        displayAddToCartButton,
        address,
        whatsappNumber,
        phoneNumber,
        sectionDescription,
      },
      { new: true, runValidators: true }
    );

    if (!updatedSettings) {
      return res.status(404).json({
        success: false,
        message: "Reservation contact settings not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Reservation contact settings updated successfully",
      data: updatedSettings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating reservation contact settings",
      error,
    });
  }
};

// Delete reservation contact settings by ID
export const deleteReservationContactSettings = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const deletedSettings = await ReservationContactSettings.findByIdAndDelete(
      id
    );

    if (!deletedSettings) {
      return res.status(404).json({
        success: false,
        message: "Reservation contact settings not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Reservation contact settings deleted successfully",
      data: deletedSettings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting reservation contact settings",
      error,
    });
  }
};
