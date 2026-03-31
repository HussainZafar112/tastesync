import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import './Restaurants.css';

const allRestaurants = [
  { id: 1, name: 'The Spice Garden', cuisine: 'Indian • Pakistani', rating: 4.8, reviews: 342, image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop', location: 'Gulberg, Lahore', priceRange: '$$', category: 'indian' },
  { id: 2, name: 'Sakura Ramen House', cuisine: 'Japanese • Ramen', rating: 4.9, reviews: 218, image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop', location: 'F-7, Islamabad', priceRange: '$$$', category: 'japanese' },
  { id: 3, name: 'Olive & Thyme', cuisine: 'Mediterranean • Italian', rating: 4.7, reviews: 189, image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop', location: 'DHA Phase 5, Karachi', priceRange: '$$$', category: 'italian' },
  { id: 4, name: 'Street Bites Co.', cuisine: 'Street Food • Fusion', rating: 4.6, reviews: 456, image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=300&fit=crop', location: 'Johar Town, Lahore', priceRange: '$', category: 'street' },
  { id: 5, name: 'The Urban Grill', cuisine: 'American • BBQ', rating: 4.5, reviews: 312, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop', location: 'Blue Area, Islamabad', priceRange: '$$', category: 'american' },
  { id: 6, name: 'Café Aroma', cuisine: 'Café • Bakery', rating: 4.4, reviews: 178, image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop', location: 'M.M. Alam Road, Lahore', priceRange: '$$', category: 'cafe' },
  { id: 7, name: 'Karachi Biryani House', cuisine: 'Pakistani • Biryani', rating: 4.7, reviews: 521, image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop', location: 'Saddar, Karachi', priceRange: '$', category: 'indian' },
  { id: 8, name: 'Dragon Palace', cuisine: 'Chinese • Thai', rating: 4.3, reviews: 145, image: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400&h=300&fit=crop', location: 'Gulshan, Karachi', priceRange: '$$', category: 'chinese' },
];

const categories = [
  { key: 'all', label: 'All' },
  { key: 'indian', label: 'Indian / Pakistani' },
  { key: 'italian', label: 'Italian' },
  { key: 'japanese', label: 'Japanese' },
  { key: 'chinese', label: 'Chinese' },
  { key: 'american', label: 'American' },
  { key: 'cafe', label: 'Café' },
  { key: 'street', label: 'Street Food' },
];

const Restaurants = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = allRestaurants.filter((r) => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(search.toLowerCase()) ||
      r.location.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === 'all' || r.category === activeCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div>
      <Navbar />

      {/* Header */}
      <section className="bg-light py-5">
        <div className="container text-center">
          <h1 className="fw-bold mb-2">
            Explore <span className="text-orange">Restaurants</span>
          </h1>
          <p className="text-secondary mb-4">Find your next favorite dining spot from our curated collection</p>

          {/* Search */}
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="input-group input-group-lg shadow-sm rounded-pill overflow-hidden">
                <span className="input-group-text bg-white border-0">
                  <i className="bi bi-search text-secondary"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-0"
                  placeholder="Search by name, cuisine, or location..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  id="restaurant-search"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter + Grid */}
      <section className="py-5">
        <div className="container">
          {/* Category Pills */}
          <div className="d-flex flex-wrap gap-2 mb-4">
            {categories.map((cat) => (
              <button
                key={cat.key}
                className={`btn btn-sm rounded-pill ${activeCategory === cat.key ? 'btn-orange' : 'btn-outline-secondary'}`}
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <p className="text-secondary small mb-3">{filtered.length} restaurants found</p>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="row g-4">
              {filtered.map((restaurant) => (
                <div className="col-md-6 col-lg-3" key={restaurant.id}>
                  <Link to={`/restaurants/${restaurant.id}`} className="text-decoration-none">
                    <div className="card border-0 shadow-sm card-hover h-100">
                      <div className="position-relative">
                        <img src={restaurant.image} className="card-img-top" alt={restaurant.name} style={{ height: '180px', objectFit: 'cover' }} />
                        <button className="btn btn-sm btn-light rounded-circle position-absolute top-0 end-0 m-2" aria-label="Save">
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
                        <div className="d-flex justify-content-between small text-secondary">
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
          ) : (
            <div className="text-center py-5">
              <i className="bi bi-search fs-1 text-secondary mb-3 d-block"></i>
              <h5 className="text-secondary">No restaurants found</h5>
              <p className="text-secondary small">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Restaurants;
