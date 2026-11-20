const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

const {
  createNewBlog,
  getAllBlogs,
  getSingleBlog,
  postComment,
} = require("../controllers/blogController");

router.get("/", getAllBlogs);

router.get("/:id", getSingleBlog);

router.post(
  "/",
  verifyToken,
  isAdmin,
  upload.fields([
    { name: "primary_image", maxCount: 1 },
    { name: "big_image", maxCount: 1 },
    { name: "image1", maxCount: 1 }, 
    { name: "image2", maxCount: 1 },
  ]),
  createNewBlog,
);

router.post("/comment", postComment);

module.exports = router;
