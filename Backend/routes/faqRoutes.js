const express = require("express");
const router = express.Router();

const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

const {
  addFAQ,
  getAllFAQs,
  removeFAQ,
} = require("../controllers/faqController");

router.get("/", getAllFAQs);

router.post("/", verifyToken, isAdmin, addFAQ);

router.delete("/:id", verifyToken, isAdmin, removeFAQ);

module.exports = router;
