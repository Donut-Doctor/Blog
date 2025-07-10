const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const post = new Post({ title, content, category, author: req.userId });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: 'Post creation failed' });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const { category, search } = req.query;
    const query = {};

    if (category) query.category = category;
    if (search) query.title = { $regex: search, $options: 'i' };

    const posts = await Post.find(query).populate('author', 'username');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Fetching posts failed' });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username');
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Fetching post failed' });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post || post.author.toString() !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const { title, content, category } = req.body;
    post.title = title;
    post.content = content;
    post.category = category;
    await post.save();

    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Update failed' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post || post.author.toString() !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    await post.remove();
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
};
