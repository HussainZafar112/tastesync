import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white pt-5 pb-4" id="footer">
      <div className="container">
        <div className="row gy-4">
          {/* Brand */}
          <div className="col-lg-4 col-md-6">
            <Link to="/" className="d-flex align-items-center gap-2 text-white mb-3 fs-5 fw-bold text-decoration-none">
              <i className="bi bi-egg-fried"></i>
              TasteSync
            </Link>
            <p className="text-secondary small mb-3">
              Discover food, share flavors, and connect with a vibrant community of food lovers.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-secondary fs-5" aria-label="Twitter"><i className="bi bi-twitter-x"></i></a>
              <a href="#" className="text-secondary fs-5" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-secondary fs-5" aria-label="GitHub"><i className="bi bi-github"></i></a>
            </div>
          </div>

          {/* Explore */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="fw-semibold mb-3">Explore</h6>
            <ul className="list-unstyled footer-links">
              <li><Link to="/restaurants">Restaurants</Link></li>
              <li><Link to="/feed">Social Feed</Link></li>
              <li><Link to="/search">Search</Link></li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
          </div>

          {/* For Business */}
          <div className="col-lg-3 col-md-6 col-6">
            <h6 className="fw-semibold mb-3">For Business</h6>
            <ul className="list-unstyled footer-links">
              <li><Link to="/register">Add Restaurant</Link></li>
              <li><Link to="/dashboard">Owner Dashboard</Link></li>
              <li><Link to="/contact">Contact Sales</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-lg-3 col-md-6 col-6">
            <h6 className="fw-semibold mb-3">Support</h6>
            <ul className="list-unstyled footer-links">
              <li><Link to="/contact">Help Center</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        <hr className="border-secondary my-4" />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
          <p className="text-secondary small mb-0">
            &copy; 2026 TasteSync. Crafted with <i className="bi bi-heart-fill text-danger"></i> for food lovers everywhere.
          </p>
          <div className="d-flex gap-3 small">
            <Link to="/terms" className="text-secondary">Terms</Link>
            <Link to="/privacy" className="text-secondary">Privacy</Link>
            <Link to="/contact" className="text-secondary">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
