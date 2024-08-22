const Post = require("../models/Post");
const { validationResult } = require("express-validator");

exports.createPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      excerpt: req.body.excerpt,
      author: req.user.id,
    });

    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name");
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "name");
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.author._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.updatePost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.author.toString() !== req.user.id) {
      return res.status(401).json({ error: "User not authorized" });
    }

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    post.excerpt = req.body.excerpt || post.excerpt;
    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const result = await Post.deleteOne({ _id: req.params.id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json({ message: "Post removed" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getPostsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ author: userId }).populate(
      "author",
      "name"
    );
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
