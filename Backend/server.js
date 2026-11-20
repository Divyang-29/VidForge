const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
require("./config/db");

dotenv.config();
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const blogRoutes = require("./routes/blogRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const memberRoutes = require("./routes/memberRoutes");
const pricingRoutes = require("./routes/pricingRoutes");
const termRoutes = require("./routes/termsRoutes");
const privacyRoutes = require("./routes/privacyRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const faqRoutes = require("./routes/faqRoutes");

app.use("/auth", authRoutes);
app.use("/contact", contactRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/order", orderRoutes);
app.use("/wishlist", wishlistRoutes);
app.use("/blog", blogRoutes);
app.use("/testimonials", testimonialRoutes);
app.use("/members", memberRoutes);
app.use("/pricing", pricingRoutes);
app.use("/terms", termRoutes);
app.use("/privacy", privacyRoutes);
app.use("/services", serviceRoutes);
app.use("/reviews", reviewRoutes);
app.use("/faqs", faqRoutes);

app.get("/", (req, res) => {
  res.send("TalentStack API Running 🚀");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
