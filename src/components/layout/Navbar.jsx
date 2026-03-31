import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top" id="main-navbar">
      <div className="container">
        {/* Logo */}
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2 fw-bold" id="nav-logo">
          <i className="bi bi-egg-fried text-orange fs-4"></i>
          <span>TasteSync</span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          id="mobile-menu-toggle"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto gap-1">
            <li className="nav-item">
              <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active fw-semibold' : ''}`}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/restaurants" className={`nav-link ${location.pathname.startsWith('/restaurants') ? 'active fw-semibold' : ''}`}>
                Restaurants
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/feed" className={`nav-link ${location.pathname === '/feed' ? 'active fw-semibold' : ''}`}>
                Feed
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active fw-semibold' : ''}`}>
                About
              </Link>
            </li>
          </ul>

          {/* Auth Buttons */}
          <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
            <Link to="/login" className="btn btn-outline-secondary btn-sm" id="nav-login">
              Sign In
            </Link>
            <Link to="/register" className="btn btn-orange btn-sm" id="nav-register">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
