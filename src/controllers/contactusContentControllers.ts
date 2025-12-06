import contactUsContent from "../models/contactUsContent.js";
import { Request, Response } from "express";

// Get all contact us content
export const getContactUsContent = async (req: Request, res: Response) => {
  try {
    const contactUsContents = await contactUsContent.find();
    res.status(200).json({
      success: true,
      message: "Contact Us content fetched successfully",
      data: contactUsContents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching Contact Us content",
      error,
    });
  }
};

// Get single contact us content by ID
export const getContactUsContentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const content = await contactUsContent.findById(id);

    if (!content) {
      return res.status(404).json({
        success: false,
        message: "Contact Us content not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact Us content fetched successfully",
      data: content,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching Contact Us content",
      error,
    });
  }
};

// Get contact us content by section type
export const getContactUsContentBySectionType = async (
  req: Request,
  res: Response
) => {
  try {
    const { sectionType } = req.params;
    const content = await contactUsContent.findOne({ sectionType });

    if (!content) {
      return res.status(404).json({
        success: false,
        message: "Contact Us content not found for this section type",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact Us content fetched successfully",
      data: content,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching Contact Us content",
      error,
    });
  }
};

// Create contact us content
export const createContactUsContent = async (req: Request, res: Response) => {
  try {
    const {
      sectionType,
      title,
      subTitle,
      description,
      phone,
      email,
      address,
      workHours,
      mapLink,
      contactFormTitle,
      contactFormDescription,
      facebookLink,
      instagramLink,
      whatsappLink,
    } = req.body;

    const newContactUsContent = new contactUsContent({
      sectionType,
      title,
      subTitle,
      description,
      phone,
      email,
      address,
      workHours,
      mapLink,
      contactFormTitle,
      contactFormDescription,
      facebookLink,
      instagramLink,
      whatsappLink,
    });

    const savedContent = await newContactUsContent.save();

    res.status(201).json({
      success: true,
      message: "Contact Us content created successfully",
      data: savedContent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating Contact Us content",
      error,
    });
  }
};

// Update contact us content by ID
export const updateContactUsContent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      sectionType,
      title,
      subTitle,
      description,
      phone,
      email,
      address,
      workHours,
      mapLink,
      contactFormTitle,
      contactFormDescription,
      facebookLink,
      instagramLink,
      whatsappLink,
    } = req.body;

    const updatedContent = await contactUsContent.findByIdAndUpdate(
      id,
      {
        sectionType,
        title,
        subTitle,
        description,
        phone,
        email,
        address,
        workHours,
        mapLink,
        contactFormTitle,
        contactFormDescription,
        facebookLink,
        instagramLink,
        whatsappLink,
      },
      { new: true, runValidators: true }
    );

    if (!updatedContent) {
      return res.status(404).json({
        success: false,
        message: "Contact Us content not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact Us content updated successfully",
      data: updatedContent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating Contact Us content",
      error,
    });
  }
};

// Delete contact us content by ID
export const deleteContactUsContent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedContent = await contactUsContent.findByIdAndDelete(id);

    if (!deletedContent) {
      return res.status(404).json({
        success: false,
        message: "Contact Us content not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact Us content deleted successfully",
      data: deletedContent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting Contact Us content",
      error,
    });
  }
};
