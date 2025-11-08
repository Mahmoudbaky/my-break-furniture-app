import express from "express";
// import { protect, authorize } from "../middleware/auth.js";

import * as cartControllers from "../controllers/cartControllers.js";

export const router = express.Router();

// Get user's cart
router.get(
  "/my-cart",
  //   protect,
  //   authorize("user"),
  cartControllers.getCart
);

// Add item to cart
router.post(
  "/add-item",
  //   protect,
  //   authorize("user"),
  cartControllers.addToCart
);

// update item quantity in cart
router.put(
  "/update-item",
  //   protect,
  //   authorize("user"),
  cartControllers.updateCartItem
);

// Remove item from cart
router.delete(
  "/remove-item/:productId",
  //   protect,
  //   authorize("user"),
  cartControllers.removeFromCart
);

router.delete(
  "/clear-cart", //   protect,
  //   authorize("user"),
  cartControllers.clearCart
);

export default router;
