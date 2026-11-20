const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const {verifyToken,isAdmin} = require("../middleware/authMiddleware");

const {
 addMember,
 getAllMembers,
 removeMember
} = require("../controllers/memberController");


router.get("/",getAllMembers);


router.post(
 "/",
 verifyToken,
 isAdmin,
 upload.single("image"),
 addMember
);


router.delete(
 "/:id",
 verifyToken,
 isAdmin,
 removeMember
);

module.exports = router;