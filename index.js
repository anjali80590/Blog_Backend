// const express = require("express");
// const dotenv = require("dotenv");
// const connectDB = require("./config/db");
// const cors = require("cors");
// const { errorHandler } = require("./middlewares/errorHandler");

// const authRoutes = require("./routes/authRoutes");
// const postRoutes = require("./routes/postRoutes");
// const commentRoutes = require("./routes/commentRoutes");

// dotenv.config();

// connectDB();

// const app = express();

// const corsOptions = {
//   origin: "http://localhost:3000", // Replace with your frontend URL
//   methods: "GET,POST,PUT,DELETE,OPTIONS",
//   allowedHeaders: "Content-Type,Authorization",
// };

// app.use(cors(corsOptions));
// app.options('*', cors(corsOptions)); // Enable preflight requests for all routes

// app.use(express.json());

// app.use(errorHandler)
// app.get("/", (req, res) => {
//   res.json("Welcome");
// });

// app.use("/api/auth", authRoutes);
// app.use("/api/posts", postRoutes);
// app.use("/api/comments", commentRoutes);

// app.use(errorHandler);

// const PORT = process.env.PORT;

// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });
// module.exports = app;
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { errorHandler } = require("./middlewares/errorHandler");

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");

dotenv.config();

connectDB();

const app = express();

// Configure CORS
const corsOptions = {
  origin: "*", // Replace with your frontend URL
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));



app.use(express.json());

app.get("/", (req, res) => {
  res.json("Welcome");
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
