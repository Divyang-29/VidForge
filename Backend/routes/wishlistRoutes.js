const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");

const {
  addWishlist,
  getUserWishlist,
  deleteWishlist,
} = require("../controllers/wishlistController");

router.post("/", verifyToken, addWishlist);

router.get("/", verifyToken, getUserWishlist);

router.delete("/:id", verifyToken, deleteWishlist);

module.exports = router;
