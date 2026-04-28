const Restaurant = require('../models/Restaurant');

// @desc    Get all approved restaurants (with optional search/filter)
// @route   GET /api/restaurants
// @access  Public
const getRestaurants = async (req, res) => {
  try {
    const { search, category } = req.query;
    
    let query = { status: 'approved' };
    
    // Add category filter
    if (category && category !== 'all') {
      query.category = category;
    }
    
    // Add search filter (name, cuisine, or location)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { cuisine: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
      ];
    }

    const restaurants = await Restaurant.find(query).sort({ createdAt: -1 });
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get trending/top-rated restaurants for landing page
// @route   GET /api/restaurants/trending
// @access  Public
const getTrendingRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({ status: 'approved' })
      .sort({ rating: -1, reviewCount: -1 })
      .limit(4);
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get a single restaurant by ID
// @route   GET /api/restaurants/:id
// @access  Public
const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).populate('owner', 'fullName username');
    
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    
    res.json(restaurant);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create a new restaurant (Owner only)
// @route   POST /api/restaurants
// @access  Private
const createRestaurant = async (req, res) => {
  try {
    // Basic check for owner role
    if (req.user.role !== 'owner' && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only owners can create restaurants' });
    }

    const newRestaurant = new Restaurant({
      ...req.body,
      owner: req.user._id,
      status: 'approved', // Auto approve for testing
    });

    const restaurant = await newRestaurant.save();
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getRestaurants,
  getTrendingRestaurants,
  getRestaurantById,
  createRestaurant,
};
