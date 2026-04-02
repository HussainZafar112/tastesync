import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const ManagerLogin = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/manager/dashboard');
  };

  return (
    <div>
      <Navbar />

      <section className="py-5 bg-light min-vh-100 d-flex align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-5">
                  <div className="text-center mb-4">
                    <i className="bi bi-shop fs-1 text-orange"></i>
                    <h3 className="fw-bold mt-2">Partner Portal</h3>
                    <p className="text-secondary">Log in to your Restaurant Manager dashboard</p>
                  </div>

                  <form onSubmit={handleLogin}>
                    <div className="mb-3">
                      <label className="form-label fw-semibold text-secondary small">Email/Username</label>
                      <input type="email" className="form-control form-control-lg bg-light border-0" placeholder="manager@restaurant.com" required />
                    </div>
                    <div className="mb-4">
                      <label className="form-label fw-semibold text-secondary small">Password</label>
                      <input type="password" className="form-control form-control-lg bg-light border-0" placeholder="••••••••" required />
                    </div>
                    
                    <button type="submit" className="btn btn-orange btn-lg w-100 mb-3">
                      Log In to Dashboard
                    </button>
                    
                    <div className="text-center">
                      <a href="#" className="text-decoration-none small" style={{ color: 'var(--ts-orange)' }}>Forgot Password?</a>
                    </div>
                  </form>
                </div>
                <div className="card-footer bg-light p-4 text-center border-top-0">
                  <p className="mb-0 small text-secondary">
                    Want to list your restaurant? <a href="#" className="fw-bold text-dark text-decoration-none">Apply here</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ManagerLogin;
