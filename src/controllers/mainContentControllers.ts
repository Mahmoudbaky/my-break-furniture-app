import heroContent from "../models/heroContent.js";
import { Request, Response } from "express";

export const getMainContent = async (req: Request, res: Response) => {
  try {
    const heroContents = await heroContent.find();
    res.status(200).json({
      success: true,
      message: "Hero content fetched successfully",
      data: heroContents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching hero content",
      error,
    });
  }
};

export const updateMainContent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, subtitle, image, description, buttonText, link } = req.body;
    const updatedHeroContent = await heroContent.findByIdAndUpdate(
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
      message: "Hero content updated successfully",
      data: updatedHeroContent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating hero content",
      error,
    });
  }
};
