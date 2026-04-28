const express = require('express');
const {
  getRestaurants,
  getTrendingRestaurants,
  getRestaurantById,
  createRestaurant,
} = require('../controllers/restaurantController');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get('/', getRestaurants);
router.get('/trending', getTrendingRestaurants);
router.get('/:id', getRestaurantById);
router.post('/', auth, createRestaurant);

module.exports = router;
