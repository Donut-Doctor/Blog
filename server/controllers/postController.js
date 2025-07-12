const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const image = req.file ? req.file.filename : null;
    const newPost = new Post({
      title,
      content,
      category,
      image,
      author: req.userId,
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).populate("author", "username");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "username");
    res.json(post);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.author.toString() !== req.userId) {
      return res.status(403).json({ msg: "Unauthorized" });
    }

    const updatedData = {
      title: req.body.title || post.title,
      content: req.body.content || post.content,
      category: req.body.category || post.category,
    };

    if (req.file) updatedData.image = req.file.filename;

    const updated = await Post.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.author.toString() !== req.userId) {
      return res.status(403).json({ msg: "Unauthorized" });
    }
    await post.deleteOne();
    res.json({ msg: "Post deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getPostsByCategory = async (req, res) => {
  try {
    const posts = await Post.find({ category: req.params.name }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.searchPosts = async (req, res) => {
  try {
    const query = req.query.q;
    const posts = await Post.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
      ],
    }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
