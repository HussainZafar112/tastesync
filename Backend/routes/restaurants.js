const express = require('express');
const {
  getRestaurants,
  getTrendingRestaurants,
  getRestaurantById,
  createRestaurant,
  getMyRestaurants,
  deleteRestaurant,
} = require('../controllers/restaurantController');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get('/', getRestaurants);
router.get('/trending', getTrendingRestaurants);
router.get('/my', auth, getMyRestaurants);
router.get('/:id', getRestaurantById);
router.post('/', auth, createRestaurant);
router.delete('/:id', auth, deleteRestaurant);

module.exports = router;
