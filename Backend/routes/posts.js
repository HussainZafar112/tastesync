const express = require('express');
const router = express.Router();
const { getPosts, createPost, likePost } = require('../controllers/postController');
const { auth } = require('../middleware/auth'); 

router.get('/', getPosts);
router.post('/', auth, createPost);
router.put('/:id/like', auth, likePost);

module.exports = router;
