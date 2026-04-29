import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import './EditProfile.css';

const EditProfile = () => {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    bio: '',
    location: '',
    website: '',
    favCuisine: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
        const res = await fetch('http://localhost:5000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (res.ok) {
          setForm({
            fullName: data.fullName || '',
            username: data.username || '',
            email: data.email || '',
            phone: data.phone || '',
            bio: data.bio || '',
            location: data.location || '',
            website: data.website || '',
            favCuisine: data.favCuisine || '',
          });
        } else {
          setError(data.message || 'Failed to load profile');
        }
      } catch (err) {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setSaved(true);
        setTimeout(() => navigate('/profile'), 1500);
      } else {
        setError(data.message || 'Failed to update profile');
      }
    } catch (err) {
      setError('Network error');
    }
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
                  <li className="breadcrumb-item"><Link to="/profile">Profile</Link></li>
                  <li className="breadcrumb-item active">Edit Profile</li>
                </ol>
              </nav>

              <h2 className="fw-bold mb-1">
                <i className="bi bi-person-gear me-2 text-orange"></i>Edit Profile
              </h2>
              <p className="text-secondary mb-4">Update your personal information</p>

              {error && <div className="alert alert-danger">{error}</div>}

              {/* Success */}
              {saved && (
                <div className="alert alert-success d-flex align-items-center">
                  <i className="bi bi-check-circle-fill me-2"></i>
                  Profile updated! Redirecting...
                </div>
              )}

              {loading ? (
                <div className="text-center py-5"><div className="spinner-border text-orange" role="status"></div></div>
              ) : !saved && (
                <form onSubmit={handleSubmit}>
                  {/* Avatar Section */}
                  <div className="card border-0 shadow-sm mb-4">
                    <div className="card-body p-4">
                      <h6 className="fw-bold mb-3">Profile Picture</h6>
                      <div className="d-flex align-items-center gap-3">
                        <div className="avatar-upload">
                          <div className="avatar-circle rounded-circle bg-light text-orange d-flex align-items-center justify-content-center fw-bold border">
                            AK
                          </div>
                          <button type="button" className="btn btn-sm btn-orange rounded-circle change-btn" title="Change photo">
                            <i className="bi bi-camera-fill" style={{ fontSize: '0.7rem' }}></i>
                          </button>
                        </div>
                        <div>
                          <p className="mb-1 small fw-semibold">Change your profile photo</p>
                          <p className="mb-0 text-secondary small">JPG, PNG. Max 2MB.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Personal Info */}
                  <div className="card border-0 shadow-sm mb-4">
                    <div className="card-body p-4">
                      <h6 className="fw-bold mb-3">Personal Information</h6>

                      <div className="row g-3">
                        <div className="col-md-12">
                          <label className="form-label small fw-semibold" htmlFor="fullName">Full Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="fullName"
                            name="fullName"
                            value={form.fullName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label small fw-semibold" htmlFor="handle">Username</label>
                          <div className="input-group">
                            <span className="input-group-text">@</span>
                            <input
                              type="text"
                              className="form-control"
                              id="username"
                              name="username"
                              value={form.username}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label small fw-semibold" htmlFor="location">Location</label>
                          <input
                            type="text"
                            className="form-control"
                            id="location"
                            name="location"
                            placeholder="City, Country"
                            value={form.location}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-12">
                          <label className="form-label small fw-semibold" htmlFor="bio">Bio</label>
                          <textarea
                            className="form-control"
                            id="bio"
                            name="bio"
                            rows="3"
                            placeholder="Tell us about yourself..."
                            value={form.bio}
                            onChange={handleChange}
                          ></textarea>
                          <div className="form-text">{form.bio.length}/200 characters</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="card border-0 shadow-sm mb-4">
                    <div className="card-body p-4">
                      <h6 className="fw-bold mb-3">Contact Information</h6>

                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label small fw-semibold" htmlFor="email">
                            <i className="bi bi-envelope me-1"></i>Email
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label small fw-semibold" htmlFor="phone">
                            <i className="bi bi-telephone me-1"></i>Phone
                          </label>
                          <input
                            type="tel"
                            className="form-control"
                            id="phone"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-12">
                          <label className="form-label small fw-semibold" htmlFor="website">
                            <i className="bi bi-globe me-1"></i>Website (optional)
                          </label>
                          <input
                            type="url"
                            className="form-control"
                            id="website"
                            name="website"
                            placeholder="https://yourwebsite.com"
                            value={form.website}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Food Preferences */}
                  <div className="card border-0 shadow-sm mb-4">
                    <div className="card-body p-4">
                      <h6 className="fw-bold mb-3">Food Preferences</h6>

                      <div className="mb-3">
                        <label className="form-label small fw-semibold" htmlFor="favCuisine">Favorite Cuisine</label>
                        <select
                          className="form-select"
                          id="favCuisine"
                          name="favCuisine"
                          value={form.favCuisine}
                          onChange={handleChange}
                        >
                          <option value="">Select...</option>
                          <option value="Pakistani">Pakistani</option>
                          <option value="Indian">Indian</option>
                          <option value="Chinese">Chinese</option>
                          <option value="Japanese">Japanese</option>
                          <option value="Italian">Italian</option>
                          <option value="American">American</option>
                          <option value="Thai">Thai</option>
                          <option value="Mexican">Mexican</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-orange">
                      <i className="bi bi-check-lg me-1"></i>Save Changes
                    </button>
                    <Link to="/profile" className="btn btn-outline-secondary">Cancel</Link>
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

export default EditProfile;
