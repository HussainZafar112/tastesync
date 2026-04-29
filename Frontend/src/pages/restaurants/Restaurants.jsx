import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import './Restaurants.css';

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
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  // Debounced search
  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      try {
        let url = `http://localhost:5000/api/restaurants?category=${activeCategory}`;
        if (search) url += `&search=${search}`;
        
        const res = await fetch(url);
        const data = await res.json();
        setRestaurants(data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchRestaurants();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search, activeCategory]);

  const filtered = restaurants; // Filtering is done by backend now

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
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-orange" role="status"></div>
            </div>
          ) : filtered.length > 0 ? (
            <div className="row g-4">
              {filtered.map((restaurant) => (
                <div className="col-md-6 col-lg-3" key={restaurant._id}>
                  <Link to={`/restaurants/${restaurant._id}`} className="text-decoration-none">
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
                          <span className="text-secondary">{restaurant.reviewCount || 0} reviews</span>
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
