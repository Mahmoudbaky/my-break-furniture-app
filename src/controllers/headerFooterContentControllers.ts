import HeaderFooterContent from "../models/headerFooterContent.js";
import { Request, Response } from "express";

// Get all header footer content
export const getHeaderFooterContent = async (req: Request, res: Response) => {
  try {
    const headerFooterContents = await HeaderFooterContent.find();
    res.status(200).json({
      success: true,
      message: "Header Footer content fetched successfully",
      data: headerFooterContents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching Header Footer content",
      error,
    });
  }
};

// Get single header footer content by ID
export const getHeaderFooterContentById = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const content = await HeaderFooterContent.findById(id);

    if (!content) {
      return res.status(404).json({
        success: false,
        message: "Header Footer content not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Header Footer content fetched successfully",
      data: content,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching Header Footer content",
      error,
    });
  }
};

// Create header footer content
export const createHeaderFooterContent = async (
  req: Request,
  res: Response
) => {
  try {
    const { logoText, displaylogoImage, displayLogoText, logoImage } = req.body;

    const newHeaderFooterContent = new HeaderFooterContent({
      logoText,
      displaylogoImage,
      displayLogoText,
      logoImage,
    });

    const savedContent = await newHeaderFooterContent.save();

    res.status(201).json({
      success: true,
      message: "Header Footer content created successfully",
      data: savedContent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating Header Footer content",
      error,
    });
  }
};

// Update header footer content by ID
export const updateHeaderFooterContent = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { logoText, displaylogoImage, displayLogoText, logoImage } = req.body;

    const updatedContent = await HeaderFooterContent.findByIdAndUpdate(
      id,
      {
        logoText,
        displaylogoImage,
        displayLogoText,
        logoImage,
      },
      { new: true, runValidators: true }
    );

    if (!updatedContent) {
      return res.status(404).json({
        success: false,
        message: "Header Footer content not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Header Footer content updated successfully",
      data: updatedContent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating Header Footer content",
      error,
    });
  }
};

// Delete header footer content by ID
export const deleteHeaderFooterContent = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const deletedContent = await HeaderFooterContent.findByIdAndDelete(id);

    if (!deletedContent) {
      return res.status(404).json({
        success: false,
        message: "Header Footer content not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Header Footer content deleted successfully",
      data: deletedContent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting Header Footer content",
      error,
    });
  }
};
