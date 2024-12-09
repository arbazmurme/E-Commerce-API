const express = require("express");
const {
  addToCart,
  updateCartItem,
  removeFromCart,
  getCart,
} = require("../controllers/cartController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// User routes (must be logged in)
router.post("/add", protect, addToCart); // Add item to cart
router.put("/update", protect, updateCartItem); // Update item in cart
router.delete("/remove", protect, removeFromCart); // Remove item from cart
router.get("/", protect, getCart); // Get user's cart

module.exports = router;
