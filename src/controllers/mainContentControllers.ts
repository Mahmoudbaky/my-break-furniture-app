import MainContent from "../models/mainContent.js";
import { Request, Response } from "express";

export const getMainContent = async (req: Request, res: Response) => {
  try {
    const mainContents = await MainContent.find();
    res.status(200).json({
      success: true,
      message: "Main content fetched successfully",
      data: mainContents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching main content",
      error,
    });
  }
};

// Just For development purposes
export const createMainContent = async (req: Request, res: Response) => {
  try {
    const { name, title, subTitle, image, description, buttonText, link } =
      req.body;
    const newMainContent = new MainContent({
      name,
      title,
      subTitle,
      image,
      description,
      buttonText,
      link,
    });
    await newMainContent.save();
    res.status(201).json({
      success: true,
      message: "Main content created successfully",
      data: newMainContent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating main content",
      error,
    });
  }
};

export const updateMainContent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, subtitle, image, description, buttonText, link } = req.body;
    const updatedMainContent = await MainContent.findByIdAndUpdate(
      id,
      {
        title,
        subtitle,
        image,
        buttonText,
        description,
        link,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Main content updated successfully",
      data: updatedMainContent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating main content",
      error,
    });
  }
};
