import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, UtensilsCrossed, Search } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="main-navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="nav-logo" id="nav-logo">
          <div className="nav-logo-icon">
            <UtensilsCrossed size={22} />
          </div>
          <span className="nav-logo-text">TasteSync</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="nav-links">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
            Home
          </Link>
          <Link to="/restaurants" className={`nav-link ${location.pathname.startsWith('/restaurants') ? 'active' : ''}`}>
            Restaurants
          </Link>
          <Link to="/feed" className={`nav-link ${location.pathname === '/feed' ? 'active' : ''}`}>
            Feed
          </Link>
          <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>
            About
          </Link>
        </div>

        {/* Right Section */}
        <div className="nav-actions">
          <button className="nav-search-btn" aria-label="Search">
            <Search size={18} />
          </button>
          <Link to="/login" className="nav-btn nav-btn-ghost" id="nav-login">
            Sign In
          </Link>
          <Link to="/register" className="nav-btn nav-btn-primary" id="nav-register">
            Get Started
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="mobile-toggle"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle menu"
          id="mobile-menu-toggle"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileOpen ? 'open' : ''}`}>
        <div className="mobile-menu-links">
          <Link to="/" className="mobile-link">Home</Link>
          <Link to="/restaurants" className="mobile-link">Restaurants</Link>
          <Link to="/feed" className="mobile-link">Feed</Link>
          <Link to="/about" className="mobile-link">About</Link>
        </div>
        <div className="mobile-menu-actions">
          <Link to="/login" className="nav-btn nav-btn-ghost mobile-action">Sign In</Link>
          <Link to="/register" className="nav-btn nav-btn-primary mobile-action">Get Started</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
