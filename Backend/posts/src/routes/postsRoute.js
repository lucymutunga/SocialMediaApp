const express = require("express");
const router = express.Router();

const {
  createPost,
  getPosts,
  getPostById,
  getPostsByUserId,
  deletePost,
} = require("../controllers/postsController");

router.post("/post", createPost);
router.get("/posts", getPosts);
router.get("/post/:post_id", getPostById);
router.get("/posts/user", getPostsByUserId);
router.delete("/post/:post_id", deletePost);

module.exports = router;
