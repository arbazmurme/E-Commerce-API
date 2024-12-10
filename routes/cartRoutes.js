// routes/cartRoutes.js
const express = require("express");
const {
  addToCart,
  removeFromCart,
  updateQuantity,
  getCart,
} = require("../controllers/cartController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getCart);
router.post("/add", protect, addToCart);
router.delete("/remove", protect, removeFromCart);
router.put("/update", protect, updateQuantity);

module.exports = router;
