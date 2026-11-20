const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const {verifyToken,isAdmin} = require("../middleware/authMiddleware");

const {
 addPlan,
 getAllPlans,
 removePlan
} = require("../controllers/pricingController");


router.get("/",getAllPlans);


router.post(
 "/",
 verifyToken,
 isAdmin,
 upload.single("image"),
 addPlan
);


router.delete(
 "/:id",
 verifyToken,
 isAdmin,
 removePlan
);

module.exports = router;