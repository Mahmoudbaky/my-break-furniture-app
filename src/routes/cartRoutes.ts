import express from "express";
// import { protect, authorize } from "../middleware/auth.js";

import * as cartControllers from "../controllers/cartControllers.js";

export const router = express.Router();

// Add item to cart
router.post(
  "/add-item",
  //   protect,
  //   authorize("user"),
  cartControllers.addToCart
);

// Remove item from cart
router.delete(
  "/remove-item/:itemId",
  //   protect,
  //   authorize("user"),
  cartControllers.removeFromCart
);

// Get user's cart
router.get(
  "/my-cart",
  //   protect,
  //   authorize("user"),
  cartControllers.getCart
);

// update item quantity in cart
router.put(
  "/update-item/:itemId",
  //   protect,
  //   authorize("user"),
  cartControllers.updateCartItem
);

export default router;
