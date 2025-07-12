// server/routes/postRoutes.js
const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostsByCategory,
  searchPosts,
} = require("../controllers/postController");

// Public
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.get("/category/:name", getPostsByCategory);
router.get("/search", searchPosts);

// Protected
router.post("/", protect, upload.single("image"), createPost);
router.put("/:id", protect, upload.single("image"), updatePost);
router.delete("/:id", protect, deletePost);

module.exports = router;
