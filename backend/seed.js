require('dotenv').config();
const mongoose = require('mongoose');
const Post = require('./models/Post'); // Adjust if your path is different
const User = require('./models/User'); // Needed for author assignment

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected for seeding"))
  .catch(err => console.error("Mongo error", err));

const seedPosts = async () => {
  await Post.deleteMany(); // optional: clear existing posts

  const user = await User.findOne(); // use first user as author

  if (!user) {
    console.log('No users found. Please register a user first.');
    return;
  }

  const dummyPosts = [
    {
      title: 'Exploring the Mountains',
      content: 'Mountains offer breathtaking views and peaceful vibes...',
      category: 'Travel',
      author: user._id
    },
    {
      title: '10 Tips for React Beginners',
      content: 'React is a powerful library. To get started...',
      category: 'Programming',
      author: user._id
    },
    {
      title: 'Healthy Eating Habits',
      content: 'Eating healthy improves your mood and energy...',
      category: 'Health',
      author: user._id
    }
  ];

  await Post.insertMany(dummyPosts);
  console.log("Dummy posts added.");
  mongoose.disconnect();
};

seedPosts();
