const express = require("express");
const router = express.Router();

const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

const {
  addPrivacy,
  getAllPrivacy,
} = require("../controllers/privacyController");

router.get("/", getAllPrivacy);

router.post("/", verifyToken, isAdmin, addPrivacy);

module.exports = router;
