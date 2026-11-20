const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const {verifyToken,isAdmin} = require("../middleware/authMiddleware");

const {
 addReview,
 getAllReviews,
 removeReview
} = require("../controllers/reviewController");


router.get("/",getAllReviews);


router.post(
 "/",
 verifyToken,
 isAdmin,
 upload.single("image"),
 addReview
);


router.delete(
 "/:id",
 verifyToken,
 isAdmin,
 removeReview
);

module.exports = router;