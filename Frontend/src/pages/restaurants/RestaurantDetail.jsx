import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import './RestaurantDetail.css';

const RestaurantDetail = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeMenu, setActiveMenu] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({ rating: 0, text: '' });

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/restaurants/${id}`);
        const data = await res.json();
        
        if (!res.ok) throw new Error(data.message || 'Failed to fetch');
        
        setRestaurant(data);
        
        // Mock reviews since Reviews API is not built yet
        setReviews([
          { id: 1, user: 'Ahmed Khan', avatar: 'AK', rating: 5, date: '2 days ago', text: 'The biryani is absolutely phenomenal! Best in Lahore, hands down.' },
          { id: 2, user: 'Sara Malik', avatar: 'SM', rating: 4, date: '1 week ago', text: 'Great food and ambiance. The mutton karahi was cooked to perfection. Service was a bit slow during peak hours.' }
        ]);

        if (data.menu && Object.keys(data.menu).length > 0) {
          setActiveMenu(Object.keys(data.menu)[0]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRestaurant();
  }, [id]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewForm.text.trim() || reviewForm.rating === 0) return;
    const newReview = {
      id: Date.now(),
      user: 'You',
      avatar: 'YO',
      rating: reviewForm.rating,
      date: 'Just now',
      text: reviewForm.text,
    };
    setReviews([newReview, ...reviews]);
    setReviewForm({ rating: 0, text: '' });
    setShowReviewForm(false);
  };

  if (loading) {
    return (
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <div className="container py-5 text-center my-auto">
          <div className="spinner-border text-orange" role="status"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <div className="container py-5 text-center my-auto">
          <h2>Restaurant not found</h2>
          <p className="text-secondary">{error}</p>
          <Link to="/restaurants" className="btn btn-orange mt-3">Back to Restaurants</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const menuCategories = restaurant.menu ? Object.keys(restaurant.menu) : [];

  return (
    <div>
      <Navbar />

      {/* Hero Image */}
      <div className="position-relative">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-100"
          style={{ height: '300px', objectFit: 'cover' }}
        />
        <div className="position-absolute bottom-0 start-0 w-100 p-4" style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.7))' }}>
          <div className="container text-white">
            <h1 className="fw-bold mb-1" style={{ color: '#fff' }}>{restaurant.name}</h1>
            <p className="mb-0">{restaurant.cuisine} · {restaurant.priceRange}</p>
          </div>
        </div>
      </div>

      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            {/* Main Content */}
            <div className="col-lg-8">
              {/* About */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                  <h5 className="fw-bold mb-3">About</h5>
                  <p className="text-secondary">{restaurant.description}</p>
                  <div className="d-flex flex-wrap gap-3 text-secondary small">
                    <span><i className="bi bi-geo-alt me-1"></i>{restaurant.location}</span>
                    <span><i className="bi bi-telephone me-1"></i>{restaurant.phone}</span>
                    <span><i className="bi bi-clock me-1"></i>{restaurant.hours}</span>
                  </div>
                </div>
              </div>

              {/* Menu */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                  <h5 className="fw-bold mb-3"><i className="bi bi-book me-2 text-orange"></i>Menu</h5>

                  {/* Category tabs */}
                  <div className="d-flex flex-wrap gap-2 mb-4">
                    {menuCategories.map((cat) => (
                      <button
                        key={cat}
                        className={`btn btn-sm rounded-pill ${activeMenu === cat ? 'btn-orange' : 'btn-outline-secondary'}`}
                        onClick={() => setActiveMenu(cat)}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Menu Items */}
                  <div>
                    {restaurant.menu && restaurant.menu[activeMenu]?.map((item, i) => (
                      <div className={`d-flex justify-content-between align-items-start py-3 ${i > 0 ? 'border-top' : ''}`} key={i}>
                        <div>
                          <h6 className="fw-semibold mb-1">{item.name}</h6>
                          <p className="text-secondary small mb-0">{item.description}</p>
                        </div>
                        <span className="fw-bold text-orange text-nowrap ms-3">Rs. {item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reviews */}
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold mb-0"><i className="bi bi-chat-left-text me-2 text-orange"></i>Reviews</h5>
                    <span className="badge bg-warning text-dark">
                      <i className="bi bi-star-fill me-1"></i>{restaurant.rating} ({restaurant.reviewCount || 0})
                    </span>
                  </div>

                  {/* Review Form */}
                  {showReviewForm && (
                    <div className="border rounded p-3 mb-3 bg-light">
                      <h6 className="fw-semibold mb-3">Write Your Review</h6>
                      <form onSubmit={handleReviewSubmit}>
                        <div className="mb-3">
                          <label className="form-label small fw-semibold">Rating</label>
                          <div>
                            {[1, 2, 3, 4, 5].map((star) => (
                              <i
                                key={star}
                                className={`bi bi-star${star <= reviewForm.rating ? '-fill' : ''} fs-5 me-1`}
                                style={{ color: star <= reviewForm.rating ? '#f59f00' : '#ddd', cursor: 'pointer' }}
                                onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                              ></i>
                            ))}
                          </div>
                        </div>
                        <div className="mb-3">
                          <textarea
                            className="form-control"
                            rows="3"
                            placeholder="Share your experience..."
                            value={reviewForm.text}
                            onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })}
                            required
                          ></textarea>
                        </div>
                        <div className="d-flex gap-2">
                          <button type="submit" className="btn btn-sm btn-orange" disabled={!reviewForm.text.trim() || reviewForm.rating === 0}>
                            <i className="bi bi-send me-1"></i>Submit
                          </button>
                          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => setShowReviewForm(false)}>
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {reviews.map((review) => (
                    <div className="py-3 border-top" key={review.id}>
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <div className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold review-avatar" style={{ backgroundColor: 'var(--ts-orange)' }}>
                          {review.avatar}
                        </div>
                        <div>
                          <div className="fw-semibold small">{review.user}</div>
                          <div className="text-secondary" style={{ fontSize: '0.75rem' }}>{review.date}</div>
                        </div>
                        <div className="ms-auto">
                          {[...Array(5)].map((_, i) => (
                            <i key={i} className={`bi bi-star${i < review.rating ? '-fill' : ''}`} style={{ color: i < review.rating ? '#f59f00' : '#ddd', fontSize: '0.8rem' }}></i>
                          ))}
                        </div>
                      </div>
                      <p className="mb-0 small">{review.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              <div className="sticky-top" style={{ top: '80px' }}>
                {/* Quick Info */}
                <div className="card border-0 shadow-sm mb-3">
                  <div className="card-body text-center">
                    <div className="mb-3">
                      <span className="fs-2 fw-bold text-orange">{restaurant.rating}</span>
                      <span className="text-secondary small"> / 5</span>
                    </div>
                    <div className="mb-2">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className={`bi bi-star${i < Math.round(restaurant.rating) ? '-fill' : ''} fs-5`} style={{ color: i < Math.round(restaurant.rating) ? '#f59f00' : '#ddd' }}></i>
                      ))}
                    </div>
                    <p className="text-secondary small mb-3">Based on {restaurant.reviewCount || 0} reviews</p>
                    <button className="btn btn-orange w-100 mb-2" onClick={() => { setShowReviewForm(true); window.scrollTo({ top: document.querySelector('.card.border-0.shadow-sm')?.offsetTop + 400 || 0, behavior: 'smooth' }); }}>
                      <i className="bi bi-pencil me-1"></i>Write a Review
                    </button>
                    <button className="btn btn-outline-secondary w-100">
                      <i className="bi bi-bookmark me-1"></i>Save Restaurant
                    </button>
                  </div>
                </div>

                {/* Location */}
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <h6 className="fw-bold mb-3">Location & Hours</h6>
                    <p className="small text-secondary mb-2">
                      <i className="bi bi-geo-alt me-1"></i>{restaurant.location}
                    </p>
                    <p className="small text-secondary mb-2">
                      <i className="bi bi-clock me-1"></i>{restaurant.hours}
                    </p>
                    <p className="small text-secondary mb-0">
                      <i className="bi bi-telephone me-1"></i>{restaurant.phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RestaurantDetail;
