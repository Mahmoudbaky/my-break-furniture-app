import Product from "../models/product.js";
import { Request, Response } from "express";
import { createProductValidationSchema } from "../validators/productValidators.js";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const validationResponse = createProductValidationSchema.safeParse(
      req.body
    );

    if (!validationResponse.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid product data",
        errors: validationResponse.error,
      });
    }

    const existingProduct = await Product.findOne({
      name: validationResponse.data.name,
    });

    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: "Product with the same name already exists",
      });
    }

    await Product.create(validationResponse.data);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};
