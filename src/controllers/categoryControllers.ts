import Category from "../models/category.js";
import Product from "../models/product.js";
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

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();

    res.status(200).json({
      success: true,
      message: "categories fetched",
      data: categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

export const getAllCategoriesForAdmin = async (req: Request, res: Response) => {
  try {
    // get all categories including number of products in each category
    const categories = await Category.find().lean();

    // get count of products in each category
    const productsCounts = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);

    // Create a map for quick lookup
    const countMap = new Map(
      productsCounts.map((item) => [item._id.toString(), item.count])
    );

    // Add product count to each category
    const categoriesWithCount = categories.map((category) => ({
      ...category,
      productCount: countMap.get(category._id.toString()) || 0,
    }));

    res.status(200).json({
      success: true,
      message: "categories fetched for admin",
      data: categoriesWithCount,
    });
  } catch (error) {
    console.error("Error fetching categories for admin:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;

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

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    category.name = validationResponse.data.name;
    category.description = validationResponse.data.description;

    await category.save();

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
    });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};
