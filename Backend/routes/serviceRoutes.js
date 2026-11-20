const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

const {
  addService,
  getAllServices,
  removeService,
} = require("../controllers/serviceController");

router.get("/", getAllServices);

router.post(
  "/",
  verifyToken,
  isAdmin,
  upload.fields([
    { name: "primary_image", maxCount: 1 },
    { name: "image2", maxCount: 1 },
  ]),
  addService,
);

router.delete("/:id", verifyToken, isAdmin, removeService);

module.exports = router;
