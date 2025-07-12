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


router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.get("/category/:name", getPostsByCategory);
router.get("/search", searchPosts);


router.post("/", protect, upload.single("image"), createPost);
router.put("/:id", protect, upload.single("image"), updatePost);
router.delete("/:id", protect, deletePost);

router.get('/category/:name', async (req, res) => {
  try {
    const posts = await Post.find({ category: req.params.name }).populate("author", "username");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching posts by category" });
  }
});

module.exports = router;
