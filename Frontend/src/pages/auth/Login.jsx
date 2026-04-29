import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed');
      
      console.log('Logged in successfully:', data);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      
      // Redirect to home
      navigate('/');
    } catch (error) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page d-flex min-vh-100">
      {/* Left — Form */}
      <div className="d-flex flex-column justify-content-center align-items-center flex-grow-1 p-4">
        <div className="w-100" style={{ maxWidth: '420px' }}>
          {/* Logo */}
          <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none mb-4">
            <i className="bi bi-egg-fried text-orange fs-3"></i>
            <span className="fw-bold fs-4 text-dark">TasteSync</span>
          </Link>

          {/* Header */}
          <h2 className="fw-bold mb-1">Welcome back</h2>
          <p className="text-secondary mb-4">Sign in to continue your culinary journey</p>

          {/* Social Logins */}
          <div className="d-grid gap-2 mb-3">
            <button type="button" className="btn btn-outline-secondary d-flex align-items-center justify-content-center gap-2" id="google-login">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width="20" height="20" />
              Continue with Google
            </button>
            <button type="button" className="btn btn-outline-secondary d-flex align-items-center justify-content-center gap-2" id="github-login">
              <i className="bi bi-github fs-5"></i>
              Continue with GitHub
            </button>
          </div>

          {/* Divider */}
          <div className="d-flex align-items-center gap-3 my-4">
            <hr className="flex-grow-1" />
            <span className="text-secondary small">or sign in with email</span>
            <hr className="flex-grow-1" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-3">
              <label htmlFor="login-email" className="form-label small fw-semibold">Email Address</label>
              <input
                type="email"
                className="form-control"
                id="login-email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <label htmlFor="login-password" className="form-label small fw-semibold">Password</label>
                <Link to="/forgot-password" className="small text-orange text-decoration-none">Forgot password?</Link>
              </div>
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  id="login-password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="input-group-text"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`bi bi-eye${showPassword ? '-slash' : ''}`}></i>
                </button>
              </div>
            </div>

            {/* Remember */}
            <div className="form-check mb-4">
              <input type="checkbox" className="form-check-input" id="remember-me" />
              <label className="form-check-label small" htmlFor="remember-me">Remember me</label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-orange w-100 py-2 fw-semibold"
              disabled={isSubmitting}
              id="login-submit"
            >
              {isSubmitting ? (
                <span className="spinner-border spinner-border-sm" role="status"></span>
              ) : (
                <>Sign In <i className="bi bi-arrow-right ms-1"></i></>
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-secondary mt-4 small">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="text-orange fw-semibold text-decoration-none">
              Create one free
            </Link>
          </p>
        </div>
      </div>

      {/* Right — Branding Panel (hidden on mobile) */}
      <div className="login-branding d-none d-lg-flex flex-column justify-content-center p-5 text-white">
        <div style={{ maxWidth: '420px' }}>
          <h2 className="fw-bold mb-3">
            Your next favorite<br />meal is <span className="text-warning">one click away</span>
          </h2>
          <p className="text-white-50 mb-4">Join thousands of food enthusiasts sharing their culinary discoveries every day.</p>

          {/* Stats */}
          <div className="row g-3 mb-4">
            {[
              { icon: 'bi-people', number: '12K+', label: 'Food Lovers' },
              { icon: 'bi-shop', number: '3.5K+', label: 'Restaurants' },
              { icon: 'bi-graph-up', number: '48K+', label: 'Reviews' },
              { icon: 'bi-star', number: '4.8★', label: 'Avg Rating' },
            ].map((stat, i) => (
              <div className="col-6" key={i}>
                <div className="bg-white bg-opacity-10 rounded-3 p-3">
                  <i className={`bi ${stat.icon} fs-5 mb-1 d-block`}></i>
                  <div className="fw-bold">{stat.number}</div>
                  <div className="small text-white-50">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="bg-white bg-opacity-10 rounded-3 p-3">
            <div className="text-warning mb-1">★★★★★</div>
            <p className="small mb-2">"TasteSync completely changed how I discover new restaurants. The community reviews are genuine and inspiring!"</p>
            <div className="d-flex align-items-center gap-2">
              <div className="bg-white bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '32px', height: '32px', fontSize: '0.7rem' }}>SA</div>
              <div>
                <div className="small fw-semibold">Sarah Ahmed</div>
                <div style={{ fontSize: '0.7rem' }} className="text-white-50">Food Blogger</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
