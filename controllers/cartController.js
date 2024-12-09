const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Helper function to update the total price of the cart
const updateTotalPrice = async (cart) => {
  let total = 0;
  for (const item of cart.items) {
    const product = await Product.findById(item.product);
    total += product.price * item.quantity;
  }
  cart.totalPrice = total;
  await cart.save();
};

// Add item to cart
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find the user's cart or create a new one if it doesn't exist
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    // Check if the product already exists in the cart
    const existingItemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
    if (existingItemIndex >= 0) {
      // If product exists, update the quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // If product doesn't exist, add it to the cart
      cart.items.push({
        product: productId,
        quantity: quantity,
        price: product.price,
      });
    }

    // Update the total price of the cart
    await updateTotalPrice(cart);

    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update item quantity in cart
exports.updateCartItem = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the item in the cart and update the quantity
    const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
    if (itemIndex >= 0) {
      cart.items[itemIndex].quantity = quantity;
      await updateTotalPrice(cart);
      res.json(cart);
    } else {
      res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  const { productId } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Remove the item from the cart
    cart.items = cart.items.filter((item) => item.product.toString() !== productId);
    
    // Update the total price of the cart
    await updateTotalPrice(cart);

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get the user's cart
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
