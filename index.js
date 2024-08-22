const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const { errorHandler } = require("./middlewares/errorHandler");

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");

dotenv.config();

connectDB();

const app = express();
const corsOptions = {
  origin: "https://blogapplication21.onrender.com", // Replace with your actual frontend URL
  credentials: true, // if your API uses cookies or sessions
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json("Welcome");
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

app.use(errorHandler);

const PORT = process.env.PORT;

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  
})
module.exports=app;