import Category from "../models/category.js";
import { Request, Response } from "express";
import { createCategoryValidationSchema } from "../validators/categoryValidators.js";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const validationResponse = createCategoryValidationSchema.safeParse(
      req.body
    );

    if (!validationResponse.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid category data",
        errors: validationResponse.error,
      });
    }

    const existingCategory = await Category.findOne({
      name: validationResponse.data.name,
    });

    if (existingCategory) {
      return res.status(409).json({
        success: false,
        message: "Category with this name already exists",
      });
    }

    await Category.create(validationResponse.data);

    res.status(201).json({
      success: true,
      message: "Category created successfully",
    });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};
