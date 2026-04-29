const User = require('../models/User');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.fullName = req.body.fullName || user.fullName;
      user.email = req.body.email || user.email;
      user.bio = req.body.bio !== undefined ? req.body.bio : user.bio;
      user.location = req.body.location !== undefined ? req.body.location : user.location;
      user.phone = req.body.phone !== undefined ? req.body.phone : user.phone;
      user.website = req.body.website !== undefined ? req.body.website : user.website;
      user.favCuisine = req.body.favCuisine !== undefined ? req.body.favCuisine : user.favCuisine;
      user.avatar = req.body.avatar !== undefined ? req.body.avatar : user.avatar;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        fullName: updatedUser.fullName,
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role,
        bio: updatedUser.bio,
        location: updatedUser.location,
        phone: updatedUser.phone,
        website: updatedUser.website,
        favCuisine: updatedUser.favCuisine,
        avatar: updatedUser.avatar,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
};
