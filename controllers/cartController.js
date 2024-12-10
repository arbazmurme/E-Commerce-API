// controllers/cartController.js
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Add product to cart
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

      if (itemIndex >= 0) {
        // If product is already in cart, update the quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // If product is not in cart, add it
        cart.items.push({ product: productId, quantity });
      }

      await cart.save();
      res.status(200).json(cart);
    } else {
      // Create a new cart if none exists
      const newCart = new Cart({
        user: req.user._id,
        items: [{ product: productId, quantity }],
      });

      await newCart.save();
      res.status(200).json(newCart);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove product from cart
exports.removeFromCart = async (req, res) => {
  const { productId } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      cart.items = cart.items.filter(item => item.product.toString() !== productId);
      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update product quantity in cart
exports.updateQuantity = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      const item = cart.items.find(item => item.product.toString() === productId);

      if (item) {
        item.quantity = quantity;
        await cart.save();
        res.status(200).json(cart);
      } else {
        res.status(404).json({ message: "Product not in cart" });
      }
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");

    if (!cart) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
