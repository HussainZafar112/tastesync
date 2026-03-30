import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Search,
  Star,
  MapPin,
  TrendingUp,
  Users,
  UtensilsCrossed,
  ChefHat,
  MessageCircle,
  Shield,
  Sparkles,
  Zap,
  Heart,
  Clock,
} from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import './Landing.css';

// Mock trending restaurant data
const trendingRestaurants = [
  {
    id: 1,
    name: 'The Spice Garden',
    cuisine: 'Indian • Pakistani',
    rating: 4.8,
    reviews: 342,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
    location: 'Gulberg, Lahore',
    priceRange: '$$',
    badge: 'Trending',
  },
  {
    id: 2,
    name: 'Sakura Ramen House',
    cuisine: 'Japanese • Ramen',
    rating: 4.9,
    reviews: 218,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop',
    location: 'F-7, Islamabad',
    priceRange: '$$$',
    badge: 'Top Rated',
  },
  {
    id: 3,
    name: 'Olive & Thyme',
    cuisine: 'Mediterranean • Italian',
    rating: 4.7,
    reviews: 189,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
    location: 'DHA Phase 5, Karachi',
    priceRange: '$$$',
    badge: 'New',
  },
  {
    id: 4,
    name: 'Street Bites Co.',
    cuisine: 'Street Food • Fusion',
    rating: 4.6,
    reviews: 456,
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=300&fit=crop',
    location: 'Johar Town, Lahore',
    priceRange: '$',
    badge: 'Popular',
  },
];

// Mock recent reviews
const recentReviews = [
  {
    id: 1,
    user: 'Ahmed K.',
    avatar: 'AK',
    restaurant: 'The Spice Garden',
    rating: 5,
    text: 'The biryani here is absolutely phenomenal! Authentic flavors that remind me of home cooking but elevated to restaurant quality.',
    time: '2h ago',
  },
  {
    id: 2,
    user: 'Sara M.',
    avatar: 'SM',
    restaurant: 'Sakura Ramen House',
    rating: 5,
    text: 'Best ramen in the city, hands down. The tonkotsu broth is rich and creamy. Will definitely be coming back!',
    time: '4h ago',
  },
  {
    id: 3,
    user: 'Hassan R.',
    avatar: 'HR',
    restaurant: 'Olive & Thyme',
    rating: 4,
    text: 'Great ambiance and the pasta was cooked perfectly al dente. The tiramisu was the highlight of our meal.',
    time: '6h ago',
  },
];

const Landing = () => {
  return (
    <div className="landing-page">
      <Navbar />

      {/* ============ HERO ============ */}
      <section className="hero" id="hero">
        <div className="hero-bg">
          <div className="hero-orb hero-orb-1"></div>
          <div className="hero-orb hero-orb-2"></div>
          <div className="hero-orb hero-orb-3"></div>
          <div className="hero-grid"></div>
        </div>

        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles size={14} />
              <span>The #1 Food Discovery Platform</span>
            </div>

            <h1 className="hero-title">
              Discover, Review &<br />
              <span className="text-gradient">Share Your Flavor</span>
            </h1>

            <p className="hero-subtitle">
              Join thousands of food lovers sharing their culinary experiences.
              Find the best restaurants, post honest reviews, and connect with
              a vibrant community — all in one place.
            </p>

            <div className="hero-search">
              <div className="hero-search-box">
                <Search size={20} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search restaurants, cuisines, or dishes..."
                  id="hero-search-input"
                />
                <button className="hero-search-btn" id="hero-search-btn">
                  Search
                </button>
              </div>
              <div className="hero-search-tags">
                <span>Popular:</span>
                <button className="search-tag">Biryani</button>
                <button className="search-tag">Pizza</button>
                <button className="search-tag">Sushi</button>
                <button className="search-tag">Burgers</button>
                <button className="search-tag">Desserts</button>
              </div>
            </div>

            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-number">12K+</span>
                <span className="hero-stat-label">Active Foodies</span>
              </div>
              <div className="hero-stat-divider"></div>
              <div className="hero-stat">
                <span className="hero-stat-number">3.5K+</span>
                <span className="hero-stat-label">Restaurants</span>
              </div>
              <div className="hero-stat-divider"></div>
              <div className="hero-stat">
                <span className="hero-stat-number">48K+</span>
                <span className="hero-stat-label">Reviews</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card hero-card-main">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=500&fit=crop"
                alt="Delicious food"
                className="hero-card-img"
              />
              <div className="hero-card-overlay">
                <div className="hero-card-rating">
                  <Star size={14} fill="var(--accent)" color="var(--accent)" />
                  <span>4.9</span>
                </div>
              </div>
            </div>
            <div className="hero-card hero-card-float-1">
              <div className="float-card-content">
                <div className="float-card-icon">
                  <TrendingUp size={16} />
                </div>
                <div>
                  <span className="float-card-label">Trending Now</span>
                  <span className="float-card-value">The Spice Garden</span>
                </div>
              </div>
            </div>
            <div className="hero-card hero-card-float-2">
              <div className="float-card-content">
                <div className="float-card-icon review-icon">
                  <MessageCircle size={16} />
                </div>
                <div>
                  <span className="float-card-label">New Review</span>
                  <span className="float-card-value">"Amazing biryani! 🔥"</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section className="features" id="features">
        <div className="section-container">
          <div className="section-header">
            <span className="section-badge">Why TasteSync</span>
            <h2>Everything you need to<br /><span className="text-gradient">discover great food</span></h2>
            <p>From social feeds to restaurant management — we&apos;ve built every feature food lovers and restaurant owners need.</p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-card-icon">
                <Zap size={24} />
              </div>
              <h3>Social Food Feed</h3>
              <p>A dynamic, Twitter-like timeline dedicated to food. Post reviews, share photos, and engage with the community in real time.</p>
            </div>
            <div className="feature-card">
              <div className="feature-card-icon accent">
                <Search size={24} />
              </div>
              <h3>Restaurant Directory</h3>
              <p>Discover restaurants with searchable profiles, digital menus, ratings, and reviews — all organized and easy to browse.</p>
            </div>
            <div className="feature-card">
              <div className="feature-card-icon purple">
                <ChefHat size={24} />
              </div>
              <h3>Digital Menus</h3>
              <p>Browse categorized menus with dish-specific reviews. Know exactly what to order before you even walk in.</p>
            </div>
            <div className="feature-card">
              <div className="feature-card-icon green">
                <Shield size={24} />
              </div>
              <h3>Owner Dashboard</h3>
              <p>Restaurant owners get a powerful dashboard to manage menus, respond to reviews, and track analytics.</p>
            </div>
            <div className="feature-card">
              <div className="feature-card-icon pink">
                <Heart size={24} />
              </div>
              <h3>Save & Bookmark</h3>
              <p>Save your favorite restaurants and posts. Build your personal collection of culinary discoveries.</p>
            </div>
            <div className="feature-card">
              <div className="feature-card-icon cyan">
                <Users size={24} />
              </div>
              <h3>Community</h3>
              <p>Follow fellow foodies, comment on reviews, and build connections around your shared love for great food.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TRENDING RESTAURANTS ============ */}
      <section className="trending" id="trending">
        <div className="section-container">
          <div className="section-header-row">
            <div>
              <span className="section-badge">Trending Now</span>
              <h2>Popular <span className="text-gradient">Restaurants</span></h2>
              <p>Discover what&apos;s hot in the food scene right now</p>
            </div>
            <Link to="/restaurants" className="view-all-btn">
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="restaurant-grid">
            {trendingRestaurants.map((restaurant) => (
              <Link to={`/restaurants/${restaurant.id}`} className="restaurant-card" key={restaurant.id}>
                <div className="restaurant-card-img">
                  <img src={restaurant.image} alt={restaurant.name} />
                  <span className={`restaurant-badge ${restaurant.badge.toLowerCase().replace(' ', '-')}`}>
                    {restaurant.badge}
                  </span>
                  <button className="restaurant-heart" aria-label="Save restaurant">
                    <Heart size={16} />
                  </button>
                </div>
                <div className="restaurant-card-body">
                  <div className="restaurant-card-top">
                    <h3>{restaurant.name}</h3>
                    <div className="restaurant-rating">
                      <Star size={14} fill="var(--accent)" color="var(--accent)" />
                      <span>{restaurant.rating}</span>
                    </div>
                  </div>
                  <p className="restaurant-cuisine">{restaurant.cuisine}</p>
                  <div className="restaurant-card-meta">
                    <span><MapPin size={13} /> {restaurant.location}</span>
                    <span>{restaurant.priceRange}</span>
                  </div>
                  <div className="restaurant-card-footer">
                    <span>{restaurant.reviews} reviews</span>
                    <span className="card-arrow"><ArrowRight size={14} /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="how-it-works" id="how-it-works">
        <div className="section-container">
          <div className="section-header">
            <span className="section-badge">How It Works</span>
            <h2>Get started in <span className="text-gradient">3 simple steps</span></h2>
            <p>Whether you&apos;re a foodie or a restaurant owner, getting started is quick and easy.</p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">01</div>
              <div className="step-card-icon">
                <Users size={28} />
              </div>
              <h3>Create Account</h3>
              <p>Sign up as a food lover or restaurant owner. It&apos;s free and takes less than a minute.</p>
            </div>
            <div className="step-connector">
              <ArrowRight size={20} />
            </div>
            <div className="step-card">
              <div className="step-number">02</div>
              <div className="step-card-icon">
                <Search size={28} />
              </div>
              <h3>Explore & Discover</h3>
              <p>Browse restaurants, scroll the food feed, and find your next favorite dish or dining spot.</p>
            </div>
            <div className="step-connector">
              <ArrowRight size={20} />
            </div>
            <div className="step-card">
              <div className="step-number">03</div>
              <div className="step-card-icon">
                <MessageCircle size={28} />
              </div>
              <h3>Review & Share</h3>
              <p>Post reviews with photos, rate dishes, and share your culinary adventures with the community.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ RECENT REVIEWS ============ */}
      <section className="reviews-section" id="reviews">
        <div className="section-container">
          <div className="section-header-row">
            <div>
              <span className="section-badge">Community</span>
              <h2>Latest <span className="text-gradient">Reviews</span></h2>
              <p>See what the community is saying</p>
            </div>
            <Link to="/feed" className="view-all-btn">
              View Feed <ArrowRight size={16} />
            </Link>
          </div>

          <div className="reviews-grid">
            {recentReviews.map((review) => (
              <div className="review-card" key={review.id}>
                <div className="review-card-header">
                  <div className="review-author">
                    <div className="review-avatar">{review.avatar}</div>
                    <div>
                      <span className="review-name">{review.user}</span>
                      <span className="review-meta">
                        reviewed <strong>{review.restaurant}</strong>
                      </span>
                    </div>
                  </div>
                  <span className="review-time">
                    <Clock size={13} /> {review.time}
                  </span>
                </div>
                <div className="review-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={15}
                      fill={i < review.rating ? 'var(--accent)' : 'transparent'}
                      color={i < review.rating ? 'var(--accent)' : 'var(--text-muted)'}
                    />
                  ))}
                </div>
                <p className="review-text">{review.text}</p>
                <div className="review-actions">
                  <button className="review-action-btn">
                    <Heart size={14} /> Like
                  </button>
                  <button className="review-action-btn">
                    <MessageCircle size={14} /> Reply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="cta-section" id="cta">
        <div className="section-container">
          <div className="cta-card">
            <div className="cta-bg-orb cta-orb-1"></div>
            <div className="cta-bg-orb cta-orb-2"></div>
            <div className="cta-content">
              <h2>Ready to discover your next <span className="text-gradient">favorite meal</span>?</h2>
              <p>Join the TasteSync community today. It&apos;s free to get started.</p>
              <div className="cta-buttons">
                <Link to="/register" className="cta-btn cta-btn-primary" id="cta-register">
                  Get Started Free <ArrowRight size={18} />
                </Link>
                <Link to="/restaurants" className="cta-btn cta-btn-ghost" id="cta-explore">
                  Explore Restaurants
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
