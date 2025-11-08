import Cart from "../models/cart.js";
import Product from "../models/product.js";
import Reservation from "../models/reservation.js";
import { Request, Response } from "express";
import { extractTokenAndDecode } from "../lib/utils.js";

// Create reservation from cart
export const createReservation = async (req: Request, res: Response) => {
  try {
    const decoded = extractTokenAndDecode(req as Request);

    if (!decoded) {
      return res.status(401).json({
        message: "Not authorized to access this route",
      });
    }

    const userId = decoded.id;
    const { name, phone, notes, shippingAddress } = req.body;

    if (!shippingAddress) {
      return res.status(400).json({
        success: false,
        message: "Shipping address is required",
      });
    }

    // Get user's cart
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    // Validate all products are still available
    for (const item of cart.items) {
      const product = await Product.findById(item.product);
      if (!product || !product.isActive) {
        return res.status(400).json({
          success: false,
          message: `Product ${
            product?.name || "unknown"
          } is no longer available`,
        });
      }
    }

    // Create order with current cart items
    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.price,
    }));

    const order = new Reservation({
      user: userId,
      items: orderItems,
      totalAmount: cart.totalAmount,
      shippingAddress,
      name,
      phone,
      notes,
      status: "waiting",
    });

    await order.save();

    const emptyArray: any = [];

    cart.items = emptyArray;
    cart.totalAmount = 0;
    await cart.save();

    // Populate product details in response
    const populatedOrder = await Reservation.findById(order._id)
      .populate("items.product", "name price image")
      .populate("user", "email")
      .exec();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: populatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating order",
      error,
    });
  }
};
