import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

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
            
            {user?.role === 'owner' ? (
              <>

                <li className="nav-item">
                  <Link to="/add-restaurant" className={`nav-link ${location.pathname === '/add-restaurant' ? 'active fw-semibold' : ''}`}>
                    Add Restaurant
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/manage-posts" className={`nav-link ${location.pathname === '/manage-posts' ? 'active fw-semibold' : ''}`}>
                    Manage Posts
                  </Link>
                </li>
              </>
            ) : (
              <>
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
              </>
            )}

            {token && (
              <li className="nav-item">
                <Link to="/profile" className={`nav-link ${location.pathname === '/profile' ? 'active fw-semibold' : ''}`}>
                  Profile
                </Link>
              </li>
            )}
          </ul>

          {/* Auth Buttons */}
          <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
            {token ? (
              <button onClick={handleLogout} className="btn btn-outline-danger btn-sm" id="nav-logout">
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-secondary btn-sm" id="nav-login">
                  Sign In
                </Link>
                <Link to="/register" className="btn btn-orange btn-sm" id="nav-register">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
