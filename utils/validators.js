const { check, validationResult } = require("express-validator");

exports.registerValidation = [
  check("name", "Name is required").not().isEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
];

exports.loginValidation = [
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password is required").exists(),
];

exports.postValidation = [
  check("title", "Title is required").not().isEmpty(),
  check("content", "Content is required").not().isEmpty(),
  check("excerpt", "Excerpt is required").not().isEmpty(),
];

exports.commentValidation = [
  check("content", "Content is required").not().isEmpty(),
  check("post", "Post ID is required").not().isEmpty(),
];

exports.validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
