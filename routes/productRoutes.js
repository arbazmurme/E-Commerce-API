const express = require("express");
const {
  getProducts,
  getProduct,
  getCategories,
  getProductsByCategory,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes
router.get("/", getProducts); // Get all products with filters
router.get("/categories", getCategories); // Get all product categories
router.get("/:id", getProduct); // Get a single product by ID
router.get("/category/:category", getProductsByCategory); // Get products by category

// Admin protected routes
router.post("/", protect, isAdmin, addProduct); // Add a new product
router.put("/:id", protect, isAdmin, updateProduct); // Update an existing product
router.delete("/:id", protect, isAdmin, deleteProduct); // Delete a product

module.exports = router;
