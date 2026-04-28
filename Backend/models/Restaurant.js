const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, default: '' }
});

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  cuisine: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['indian', 'italian', 'japanese', 'chinese', 'american', 'cafe', 'street', 'other'],
    default: 'other',
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviewCount: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=400&fit=crop',
  },
  location: {
    type: String,
    required: true,
  },
  priceRange: {
    type: String,
    enum: ['$', '$$', '$$$', '$$$$'],
    default: '$$',
  },
  phone: {
    type: String,
    default: '',
  },
  hours: {
    type: String,
    default: 'Mon–Sun: 11:00 AM – 11:00 PM',
  },
  description: {
    type: String,
    default: '',
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  // We'll store menus as an object with category arrays: { "Starters": [menuItem], "Main Course": [menuItem] }
  menu: {
    type: Map,
    of: [menuItemSchema],
    default: {},
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'approved', // For testing without admin panel, setting default to approved
  },
  badge: {
    type: String,
    default: '',
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
