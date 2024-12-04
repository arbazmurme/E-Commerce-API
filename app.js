const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use((req, res) => res.send("<h1>Hello World!</h1>"));


const PORT = process.env.POR || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
