import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const selectRole = (role) => {
    setFormData((prev) => ({ ...prev, role }));
    setCurrentStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: formData.role
        })
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Registration failed');
      
      console.log('Registered successfully:', data);
      
      // Redirect to login
      navigate('/login');
    } catch (error) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-page d-flex min-vh-100">
      {/* Left — Branding Panel (hidden on mobile) */}
      <div className="register-branding d-none d-lg-flex flex-column justify-content-center p-5 text-white">
        <div style={{ maxWidth: '400px' }}>
          <Link to="/" className="d-flex align-items-center gap-2 text-white text-decoration-none mb-4">
            <i className="bi bi-egg-fried fs-3"></i>
            <span className="fw-bold fs-4">TasteSync</span>
          </Link>

          <h2 className="fw-bold mb-3">
            Discover Food,<br />
            <span className="text-warning">Share Flavors</span>
          </h2>
          <p className="text-white-50 mb-4">
            Join a vibrant community of food lovers. Post reviews, discover restaurants, and connect with fellow foodies.
          </p>

          <div className="d-flex flex-column gap-3">
            {[
              { icon: 'bi-stars', title: 'Discover Trending', desc: 'Find the hottest restaurants and dishes' },
              { icon: 'bi-chat-quote', title: 'Review & Rate', desc: 'Share your culinary experiences' },
              { icon: 'bi-shop', title: 'Restaurant Owners', desc: 'Manage your restaurant profile' },
            ].map((item, i) => (
              <div className="d-flex align-items-start gap-3" key={i}>
                <div className="bg-white bg-opacity-10 rounded-2 p-2">
                  <i className={`bi ${item.icon}`}></i>
                </div>
                <div>
                  <div className="fw-semibold small">{item.title}</div>
                  <div className="text-white-50 small">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 text-white-50 small">&copy; 2026 TasteSync. All rights reserved.</div>
        </div>
      </div>

      {/* Right — Form */}
      <div className="d-flex flex-column justify-content-center align-items-center flex-grow-1 p-4">
        <div className="w-100" style={{ maxWidth: '480px' }}>
          {/* Mobile Logo */}
          <Link to="/" className="d-flex d-lg-none align-items-center gap-2 text-decoration-none mb-4">
            <i className="bi bi-egg-fried text-orange fs-3"></i>
            <span className="fw-bold fs-4 text-dark">TasteSync</span>
          </Link>

          {/* Step Indicator */}
          <div className="d-flex align-items-center gap-2 mb-4">
            <div className={`step-dot ${currentStep >= 1 ? 'active' : ''}`}>1</div>
            <span className={`small ${currentStep >= 1 ? 'fw-semibold' : 'text-secondary'}`}>Account Type</span>
            <hr className="flex-grow-1" />
            <div className={`step-dot ${currentStep >= 2 ? 'active' : ''}`}>2</div>
            <span className={`small ${currentStep >= 2 ? 'fw-semibold' : 'text-secondary'}`}>Details</span>
          </div>

          {/* Step 1: Role Selection */}
          {currentStep === 1 && (
            <div>
              <h3 className="fw-bold mb-1">Join TasteSync</h3>
              <p className="text-secondary mb-4">Choose how you want to use TasteSync</p>

              <div className="row g-3">
                <div className="col-6">
                  <button
                    className={`card w-100 p-3 text-start border-2 card-hover ${formData.role === 'user' ? 'border-orange' : ''}`}
                    onClick={() => selectRole('user')}
                    id="role-foodie"
                  >
                    <i className="bi bi-egg-fried text-orange fs-3 mb-2"></i>
                    <h6 className="fw-bold mb-1">Food Lover</h6>
                    <p className="text-secondary small mb-2">Discover & review restaurants</p>
                    <div className="small text-secondary">
                      <div><i className="bi bi-check text-success"></i> Post reviews</div>
                      <div><i className="bi bi-check text-success"></i> Follow foodies</div>
                      <div><i className="bi bi-check text-success"></i> Save favorites</div>
                    </div>
                  </button>
                </div>
                <div className="col-6">
                  <button
                    className={`card w-100 p-3 text-start border-2 card-hover ${formData.role === 'owner' ? 'border-orange' : ''}`}
                    onClick={() => selectRole('owner')}
                    id="role-owner"
                  >
                    <i className="bi bi-shop text-orange fs-3 mb-2"></i>
                    <h6 className="fw-bold mb-1">Restaurant Owner</h6>
                    <p className="text-secondary small mb-2">Manage your restaurant</p>
                    <div className="small text-secondary">
                      <div><i className="bi bi-check text-success"></i> Manage menu</div>
                      <div><i className="bi bi-check text-success"></i> Reply to reviews</div>
                      <div><i className="bi bi-check text-success"></i> View analytics</div>
                    </div>
                  </button>
                </div>
              </div>

              <p className="text-center text-secondary mt-4 small">
                Already have an account?{' '}
                <Link to="/login" className="text-orange fw-semibold text-decoration-none">Sign in</Link>
              </p>
            </div>
          )}

          {/* Step 2: Registration Form */}
          {currentStep === 2 && (
            <div>
              <button className="btn btn-sm btn-light mb-3" onClick={() => setCurrentStep(1)}>
                <i className="bi bi-arrow-left me-1"></i> Back
              </button>
              <h3 className="fw-bold mb-1">Create your account</h3>
              <p className="text-secondary mb-4">
                Signing up as{' '}
                <span className="badge bg-light text-dark border">
                  <i className={`bi bi-${formData.role === 'user' ? 'egg-fried' : 'shop'} me-1`}></i>
                  {formData.role === 'user' ? 'Food Lover' : 'Restaurant Owner'}
                </span>
              </p>

              <form onSubmit={handleSubmit}>
                {/* Full Name */}
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label small fw-semibold">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    name="fullName"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Username */}
                <div className="mb-3">
                  <label htmlFor="username" className="form-label small fw-semibold">Username</label>
                  <div className="input-group">
                    <span className="input-group-text">@</span>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      placeholder="johndoe"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label small fw-semibold">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label small fw-semibold">Password</label>
                  <div className="input-group">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Min. 8 characters"
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

                {/* Confirm Password */}
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label small fw-semibold">Confirm Password</label>
                  <div className="input-group">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      className="form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Re-enter your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      className="input-group-text"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      <i className={`bi bi-eye${showConfirmPassword ? '-slash' : ''}`}></i>
                    </button>
                  </div>
                </div>

                {/* Terms */}
                <p className="text-secondary small mb-3">
                  By creating an account, you agree to our{' '}
                  <Link to="/terms" className="text-orange text-decoration-none">Terms of Service</Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-orange text-decoration-none">Privacy Policy</Link>.
                </p>

                {/* Submit */}
                <button
                  type="submit"
                  className="btn btn-orange w-100 py-2 fw-semibold"
                  disabled={isSubmitting}
                  id="register-submit"
                >
                  {isSubmitting ? (
                    <span className="spinner-border spinner-border-sm" role="status"></span>
                  ) : (
                    <>Create Account <i className="bi bi-arrow-right ms-1"></i></>
                  )}
                </button>

                {/* Divider */}
                <div className="d-flex align-items-center gap-3 my-3">
                  <hr className="flex-grow-1" />
                  <span className="text-secondary small">or continue with</span>
                  <hr className="flex-grow-1" />
                </div>

                {/* Social */}
                <div className="d-flex gap-2">
                  <button type="button" className="btn btn-outline-secondary flex-grow-1" id="google-signup">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width="18" height="18" className="me-1" />
                    Google
                  </button>
                  <button type="button" className="btn btn-outline-secondary flex-grow-1" id="github-signup">
                    <i className="bi bi-github me-1"></i>
                    GitHub
                  </button>
                </div>
              </form>

              <p className="text-center text-secondary mt-4 small">
                Already have an account?{' '}
                <Link to="/login" className="text-orange fw-semibold text-decoration-none">Sign in</Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
