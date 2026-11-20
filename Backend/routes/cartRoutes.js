const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");

const {
  addToCart,
  getCart,
  applyCoupon
} = require("../controllers/cartController");


// Add to cart
router.post("/", verifyToken, addToCart);

// Get cart items
router.get("/", verifyToken, getCart);

// Apply coupon
router.post("/apply-coupon", verifyToken, applyCoupon);

module.exports = router;