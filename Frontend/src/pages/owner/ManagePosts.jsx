import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const ManagePosts = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchMyRestaurants = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/restaurants/my', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setRestaurants(data);
        } else {
          setError(data.message || 'Failed to load restaurants');
        }
      } catch (err) {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    };
    fetchMyRestaurants();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this restaurant?')) return;
    try {
      setDeleteId(id);
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/restaurants/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setRestaurants(restaurants.filter((r) => r._id !== id));
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to delete');
      }
    } catch (err) {
      alert('Network error');
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div>
      <Navbar />

      <section className="py-5 bg-light min-vh-100">
        <div className="container">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="fw-bold mb-1">
                <i className="bi bi-journal-text me-2 text-orange"></i>Manage Posts
              </h2>
              <p className="text-secondary mb-0">View and manage all your listed restaurants</p>
            </div>
            <Link to="/add-restaurant" className="btn btn-orange">
              <i className="bi bi-plus-lg me-1"></i>Add New
            </Link>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-orange" role="status"></div>
            </div>
          ) : restaurants.length === 0 ? (
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center py-5">
                <i className="bi bi-shop display-1 text-secondary mb-3 d-block" style={{ opacity: 0.3 }}></i>
                <h5 className="fw-bold mb-2">No Restaurants Yet</h5>
                <p className="text-secondary mb-3">You haven't added any restaurants. Start by adding your first one!</p>
                <Link to="/add-restaurant" className="btn btn-orange">
                  <i className="bi bi-plus-lg me-1"></i>Add Restaurant
                </Link>
              </div>
            </div>
          ) : (
            <div className="row g-4">
              {restaurants.map((restaurant) => (
                <div className="col-md-6 col-lg-4" key={restaurant._id}>
                  <div className="card border-0 shadow-sm h-100">
                    <img
                      src={restaurant.image || 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=400&fit=crop'}
                      className="card-img-top"
                      alt={restaurant.name}
                      style={{ height: '180px', objectFit: 'cover' }}
                    />
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h6 className="fw-bold mb-0">{restaurant.name}</h6>
                        <span className={`badge ${restaurant.status === 'approved' ? 'bg-success' : restaurant.status === 'pending' ? 'bg-warning text-dark' : 'bg-danger'}`}>
                          {restaurant.status}
                        </span>
                      </div>
                      <p className="text-secondary small mb-2">
                        <i className="bi bi-geo-alt me-1"></i>{restaurant.location}
                      </p>
                      <div className="d-flex gap-2 mb-2">
                        <span className="badge bg-orange-subtle text-orange">{restaurant.cuisine}</span>
                        <span className="badge bg-light text-dark">{restaurant.priceRange}</span>
                      </div>
                      <div className="d-flex align-items-center gap-1 small text-secondary">
                        <i className="bi bi-star-fill text-warning"></i>
                        <span>{restaurant.rating?.toFixed(1) || '0.0'}</span>
                        <span>• {restaurant.reviewCount || 0} reviews</span>
                      </div>
                    </div>
                    <div className="card-footer bg-white border-top d-flex gap-2 p-3">
                      <Link to={`/restaurants/${restaurant._id}`} className="btn btn-sm btn-outline-secondary flex-fill">
                        <i className="bi bi-eye me-1"></i>View
                      </Link>
                      <button
                        className="btn btn-sm btn-outline-danger flex-fill"
                        onClick={() => handleDelete(restaurant._id)}
                        disabled={deleteId === restaurant._id}
                      >
                        {deleteId === restaurant._id ? (
                          <span className="spinner-border spinner-border-sm"></span>
                        ) : (
                          <><i className="bi bi-trash me-1"></i>Delete</>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ManagePosts;
