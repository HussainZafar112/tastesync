import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  UtensilsCrossed,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter a valid email address';
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      console.log('Login:', formData, { rememberMe });
      // TODO: Connect to backend API
    }, 1500);
  };

  return (
    <div className="login-page">
      {/* Animated Background */}
      <div className="login-bg">
        <div className="bg-orb bg-orb-1"></div>
        <div className="bg-orb bg-orb-2"></div>
        <div className="bg-orb bg-orb-3"></div>
        <div className="bg-grid"></div>
      </div>

      <div className="login-container">
        {/* Left Panel — Form */}
        <div className="login-form-panel">
          <div className="form-wrapper">
            {/* Logo */}
            <Link to="/" className="brand-logo">
              <div className="brand-icon">
                <UtensilsCrossed size={24} />
              </div>
              <span className="brand-name">TasteSync</span>
            </Link>

            {/* Header */}
            <div className="form-header">
              <h1>Welcome back</h1>
              <p>Sign in to continue your culinary journey</p>
            </div>

            {/* Social Logins */}
            <div className="social-logins">
              <button type="button" className="social-btn" id="google-login">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>
              <button type="button" className="social-btn" id="github-login">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                Continue with GitHub
              </button>
            </div>

            {/* Divider */}
            <div className="divider">
              <span>or sign in with email</span>
            </div>

            {/* Login Form */}
            <form className="login-form" onSubmit={handleSubmit} noValidate>
              {/* Email */}
              <div className={`input-group ${errors.email ? 'error' : ''}`}>
                <label htmlFor="login-email">Email Address</label>
                <div className="input-wrapper">
                  <Mail size={18} className="input-icon" />
                  <input
                    type="email"
                    id="login-email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                </div>
                {errors.email && <span className="error-msg">{errors.email}</span>}
              </div>

              {/* Password */}
              <div className={`input-group ${errors.password ? 'error' : ''}`}>
                <div className="label-row">
                  <label htmlFor="login-password">Password</label>
                  <Link to="/forgot-password" className="forgot-link">
                    Forgot password?
                  </Link>
                </div>
                <div className="input-wrapper">
                  <Lock size={18} className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="login-password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <span className="error-msg">{errors.password}</span>}
              </div>

              {/* Remember Me */}
              <div className="remember-row">
                <label className="checkbox-label" htmlFor="remember-me">
                  <input
                    type="checkbox"
                    id="remember-me"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="custom-checkbox">
                    {rememberMe && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    )}
                  </span>
                  Remember me
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className={`submit-btn ${isSubmitting ? 'loading' : ''}`}
                disabled={isSubmitting}
                id="login-submit"
              >
                {isSubmitting ? (
                  <span className="btn-loader"></span>
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="form-footer">
              <p>
                Don&apos;t have an account?{' '}
                <Link to="/register" className="form-link">
                  Create one free
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel — Branding */}
        <div className="login-branding">
          <div className="branding-content">
            <div className="branding-text">
              <h2>
                Your next favorite<br />
                meal is <span className="text-gradient">one click away</span>
              </h2>
              <p>Join thousands of food enthusiasts sharing their culinary discoveries every day.</p>
            </div>

            {/* Stats */}
            <div className="branding-stats">
              <div className="stat-card">
                <div className="stat-icon">
                  <Users size={20} />
                </div>
                <div className="stat-info">
                  <span className="stat-number">12K+</span>
                  <span className="stat-label">Food Lovers</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <UtensilsCrossed size={20} />
                </div>
                <div className="stat-info">
                  <span className="stat-number">3.5K+</span>
                  <span className="stat-label">Restaurants</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <TrendingUp size={20} />
                </div>
                <div className="stat-info">
                  <span className="stat-number">48K+</span>
                  <span className="stat-label">Reviews</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <Sparkles size={20} />
                </div>
                <div className="stat-info">
                  <span className="stat-number">4.8★</span>
                  <span className="stat-label">Avg Rating</span>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p>&ldquo;TasteSync completely changed how I discover new restaurants. The community reviews are genuine and the social feed keeps me inspired to try new dishes!&rdquo;</p>
              <div className="testimonial-author">
                <div className="author-avatar">SA</div>
                <div>
                  <span className="author-name">Sarah Ahmed</span>
                  <span className="author-role">Food Blogger</span>
                </div>
              </div>
            </div>
          </div>

          <div className="branding-footer">
            <p>&copy; 2026 TasteSync. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
