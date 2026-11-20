const express = require("express");
const router = express.Router();

const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

const {
 submitContact,
 getAllContacts,
 removeContact
} = require("../controllers/contactController");


router.post("/", submitContact);


/* ADMIN */

router.get("/admin", verifyToken, isAdmin, getAllContacts);

router.delete("/:id", verifyToken, isAdmin, removeContact);


module.exports = router;