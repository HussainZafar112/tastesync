import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import './CreatePost.css';

const restaurants = [
  'The Spice Garden',
  'Sakura Ramen House',
  'Olive & Thyme',
  'Street Bites Co.',
  'The Urban Grill',
  'Café Aroma',
  'Karachi Biryani House',
  'Dragon Palace',
];

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    restaurant: '',
    rating: 0,
    title: '',
    review: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRating = (star) => {
    setForm({ ...form, rating: star });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setForm({ ...form, image: null });
    setImagePreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send data to the backend
    setSubmitted(true);
    setTimeout(() => navigate('/feed'), 1500);
  };

  return (
    <div>
      <Navbar />

      <section className="py-5 bg-light min-vh-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7">
              {/* Breadcrumb */}
              <nav aria-label="breadcrumb" className="mb-3">
                <ol className="breadcrumb small">
                  <li className="breadcrumb-item"><Link to="/feed">Feed</Link></li>
                  <li className="breadcrumb-item active">Create Post</li>
                </ol>
              </nav>

              <h2 className="fw-bold mb-1">
                <i className="bi bi-pencil-square me-2 text-orange"></i>Share Your Experience
              </h2>
              <p className="text-secondary mb-4">Tell the community about a recent meal</p>

              {/* Success Message */}
              {submitted && (
                <div className="alert alert-success d-flex align-items-center" role="alert">
                  <i className="bi bi-check-circle-fill me-2"></i>
                  Post published! Redirecting to feed...
                </div>
              )}

              {/* Form */}
              {!submitted && (
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-4">
                    <form onSubmit={handleSubmit}>
                      {/* Restaurant */}
                      <div className="mb-3">
                        <label className="form-label fw-semibold" htmlFor="restaurant">
                          <i className="bi bi-shop me-1"></i>Restaurant
                        </label>
                        <select
                          className="form-select"
                          id="restaurant"
                          name="restaurant"
                          value={form.restaurant}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select a restaurant...</option>
                          {restaurants.map((r) => (
                            <option key={r} value={r}>{r}</option>
                          ))}
                        </select>
                      </div>

                      {/* Rating */}
                      <div className="mb-3">
                        <label className="form-label fw-semibold">
                          <i className="bi bi-star me-1"></i>Rating
                        </label>
                        <div>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <i
                              key={star}
                              className={`bi bi-star${star <= form.rating ? '-fill' : ''} fs-4 me-1`}
                              style={{ color: star <= form.rating ? '#f59f00' : '#ddd', cursor: 'pointer' }}
                              onClick={() => handleRating(star)}
                            ></i>
                          ))}
                          {form.rating > 0 && (
                            <span className="ms-2 text-secondary small">{form.rating}/5</span>
                          )}
                        </div>
                      </div>

                      {/* Title */}
                      <div className="mb-3">
                        <label className="form-label fw-semibold" htmlFor="title">
                          <i className="bi bi-type me-1"></i>Title
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="title"
                          name="title"
                          placeholder="Give your review a title..."
                          value={form.title}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      {/* Review */}
                      <div className="mb-3">
                        <label className="form-label fw-semibold" htmlFor="review">
                          <i className="bi bi-chat-left-text me-1"></i>Your Review
                        </label>
                        <textarea
                          className="form-control"
                          id="review"
                          name="review"
                          rows="5"
                          placeholder="What did you enjoy? How was the food, service, ambiance?"
                          value={form.review}
                          onChange={handleChange}
                          required
                        ></textarea>
                      </div>

                      {/* Image Upload */}
                      <div className="mb-4">
                        <label className="form-label fw-semibold">
                          <i className="bi bi-image me-1"></i>Add a Photo (optional)
                        </label>
                        {!imagePreview ? (
                          <div>
                            <input
                              type="file"
                              className="form-control"
                              accept="image/*"
                              onChange={handleImage}
                              id="post-image"
                            />
                          </div>
                        ) : (
                          <div className="image-preview-container">
                            <img src={imagePreview} alt="Preview" className="w-100" />
                            <button
                              type="button"
                              className="btn btn-sm btn-danger rounded-circle remove-image-btn"
                              onClick={removeImage}
                            >
                              <i className="bi bi-x"></i>
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Submit */}
                      <div className="d-flex gap-2">
                        <button type="submit" className="btn btn-orange">
                          <i className="bi bi-send me-1"></i>Publish Post
                        </button>
                        <Link to="/feed" className="btn btn-outline-secondary">Cancel</Link>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CreatePost;
