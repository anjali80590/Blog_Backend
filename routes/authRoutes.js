// routes/authRoutes.js
const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const {
  registerValidation,
  loginValidation,
  validateResult,
} = require("../utils/validators");

const router = express.Router();

router.post("/register", registerValidation, validateResult, registerUser);
router.post("/login", loginValidation, validateResult, loginUser);
router.get("/profile", protect, getUserProfile);

module.exports = router;
