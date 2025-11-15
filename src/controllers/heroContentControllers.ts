import heroContent from "../models/heroContent.js";
import { Request, Response } from "express";

export const getHeroContent = async (req: Request, res: Response) => {
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

export const createHeroContent = async (req: Request, res: Response) => {
  try {
    const { title, subtitle, image, buttonText, link } = req.body;
    const newHeroContent = await heroContent.create({
      title,
      subtitle,
      image,
      buttonText,
      link,
    });
    res.status(201).json({
      success: true,
      message: "Hero content created successfully",
      data: newHeroContent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating hero content",
      error,
    });
  }
};

export const updateHeroContent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, subtitle, image, buttonText, link } = req.body;
    const updatedHeroContent = await heroContent.findByIdAndUpdate(
      id,
      {
        title,
        subtitle,
        image,
        buttonText,
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

export const deleteHeroContent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedHeroContent = await heroContent.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Hero content deleted successfully",
      data: deletedHeroContent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting hero content",
      error,
    });
  }
};
