const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

const {
  addProduct,
  getProducts,
  getProductById,
  deleteProduct,
} = require("../controllers/productController");

// GET ALL PRODUCTS
router.get("/", getProducts);

// GET PRODUCT BY ID
router.get("/:id", getProductById);

// ADD PRODUCT (ADMIN)
router.post(
  "/",
  verifyToken,
  isAdmin,
  upload.fields([
    { name: "primary_image", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  addProduct,
);

// DELETE PRODUCT (ADMIN)
router.delete("/:id", verifyToken, isAdmin, deleteProduct);

module.exports = router;
