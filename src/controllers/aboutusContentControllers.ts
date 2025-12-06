import aboutusContent from "../models/aboutusContent.js";
import { Request, Response } from "express";

export const getAboutUsContent = async (req: Request, res: Response) => {
  try {
    const aboutusContents = await aboutusContent.find();
    res.status(200).json({
      success: true,
      message: "About Us content fetched successfully",
      data: aboutusContents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching About Us content",
      error,
    });
  }
};

// for development purposes
export const createAboutUsContent = async (req: Request, res: Response) => {
  try {
    const {
      sectionType,
      buttonText,
      buttonSubText,
      title,
      subTitle,
      image,
      link,
      description,
      features,
      morals,
    } = req.body;
    const newAboutUsContent = await aboutusContent.create({
      title,
      sectionType,
      buttonText,
      buttonSubText,
      link,
      subTitle,
      image,
      description,
      features,
      morals,
    });
    res.status(201).json({
      success: true,
      message: "About Us content created successfully",
      data: newAboutUsContent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating About Us content",
      error,
    });
  }
};

export const updateAboutUsContent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      sectionType,
      buttonText,
      buttonSubText,
      title,
      subTitle,
      image,
      link,
      description,
      features,
      morals,
    } = req.body;
    const updatedAboutUsContent = await aboutusContent.findByIdAndUpdate(
      id,
      {
        sectionType,
        buttonText,
        buttonSubText,
        title,
        subTitle,
        image,
        link,
        description,
        features,
        morals,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "About Us content updated successfully",
      data: updatedAboutUsContent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating About Us content",
      error,
    });
  }
};
