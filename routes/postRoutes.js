const express = require("express");
const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  getPostsByUserId,
  deletePost,
} = require("../controllers/postController"); 
const { protect } = require("../middlewares/authMiddleware");
const { postValidation, validateResult } = require("../utils/validators");

const router = express.Router();

router.post("/", protect, postValidation, validateResult, createPost);
router.get("/", getPosts);
router.get("/:id", protect, getPostById);
router.put("/:id", protect, postValidation, validateResult, updatePost);
router.delete("/:id", protect, deletePost);
router.get("/user/:userId", protect, getPostsByUserId);
module.exports = router;
