const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let users = [];
let posts = [];

// Home
app.get("/", (req, res) => {
  res.send("Blog Platform API Running");
});

// Register
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  const user = {
    id: Date.now(),
    username,
    password
  };

  users.push(user);

  res.json({
    message: "User registered successfully",
    user
  });
});

// Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials"
    });
  }

  res.json({
    message: "Login successful"
  });
});

// Get Posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

// Create Post
app.post("/posts", (req, res) => {
  const post = {
    id: Date.now(),
    title: req.body.title,
    content: req.body.content,
    comments: []
  };

  posts.push(post);

  res.json(post);
});

// Edit Post
app.put("/posts/:id", (req, res) => {
  const post = posts.find(
    p => p.id == req.params.id
  );

  if (!post) {
    return res.status(404).json({
      message: "Post not found"
    });
  }

  post.title = req.body.title;
  post.content = req.body.content;

  res.json(post);
});

// Delete Post
app.delete("/posts/:id", (req, res) => {
  posts = posts.filter(
    p => p.id != req.params.id
  );

  res.json({
    message: "Post deleted"
  });
});

// Add Comment
app.post("/posts/:id/comments", (req, res) => {
  const post = posts.find(
    p => p.id == req.params.id
  );

  if (!post) {
    return res.status(404).json({
      message: "Post not found"
    });
  }

  post.comments.push(req.body.comment);

  res.json(post);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});