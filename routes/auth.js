const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

router.post("/signUp", authController.postSignup);

// routes/auth.js
router.post("/login", authController.postLogin);

//router.post("/logout",authController.postLogout);
module.exports = router;
