import { Link } from 'react-router-dom';
import { UtensilsCrossed, Heart } from 'lucide-react';
import './Footer.css';

const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5"/>
  </svg>
);

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <div className="footer-logo-icon">
                <UtensilsCrossed size={20} />
              </div>
              <span className="footer-logo-text">TasteSync</span>
            </Link>
            <p className="footer-tagline">
              Discover food, share flavors, and connect with
              a vibrant community of food lovers.
            </p>
            <div className="footer-socials">
              <a href="#" className="social-icon" aria-label="Twitter"><TwitterIcon /></a>
              <a href="#" className="social-icon" aria-label="Instagram"><InstagramIcon /></a>
              <a href="#" className="social-icon" aria-label="GitHub"><GithubIcon /></a>
            </div>
          </div>

          <div className="footer-links-group">
            <div className="footer-col">
              <h4>Explore</h4>
              <Link to="/restaurants">Restaurants</Link>
              <Link to="/feed">Social Feed</Link>
              <Link to="/search">Search</Link>
              <Link to="/about">About Us</Link>
            </div>
            <div className="footer-col">
              <h4>For Business</h4>
              <Link to="/register">Add Restaurant</Link>
              <Link to="/dashboard">Owner Dashboard</Link>
              <Link to="/contact">Contact Sales</Link>
              <Link to="/pricing">Pricing</Link>
            </div>
            <div className="footer-col">
              <h4>Support</h4>
              <Link to="/contact">Help Center</Link>
              <Link to="/terms">Terms of Service</Link>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/contact">Contact Us</Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; 2026 TasteSync. Crafted with{' '}
            <Heart size={14} className="heart-icon" />{' '}
            for food lovers everywhere.
          </p>
          <div className="footer-bottom-links">
            <Link to="/terms">Terms</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
