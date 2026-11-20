const express = require("express");
const router = express.Router();

const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

const {
  addTestimonial,
  getAllTestimonials,
  removeTestimonial,
} = require("../controllers/testimonialController");

router.get("/", getAllTestimonials);

router.post("/", verifyToken, isAdmin, addTestimonial);

router.delete("/:id", verifyToken, isAdmin, removeTestimonial);

module.exports = router;
