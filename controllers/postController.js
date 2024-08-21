const Post = require("../models/Post");
const { validationResult } = require("express-validator");

// Create a new post
exports.createPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Excerpt is mandatory, so it must be provided in the request
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      excerpt: req.body.excerpt, // Must be provided
      author: req.user.id,
    });

    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name");
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get post by ID
// Get post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "name");
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if the authenticated user is the author
    if (post.author._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update a post
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

    // Check if user is the author
    if (post.author.toString() !== req.user.id) {
      return res.status(401).json({ error: "User not authorized" });
    }

    // Update fields
    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    post.excerpt = req.body.excerpt || post.excerpt; // Must be provided

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    // Find the post by ID and delete it
    const result = await Post.deleteOne({ _id: req.params.id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Optionally: Check if user is the author
    // You may need to fetch the post again to ensure it's the right one
    // const post = await Post.findById(req.params.id);
    // if (post.author.toString() !== req.user.id) {
    //   return res.status(401).json({ error: "User not authorized" });
    // }

    res.json({ message: "Post removed" });
  } catch (err) {
    console.log(err); // Log the error for debugging
    res.status(500).json({ error: "Server error" });
  }
};

// Get posts by user ID
exports.getPostsByUserId = async (req, res) => {
  try {
    const { userId } = req.params; // Get user ID from URL params

    // Fetch posts only by the user with the given ID
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
