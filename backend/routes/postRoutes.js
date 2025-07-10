const express = require('express');
const Post = require('../models/Post');

// GET all unique categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Post.distinct('category');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
});

const {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost
} = require('../controllers/postController');

const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.get('/', getAllPosts);
router.get('/:id', getPost);
router.post('/', verifyToken, createPost);
router.put('/:id', verifyToken, updatePost);
router.delete('/:id', verifyToken, deletePost);

module.exports = router;
