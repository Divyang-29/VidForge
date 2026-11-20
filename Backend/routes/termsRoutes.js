const express = require("express");
const router = express.Router();

const {verifyToken,isAdmin} = require("../middleware/authMiddleware");

const {
 addTerms,
 getAllTerms
} = require("../controllers/termsController");


router.get("/",getAllTerms);


router.post(
 "/",
 verifyToken,
 isAdmin,
 addTerms
);

module.exports = router;