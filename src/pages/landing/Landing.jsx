import { Link } from 'react-router-dom';
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
    <div>
      <Navbar />

      {/* ============ HERO ============ */}
      <section className="hero-section" id="hero">
        <div className="container">
          <div className="row align-items-center min-vh-75 py-5">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <span className="badge bg-warning text-dark mb-3 px-3 py-2 rounded-pill">
                <i className="bi bi-stars me-1"></i> The #1 Food Discovery Platform
              </span>
              <h1 className="display-4 fw-bold mb-3">
                Discover, Review &<br />
                <span className="text-orange">Share Your Flavor</span>
              </h1>
              <p className="text-secondary fs-5 mb-4">
                Join thousands of food lovers sharing their culinary experiences.
                Find the best restaurants, post honest reviews, and connect with
                a vibrant community — all in one place.
              </p>

              {/* Search Bar */}
              <div className="input-group input-group-lg mb-3 shadow-sm rounded-pill overflow-hidden">
                <span className="input-group-text bg-white border-0">
                  <i className="bi bi-search text-secondary"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-0"
                  placeholder="Search restaurants, cuisines, or dishes..."
                  id="hero-search-input"
                />
                <button className="btn btn-orange px-4" id="hero-search-btn">
                  Search
                </button>
              </div>

              <div className="d-flex flex-wrap gap-2 mb-4">
                <span className="text-secondary small me-1">Popular:</span>
                {['Biryani', 'Pizza', 'Sushi', 'Burgers', 'Desserts'].map((tag) => (
                  <button key={tag} className="btn btn-sm btn-outline-secondary rounded-pill">
                    {tag}
                  </button>
                ))}
              </div>

              {/* Stats */}
              <div className="d-flex gap-4">
                <div>
                  <div className="fw-bold fs-4">12K+</div>
                  <div className="text-secondary small">Active Foodies</div>
                </div>
                <div className="vr"></div>
                <div>
                  <div className="fw-bold fs-4">3.5K+</div>
                  <div className="text-secondary small">Restaurants</div>
                </div>
                <div className="vr"></div>
                <div>
                  <div className="fw-bold fs-4">48K+</div>
                  <div className="text-secondary small">Reviews</div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 text-center">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&h=600&fit=crop"
                alt="Delicious food"
                className="img-fluid rounded-4 shadow-lg hero-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section className="py-5 bg-light" id="features">
        <div className="container py-4">
          <div className="text-center mb-5">
            <span className="badge bg-orange-light text-orange rounded-pill px-3 py-2 mb-2">Why TasteSync</span>
            <h2 className="display-6 fw-bold">
              Everything you need to<br />
              <span className="text-orange">discover great food</span>
            </h2>
            <p className="text-secondary mx-auto" style={{ maxWidth: '600px' }}>
              From social feeds to restaurant management — we've built every feature food lovers and restaurant owners need.
            </p>
          </div>

          <div className="row g-4">
            {[
              { icon: 'bi-lightning-fill', title: 'Social Food Feed', desc: 'A dynamic, Twitter-like timeline dedicated to food. Post reviews, share photos, and engage with the community in real time.', color: 'text-primary' },
              { icon: 'bi-search', title: 'Restaurant Directory', desc: 'Discover restaurants with searchable profiles, digital menus, ratings, and reviews — all organized and easy to browse.', color: 'text-orange' },
              { icon: 'bi-book', title: 'Digital Menus', desc: 'Browse categorized menus with dish-specific reviews. Know exactly what to order before you even walk in.', color: 'text-purple' },
              { icon: 'bi-shield-check', title: 'Owner Dashboard', desc: 'Restaurant owners get a powerful dashboard to manage menus, respond to reviews, and track analytics.', color: 'text-success' },
              { icon: 'bi-heart-fill', title: 'Save & Bookmark', desc: 'Save your favorite restaurants and posts. Build your personal collection of culinary discoveries.', color: 'text-danger' },
              { icon: 'bi-people-fill', title: 'Community', desc: 'Follow fellow foodies, comment on reviews, and build connections around your shared love for great food.', color: 'text-info' },
            ].map((feature, i) => (
              <div className="col-md-6 col-lg-4" key={i}>
                <div className="card border-0 shadow-sm h-100 card-hover p-4">
                  <i className={`bi ${feature.icon} ${feature.color} fs-2 mb-3`}></i>
                  <h5 className="fw-bold">{feature.title}</h5>
                  <p className="text-secondary small mb-0">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TRENDING RESTAURANTS ============ */}
      <section className="py-5" id="trending">
        <div className="container py-4">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <span className="badge bg-orange-light text-orange rounded-pill px-3 py-2 mb-2">Trending Now</span>
              <h2 className="fw-bold">
                Popular <span className="text-orange">Restaurants</span>
              </h2>
              <p className="text-secondary mb-0">Discover what's hot in the food scene right now</p>
            </div>
            <Link to="/restaurants" className="btn btn-outline-orange d-none d-md-inline-flex align-items-center gap-1">
              View All <i className="bi bi-arrow-right"></i>
            </Link>
          </div>

          <div className="row g-4">
            {trendingRestaurants.map((restaurant) => (
              <div className="col-md-6 col-lg-3" key={restaurant.id}>
                <Link to={`/restaurants/${restaurant.id}`} className="text-decoration-none">
                  <div className="card border-0 shadow-sm card-hover h-100">
                    <div className="position-relative">
                      <img src={restaurant.image} className="card-img-top" alt={restaurant.name} style={{ height: '180px', objectFit: 'cover' }} />
                      <span className="badge bg-dark position-absolute top-0 start-0 m-2">{restaurant.badge}</span>
                      <button className="btn btn-sm btn-light rounded-circle position-absolute top-0 end-0 m-2" aria-label="Save restaurant">
                        <i className="bi bi-heart"></i>
                      </button>
                    </div>
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start">
                        <h6 className="fw-bold mb-1 text-dark">{restaurant.name}</h6>
                        <span className="badge bg-warning text-dark">
                          <i className="bi bi-star-fill me-1"></i>{restaurant.rating}
                        </span>
                      </div>
                      <p className="text-secondary small mb-2">{restaurant.cuisine}</p>
                      <div className="d-flex justify-content-between align-items-center small text-secondary">
                        <span><i className="bi bi-geo-alt me-1"></i>{restaurant.location}</span>
                        <span>{restaurant.priceRange}</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mt-2 pt-2 border-top small">
                        <span className="text-secondary">{restaurant.reviews} reviews</span>
                        <i className="bi bi-arrow-right text-orange"></i>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="py-5 bg-light" id="how-it-works">
        <div className="container py-4">
          <div className="text-center mb-5">
            <span className="badge bg-orange-light text-orange rounded-pill px-3 py-2 mb-2">How It Works</span>
            <h2 className="fw-bold">
              Get started in <span className="text-orange">3 simple steps</span>
            </h2>
            <p className="text-secondary">Whether you're a foodie or a restaurant owner, getting started is quick and easy.</p>
          </div>

          <div className="row g-4 justify-content-center">
            {[
              { step: '01', icon: 'bi-person-plus', title: 'Create Account', desc: "Sign up as a food lover or restaurant owner. It's free and takes less than a minute." },
              { step: '02', icon: 'bi-search', title: 'Explore & Discover', desc: 'Browse restaurants, scroll the food feed, and find your next favorite dish or dining spot.' },
              { step: '03', icon: 'bi-chat-left-text', title: 'Review & Share', desc: 'Post reviews with photos, rate dishes, and share your culinary adventures with the community.' },
            ].map((item, i) => (
              <div className="col-md-4" key={i}>
                <div className="text-center p-4">
                  <div className="step-number text-orange fw-bold mb-2">{item.step}</div>
                  <div className="bg-white rounded-circle d-inline-flex align-items-center justify-content-center shadow-sm mb-3" style={{ width: '70px', height: '70px' }}>
                    <i className={`bi ${item.icon} text-orange fs-3`}></i>
                  </div>
                  <h5 className="fw-bold">{item.title}</h5>
                  <p className="text-secondary small">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ RECENT REVIEWS ============ */}
      <section className="py-5" id="reviews">
        <div className="container py-4">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <span className="badge bg-orange-light text-orange rounded-pill px-3 py-2 mb-2">Community</span>
              <h2 className="fw-bold">
                Latest <span className="text-orange">Reviews</span>
              </h2>
              <p className="text-secondary mb-0">See what the community is saying</p>
            </div>
            <Link to="/feed" className="btn btn-outline-orange d-none d-md-inline-flex align-items-center gap-1">
              View Feed <i className="bi bi-arrow-right"></i>
            </Link>
          </div>

          <div className="row g-4">
            {recentReviews.map((review) => (
              <div className="col-md-4" key={review.id}>
                <div className="card border-0 shadow-sm card-hover h-100">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div className="d-flex align-items-center gap-2">
                        <div className="bg-orange text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '40px', height: '40px', fontSize: '0.8rem', backgroundColor: 'var(--ts-orange)' }}>
                          {review.avatar}
                        </div>
                        <div>
                          <div className="fw-semibold small">{review.user}</div>
                          <div className="text-secondary" style={{ fontSize: '0.75rem' }}>
                            reviewed <strong>{review.restaurant}</strong>
                          </div>
                        </div>
                      </div>
                      <span className="text-secondary" style={{ fontSize: '0.75rem' }}>
                        <i className="bi bi-clock me-1"></i>{review.time}
                      </span>
                    </div>
                    <div className="text-warning-stars mb-2">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className={`bi bi-star${i < review.rating ? '-fill' : ''}`} style={{ color: i < review.rating ? '#f59f00' : '#ddd' }}></i>
                      ))}
                    </div>
                    <p className="small text-secondary mb-3">{review.text}</p>
                    <div className="d-flex gap-3">
                      <button className="btn btn-sm btn-light"><i className="bi bi-heart me-1"></i>Like</button>
                      <button className="btn btn-sm btn-light"><i className="bi bi-chat me-1"></i>Reply</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-5" id="cta">
        <div className="container py-4">
          <div className="bg-dark text-white rounded-4 p-5 text-center">
            <h2 className="fw-bold mb-3">
              Ready to discover your next <span className="text-orange">favorite meal</span>?
            </h2>
            <p className="text-secondary mb-4 mx-auto" style={{ maxWidth: '500px' }}>
              Join the TasteSync community today. It's free to get started.
            </p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <Link to="/register" className="btn btn-orange btn-lg px-4" id="cta-register">
                Get Started Free <i className="bi bi-arrow-right ms-1"></i>
              </Link>
              <Link to="/restaurants" className="btn btn-outline-light btn-lg px-4" id="cta-explore">
                Explore Restaurants
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
