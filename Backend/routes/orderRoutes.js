const express = require("express");
const router = express.Router();

const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

const {
  checkout,
  getOrders,
  getOrderById,
  getAdminOrders,
} = require("../controllers/orderController");

router.post("/checkout", verifyToken, checkout);

router.get("/admin/all", verifyToken, isAdmin, getAdminOrders);

router.get("/", verifyToken, getOrders);

router.get("/:id", verifyToken, getOrderById);

module.exports = router;
