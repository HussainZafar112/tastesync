import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  ChefHat,
  UtensilsCrossed,
  ArrowRight,
  Check,
  Sparkles,
  Store,
} from 'lucide-react';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user', // 'user' or 'owner'
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1 = role, 2 = details

  const passwordStrength = getPasswordStrength(formData.password);

  function getPasswordStrength(password) {
    if (!password) return { level: 0, label: '', color: '' };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (password.length >= 12) score++;

    if (score <= 1) return { level: 1, label: 'Weak', color: 'var(--error)' };
    if (score <= 2) return { level: 2, label: 'Fair', color: 'var(--warning)' };
    if (score <= 3) return { level: 3, label: 'Good', color: 'var(--accent)' };
    return { level: 4, label: 'Strong', color: 'var(--success)' };
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const selectRole = (role) => {
    setFormData((prev) => ({ ...prev, role }));
    setCurrentStep(2);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    else if (formData.username.length < 3) newErrors.username = 'Username must be at least 3 characters';
    else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) newErrors.username = 'Only letters, numbers, and underscores';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter a valid email address';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
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
      console.log('Register:', formData);
      // TODO: Connect to backend API
    }, 1500);
  };

  return (
    <div className="register-page">
      {/* Animated Background */}
      <div className="register-bg">
        <div className="bg-orb bg-orb-1"></div>
        <div className="bg-orb bg-orb-2"></div>
        <div className="bg-orb bg-orb-3"></div>
        <div className="bg-grid"></div>
      </div>

      <div className="register-container">
        {/* Left Panel — Branding */}
        <div className="register-branding">
          <div className="branding-content">
            <Link to="/" className="brand-logo">
              <div className="brand-icon">
                <UtensilsCrossed size={28} />
              </div>
              <span className="brand-name">TasteSync</span>
            </Link>

            <div className="branding-text">
              <h1>
                Discover Food,<br />
                <span className="text-gradient">Share Flavors</span>
              </h1>
              <p>Join a vibrant community of food lovers. Post reviews, discover restaurants, and connect with fellow foodies.</p>
            </div>

            <div className="branding-features">
              <div className="feature-item">
                <div className="feature-icon">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h4>Discover Trending</h4>
                  <p>Find the hottest restaurants and dishes in your area</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <ChefHat size={18} />
                </div>
                <div>
                  <h4>Review & Rate</h4>
                  <p>Share your culinary experiences with the community</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <Store size={18} />
                </div>
                <div>
                  <h4>Restaurant Owners</h4>
                  <p>Manage your restaurant profile and connect with diners</p>
                </div>
              </div>
            </div>
          </div>

          <div className="branding-footer">
            <p>&copy; 2026 TasteSync. All rights reserved.</p>
          </div>
        </div>

        {/* Right Panel — Form */}
        <div className="register-form-panel">
          <div className="form-wrapper">
            {/* Mobile Logo */}
            <Link to="/" className="mobile-logo">
              <div className="brand-icon">
                <UtensilsCrossed size={22} />
              </div>
              <span className="brand-name">TasteSync</span>
            </Link>

            {/* Step Indicator */}
            <div className="step-indicator">
              <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
                <div className="step-circle">1</div>
                <span>Account Type</span>
              </div>
              <div className="step-line"></div>
              <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
                <div className="step-circle">2</div>
                <span>Details</span>
              </div>
            </div>

            {/* Step 1: Role Selection */}
            {currentStep === 1 && (
              <div className="step-content step-role" key="step1">
                <div className="form-header">
                  <h2>Join TasteSync</h2>
                  <p>Choose how you want to use TasteSync</p>
                </div>

                <div className="role-cards">
                  <button
                    className={`role-card ${formData.role === 'user' ? 'selected' : ''}`}
                    onClick={() => selectRole('user')}
                    id="role-foodie"
                  >
                    <div className="role-card-icon foodie-icon">
                      <UtensilsCrossed size={32} />
                    </div>
                    <h3>Food Lover</h3>
                    <p>Discover restaurants, post reviews, and connect with the food community</p>
                    <div className="role-features">
                      <span><Check size={14} /> Post reviews</span>
                      <span><Check size={14} /> Follow foodies</span>
                      <span><Check size={14} /> Save favorites</span>
                    </div>
                    <div className="role-select-btn">
                      Select <ArrowRight size={16} />
                    </div>
                  </button>

                  <button
                    className={`role-card ${formData.role === 'owner' ? 'selected' : ''}`}
                    onClick={() => selectRole('owner')}
                    id="role-owner"
                  >
                    <div className="role-card-icon owner-icon">
                      <Store size={32} />
                    </div>
                    <h3>Restaurant Owner</h3>
                    <p>List your restaurant, manage menus, and engage with your customers</p>
                    <div className="role-features">
                      <span><Check size={14} /> Manage menu</span>
                      <span><Check size={14} /> Reply to reviews</span>
                      <span><Check size={14} /> View analytics</span>
                    </div>
                    <div className="role-select-btn">
                      Select <ArrowRight size={16} />
                    </div>
                  </button>
                </div>

                <div className="form-footer">
                  <p>
                    Already have an account?{' '}
                    <Link to="/login" className="form-link">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Registration Form */}
            {currentStep === 2 && (
              <div className="step-content step-form" key="step2">
                <div className="form-header">
                  <button className="back-btn" onClick={() => setCurrentStep(1)}>
                    ← Back
                  </button>
                  <h2>Create your account</h2>
                  <p>
                    Signing up as{' '}
                    <span className="role-badge">
                      {formData.role === 'user' ? (
                        <><UtensilsCrossed size={14} /> Food Lover</>
                      ) : (
                        <><Store size={14} /> Restaurant Owner</>
                      )}
                    </span>
                  </p>
                </div>

                <form className="register-form" onSubmit={handleSubmit} noValidate>
                  {/* Full Name */}
                  <div className={`input-group ${errors.fullName ? 'error' : ''}`}>
                    <label htmlFor="fullName">Full Name</label>
                    <div className="input-wrapper">
                      <User size={18} className="input-icon" />
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={handleChange}
                        autoComplete="name"
                      />
                    </div>
                    {errors.fullName && <span className="error-msg">{errors.fullName}</span>}
                  </div>

                  {/* Username */}
                  <div className={`input-group ${errors.username ? 'error' : ''}`}>
                    <label htmlFor="username">Username</label>
                    <div className="input-wrapper">
                      <span className="input-icon input-at">@</span>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="johndoe"
                        value={formData.username}
                        onChange={handleChange}
                        autoComplete="username"
                      />
                    </div>
                    {errors.username && <span className="error-msg">{errors.username}</span>}
                  </div>

                  {/* Email */}
                  <div className={`input-group ${errors.email ? 'error' : ''}`}>
                    <label htmlFor="email">Email Address</label>
                    <div className="input-wrapper">
                      <Mail size={18} className="input-icon" />
                      <input
                        type="email"
                        id="email"
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
                    <label htmlFor="password">Password</label>
                    <div className="input-wrapper">
                      <Lock size={18} className="input-icon" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        placeholder="Min. 8 characters"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="new-password"
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
                    {formData.password && (
                      <div className="password-strength">
                        <div className="strength-bars">
                          {[1, 2, 3, 4].map((i) => (
                            <div
                              key={i}
                              className={`strength-bar ${i <= passwordStrength.level ? 'filled' : ''}`}
                              style={{ backgroundColor: i <= passwordStrength.level ? passwordStrength.color : '' }}
                            ></div>
                          ))}
                        </div>
                        <span className="strength-label" style={{ color: passwordStrength.color }}>
                          {passwordStrength.label}
                        </span>
                      </div>
                    )}
                    {errors.password && <span className="error-msg">{errors.password}</span>}
                  </div>

                  {/* Confirm Password */}
                  <div className={`input-group ${errors.confirmPassword ? 'error' : ''}`}>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <div className="input-wrapper">
                      <Lock size={18} className="input-icon" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Re-enter your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        className="toggle-password"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        aria-label="Toggle confirm password visibility"
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.confirmPassword && <span className="error-msg">{errors.confirmPassword}</span>}
                  </div>

                  {/* Terms */}
                  <div className="terms-check">
                    <p>
                      By creating an account, you agree to our{' '}
                      <Link to="/terms" className="form-link">Terms of Service</Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="form-link">Privacy Policy</Link>.
                    </p>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className={`submit-btn ${isSubmitting ? 'loading' : ''}`}
                    disabled={isSubmitting}
                    id="register-submit"
                  >
                    {isSubmitting ? (
                      <span className="btn-loader"></span>
                    ) : (
                      <>
                        Create Account
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>

                  {/* Divider */}
                  <div className="divider">
                    <span>or continue with</span>
                  </div>

                  {/* Social Logins */}
                  <div className="social-logins">
                    <button type="button" className="social-btn" id="google-signup">
                      <svg width="20" height="20" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Google
                    </button>
                    <button type="button" className="social-btn" id="github-signup">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      GitHub
                    </button>
                  </div>
                </form>

                <div className="form-footer">
                  <p>
                    Already have an account?{' '}
                    <Link to="/login" className="form-link">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
