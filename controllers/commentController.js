const Comment = require("../models/Comment");
const Post = require("../models/Post");
const { validationResult } = require("express-validator");

// Create a new comment
exports.createComment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const post = await Post.findById(req.body.post);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const comment = new Comment({
      content: req.body.content,
      post: req.body.post,
      author: req.user.id,
    });

    await comment.save();

    post.comments.push(comment);
    await post.save();

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get comments for a post
exports.getCommentsByPostId = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.id }).populate(
      "author",
      "name"
    );
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the comment by its ID
    const comment = await Comment.findByIdAndDelete(id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Remove the comment ID from associated posts
    await Post.updateMany({ comments: id }, { $pull: { comments: id } });

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
