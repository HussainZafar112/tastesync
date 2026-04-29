import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const AddRestaurant = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    name: '',
    cuisine: '',
    category: 'other',
    location: '',
    priceRange: '$$',
    phone: '',
    hours: 'Mon–Sun: 11:00 AM – 11:00 PM',
    description: '',
    image: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/restaurants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => navigate('/admin'), 2000);
      } else {
        setError(data.message || 'Failed to add restaurant');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <section className="py-5 bg-light min-vh-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {/* Breadcrumb */}
              <nav aria-label="breadcrumb" className="mb-3">
                <ol className="breadcrumb small">
                  <li className="breadcrumb-item"><Link to="/admin">Dashboard</Link></li>
                  <li className="breadcrumb-item active">Add Restaurant</li>
                </ol>
              </nav>

              <h2 className="fw-bold mb-1">
                <i className="bi bi-shop me-2 text-orange"></i>Add New Restaurant
              </h2>
              <p className="text-secondary mb-4">Fill in the details to list your restaurant on TasteSync</p>

              {error && <div className="alert alert-danger"><i className="bi bi-exclamation-circle me-2"></i>{error}</div>}

              {success ? (
                <div className="alert alert-success d-flex align-items-center">
                  <i className="bi bi-check-circle-fill me-2"></i>
                  Restaurant added successfully! Redirecting to dashboard...
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* Basic Info */}
                  <div className="card border-0 shadow-sm mb-4">
                    <div className="card-body p-4">
                      <h6 className="fw-bold mb-3"><i className="bi bi-info-circle me-2 text-orange"></i>Basic Information</h6>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label small fw-semibold" htmlFor="name">Restaurant Name *</label>
                          <input type="text" className="form-control" id="name" name="name" value={form.name} onChange={handleChange} placeholder="e.g. The Spice Garden" required />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label small fw-semibold" htmlFor="cuisine">Cuisine *</label>
                          <input type="text" className="form-control" id="cuisine" name="cuisine" value={form.cuisine} onChange={handleChange} placeholder="e.g. Pakistani, Italian" required />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label small fw-semibold" htmlFor="category">Category *</label>
                          <select className="form-select" id="category" name="category" value={form.category} onChange={handleChange} required>
                            <option value="indian">Indian</option>
                            <option value="italian">Italian</option>
                            <option value="japanese">Japanese</option>
                            <option value="chinese">Chinese</option>
                            <option value="american">American</option>
                            <option value="cafe">Cafe</option>
                            <option value="street">Street Food</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label small fw-semibold" htmlFor="priceRange">Price Range</label>
                          <select className="form-select" id="priceRange" name="priceRange" value={form.priceRange} onChange={handleChange}>
                            <option value="$">$ — Budget</option>
                            <option value="$$">$$ — Moderate</option>
                            <option value="$$$">$$$ — Premium</option>
                            <option value="$$$$">$$$$ — Fine Dining</option>
                          </select>
                        </div>
                        <div className="col-12">
                          <label className="form-label small fw-semibold" htmlFor="description">Description</label>
                          <textarea className="form-control" id="description" name="description" rows="3" value={form.description} onChange={handleChange} placeholder="A brief description of your restaurant..."></textarea>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Location & Contact */}
                  <div className="card border-0 shadow-sm mb-4">
                    <div className="card-body p-4">
                      <h6 className="fw-bold mb-3"><i className="bi bi-geo-alt me-2 text-orange"></i>Location & Contact</h6>
                      <div className="row g-3">
                        <div className="col-12">
                          <label className="form-label small fw-semibold" htmlFor="location">Address *</label>
                          <input type="text" className="form-control" id="location" name="location" value={form.location} onChange={handleChange} placeholder="e.g. MM Alam Road, Lahore" required />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label small fw-semibold" htmlFor="phone">Phone</label>
                          <input type="tel" className="form-control" id="phone" name="phone" value={form.phone} onChange={handleChange} placeholder="e.g. +92 321 1234567" />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label small fw-semibold" htmlFor="hours">Working Hours</label>
                          <input type="text" className="form-control" id="hours" name="hours" value={form.hours} onChange={handleChange} placeholder="e.g. Mon–Sun: 11:00 AM – 11:00 PM" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="card border-0 shadow-sm mb-4">
                    <div className="card-body p-4">
                      <h6 className="fw-bold mb-3"><i className="bi bi-image me-2 text-orange"></i>Restaurant Image</h6>
                      <label className="form-label small fw-semibold" htmlFor="image">Image URL</label>
                      <input type="url" className="form-control" id="image" name="image" value={form.image} onChange={handleChange} placeholder="https://example.com/photo.jpg" />
                      <div className="form-text">Paste a direct link to your restaurant photo. Leave blank for default image.</div>
                      {form.image && (
                        <div className="mt-3">
                          <img src={form.image} alt="Preview" className="rounded-3 w-100" style={{ maxHeight: '200px', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; }} />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-orange px-4" disabled={loading}>
                      {loading ? (
                        <><span className="spinner-border spinner-border-sm me-2"></span>Adding...</>
                      ) : (
                        <><i className="bi bi-plus-lg me-1"></i>Add Restaurant</>
                      )}
                    </button>
                    <Link to="/admin" className="btn btn-outline-secondary">Cancel</Link>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AddRestaurant;
