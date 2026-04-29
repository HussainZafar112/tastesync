const Post = require('../models/Post');

// Get all posts for the feed
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'fullName avatar username')
      .sort({ createdAt: -1 }); // Newest first
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create a new post/review
const createPost = async (req, res) => {
  try {
    const { text, restaurantName, rating, image } = req.body;
    
    const post = await Post.create({
      user: req.user._id,
      text,
      restaurantName,
      rating,
      image
    });

    const populatedPost = await Post.findById(post._id).populate('user', 'fullName avatar username');
    res.status(201).json(populatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Like a post
const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    // Check if user already liked it
    if (post.likes.includes(req.user._id)) {
      post.likes = post.likes.filter(id => id.toString() !== req.user._id.toString());
    } else {
      post.likes.push(req.user._id);
    }

    await post.save();
    res.json(post.likes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getPosts, createPost, likePost };
