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

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;
    const products = await Product.find().skip(skip).limit(limit);
    const total = await Product.countDocuments();

    res.status(200).json({
      success: true,
      data: products,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

export const filterProducts = async (req: Request, res: Response) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;

    const filters: any = {};

    if (category) filters.category = category;
    if (category === "all") delete filters.category;

    const skip = (Number(page) - 1) * Number(limit);

    const products = await Product.find(filters)
      .skip(skip)
      .limit(Number(limit))
      .populate("category", "name -_id");

    const total = await Product.countDocuments(filters);

    res.status(200).json({
      success: true,
      message: "Products filtered successfully",
      data: products,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
    });
  } catch (error) {
    console.error("Error filtering products:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};
