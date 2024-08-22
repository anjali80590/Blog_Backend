const express = require("express");
const {
  createComment,
  getCommentsByPostId,
  deleteComment,
} = require("../controllers/commentController");
const { protect } = require("../middlewares/authMiddleware");
const { commentValidation, validateResult } = require("../utils/validators");

const router = express.Router();

router.post("/", protect, commentValidation, validateResult, createComment);
router.get("/:id", protect, getCommentsByPostId);
router.delete("/:id", protect, deleteComment);

module.exports = router;
