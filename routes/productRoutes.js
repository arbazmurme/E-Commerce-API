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
const upload = require("../middleware/uploadMiddleware"); // Import the upload middleware

const router = express.Router();

// Public routes
router.get("/", getProducts);
router.get("/categories", getCategories);
router.get("/:id", getProduct);
router.get("/category/:category", getProductsByCategory);

// Admin protected routes
router.post("/", protect, isAdmin, upload.single("image"), addProduct); // Handle image upload
router.put("/:id", protect, isAdmin, updateProduct);
router.delete("/:id", protect, isAdmin, deleteProduct);

module.exports = router;
