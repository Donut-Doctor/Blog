const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Post = require("../models/Post");
const User = require("../models/User");

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function seedPosts() {
  try {
    const user = await User.findOne(); // Assuming at least 1 user exists
    if (!user) return console.log("Please create a user first");

    const posts = [
      {
        title: "Into the Forest: A Day with Nature",
        content: "The sun streamed through the tall pines...",
        category: "Nature",
        image: "forest.jpg",
        author: user._id,
      },
      {
        title: "Chasing Sunsets in Santorini",
        content: "Blue domes, whitewashed houses, and golden horizons...",
        category: "Travel",
        image: "santorini.jpg",
        author: user._id,
      },
      {
        title: "Urban Symphony: Life in Tokyo",
        content: "Neon signs, bullet trains, and ramen at midnight...",
        category: "Urban",
        image: "tokyo.jpg",
        author: user._id,
      },
    ];

    await Post.insertMany(posts);
    console.log("Seeded blog posts successfully.");
    process.exit();
  } catch (err) {
    console.error("Failed to seed posts", err);
    process.exit(1);
  }
}

seedPosts();
