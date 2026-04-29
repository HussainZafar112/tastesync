import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import './About.css';

const About = () => {
  return (
    <div>
      <Navbar />

      {/* Hero */}
      <section className="bg-light py-5">
        <div className="container text-center py-4">
          <span className="badge bg-orange-light text-orange rounded-pill px-3 py-2 mb-3">About Us</span>
          <h1 className="display-5 fw-bold mb-3">
            We're on a mission to connect<br />
            <span className="text-orange">food lovers everywhere</span>
          </h1>
          <p className="text-secondary mx-auto" style={{ maxWidth: '600px' }}>
            TasteSync is a social food discovery platform where people share honest reviews,
            discover amazing restaurants, and connect over their love of great food.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center gy-4">
            <div className="col-lg-6">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop"
                alt="Restaurant dining"
                className="img-fluid rounded-4 shadow"
              />
            </div>
            <div className="col-lg-6">
              <h2 className="fw-bold mb-3">Our Story</h2>
              <p className="text-secondary">
                TasteSync started from a simple idea: food experiences are better when shared.
                We noticed that finding genuine restaurant recommendations was hard — review platforms
                felt impersonal and disconnected.
              </p>
              <p className="text-secondary">
                So we built a platform that combines the best of social media with restaurant discovery.
                A place where your reviews reach real people, where restaurant owners can engage
                directly with their customers, and where every meal becomes a story worth sharing.
              </p>
              <p className="text-secondary mb-0">
                Today, TasteSync is home to a growing community of food enthusiasts, restaurant owners,
                and culinary explorers across Pakistan and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-5 bg-dark text-white">
        <div className="container">
          <div className="row text-center g-4">
            {[
              { number: '12K+', label: 'Active Food Lovers', icon: 'bi-people-fill' },
              { number: '3,500+', label: 'Listed Restaurants', icon: 'bi-shop' },
              { number: '48K+', label: 'Reviews Posted', icon: 'bi-chat-quote-fill' },
              { number: '15+', label: 'Cities Covered', icon: 'bi-geo-alt-fill' },
            ].map((stat, i) => (
              <div className="col-6 col-md-3" key={i}>
                <i className={`bi ${stat.icon} fs-2 text-orange d-block mb-2`}></i>
                <div className="fs-3 fw-bold">{stat.number}</div>
                <div className="text-white-50 small">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">What We <span className="text-orange">Believe In</span></h2>
            <p className="text-secondary">The principles that guide everything we build</p>
          </div>
          <div className="row g-4">
            {[
              { icon: 'bi-shield-check', title: 'Honest Reviews', desc: 'We believe in authentic, unfiltered opinions. No paid reviews, no fake ratings — just real experiences from real people.' },
              { icon: 'bi-people', title: 'Community First', desc: 'Food brings people together. We build features that foster connections, conversations, and shared culinary adventures.' },
              { icon: 'bi-shop', title: 'Empowering Owners', desc: 'Restaurant owners deserve tools to manage their online presence, engage with diners, and grow their business.' },
              { icon: 'bi-phone', title: 'Simple & Accessible', desc: 'Great technology should be easy to use. We keep things simple, fast, and accessible for everyone.' },
            ].map((value, i) => (
              <div className="col-md-6" key={i}>
                <div className="d-flex gap-3 p-3">
                  <div className="bg-light rounded-3 p-3 d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '56px', height: '56px' }}>
                    <i className={`bi ${value.icon} text-orange fs-4`}></i>
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1">{value.title}</h5>
                    <p className="text-secondary small mb-0">{value.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Meet the <span className="text-orange">Team</span></h2>
            <p className="text-secondary">The people building TasteSync</p>
          </div>
          <div className="row g-4 justify-content-center">
            {[
              { name: 'Saqib Ahmed', role: 'Founder & Developer', avatar: 'SA' },
              { name: 'Ayesha Khan', role: 'UI/UX Designer', avatar: 'AK' },
              { name: 'Bilal Hassan', role: 'Backend Engineer', avatar: 'BH' },
            ].map((member, i) => (
              <div className="col-md-4 col-lg-3 text-center" key={i}>
                <div className="card border-0 shadow-sm p-4">
                  <div className="rounded-circle mx-auto d-flex align-items-center justify-content-center text-white fw-bold mb-3" style={{ width: '80px', height: '80px', fontSize: '1.5rem', backgroundColor: 'var(--ts-orange)' }}>
                    {member.avatar}
                  </div>
                  <h6 className="fw-bold mb-0">{member.name}</h6>
                  <p className="text-secondary small mb-0">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-5">
        <div className="container">
          <div className="bg-dark text-white rounded-4 p-5 text-center">
            <h2 className="fw-bold mb-3">Join the TasteSync <span className="text-orange">Community</span></h2>
            <p className="text-secondary mb-4">Start discovering, reviewing, and connecting today — it's free!</p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <Link to="/register" className="btn btn-orange btn-lg px-4">
                Get Started Free <i className="bi bi-arrow-right ms-1"></i>
              </Link>
              <Link to="/restaurants" className="btn btn-outline-light btn-lg px-4">
                Explore Restaurants
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
