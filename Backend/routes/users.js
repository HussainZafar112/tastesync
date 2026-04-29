const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const { auth } = require('../middleware/auth');

router.route('/profile')
  .get(auth, getUserProfile)
  .put(auth, updateUserProfile);

module.exports = router;
