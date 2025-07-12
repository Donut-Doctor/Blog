const express = require("express");
const router = express.Router();
const { loginUser, registerUser } = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser); // ✅ DO NOT CALL loginUser()

module.exports = router;
