const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user.js");
const productRoutes = require("./routes/products.js");
const cartRoutes = require("./routes/cart.js");
const orderRoutes = require("./routes/order.js");
const wishlistRoutes = require("./routes/wishlist.js");
const connectDB = require("./config/db.js");

const bodyParser = require("body-parser");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  bodyParser.json({
    strict: true,
    verify: (req, res, buf) => {
      try {
        JSON.parse(buf);
      } catch (e) {
        throw new Error("Invalid JSON");
      }
    },
  })
);

app.use((err, req, res, next) => {
  if (err.message === "Invalid JSON") {
    return res.status(400).json({ error: "Invalid JSON payload" });
  }
  next(err);
});

app.use(
  cors({
    origin: [
      "https://ecommerce-project-test.netlify.app",
      "http://localhost:5173",
    ],
  })
);
app.use(express.json());

connectDB();

app.use("/api", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/wishlist", wishlistRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
