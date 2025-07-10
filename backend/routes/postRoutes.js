const express = require('express');
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
