const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let posts = [];

app.get("/", (req, res) => {
  res.send("Blog Platform API Running");
});

app.get("/posts", (req, res) => {
  res.json(posts);
});

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

app.put("/posts/:id", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  post.title = req.body.title;
  post.content = req.body.content;

  res.json(post);
});

app.delete("/posts/:id", (req, res) => {
  posts = posts.filter(p => p.id != req.params.id);
  res.json({ message: "Post deleted" });
});

app.post("/posts/:id/comments", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  post.comments.push(req.body.comment);

  res.json(post);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});