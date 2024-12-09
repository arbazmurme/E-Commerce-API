const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");

dotenv.config();
connectDB();

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");

const app = express();
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve files in the uploads folder

// Enable CORS
app.use(
  cors({
    origin: ["http://localhost:3000", "https://e-commerce-frontend-topaz-delta.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

app.use((req, res) => res.send("<h1>Hello World!</h1>"));


const PORT = process.env.POR || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
