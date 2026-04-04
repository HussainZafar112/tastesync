import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import './Profile.css';

const userDetails = {
  name: 'Ahmed Khan',
  handle: '@ahmed_foodie',
  bio: 'Food enthusiast exploring the hidden gems of the city. Coffee addict and street food lover.',
  location: 'Lahore, PK',
  joined: 'Jan 2023',
  followers: 245,
  following: 112,
  avatar: 'AK'
};

const savedRestaurants = [
  { id: 1, name: 'The Spice Garden', category: 'Desi', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop', rating: 4.8 },
  { id: 2, name: 'Sakura Ramen House', category: 'Japanese', image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&h=400&fit=crop', rating: 4.9 },
  { id: 3, name: 'Café Aroma', category: 'Cafe', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=400&fit=crop', rating: 4.5 }
];

const favoriteDishes = [
  { id: 1, name: 'Chicken Karahi', restaurant: 'The Spice Garden', icon: '🍲' },
  { id: 2, name: 'Tonkotsu Ramen', restaurant: 'Sakura Ramen House', icon: '🍜' },
  { id: 3, name: 'Avocado Toast', restaurant: 'Café Aroma', icon: '🥑' },
  { id: 4, name: 'Tiramisu', restaurant: 'Olive & Thyme', icon: '🍰' }
];

const userReviews = [
  {
    id: 1,
    restaurant: 'The Spice Garden',
    time: '2h ago',
    rating: 5,
    text: 'The biryani here is absolutely phenomenal! Authentic flavors that remind me of home cooking but elevated to restaurant quality. Highly recommend the chicken karahi too. 🔥',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&h=400&fit=crop',
    likes: 24,
    comments: 8,
  },
  {
    id: 2,
    restaurant: 'Street Bites Co.',
    time: '3 days ago',
    rating: 5,
    text: 'This place is a hidden gem! Their fusion tacos with desi fillings are insane. Perfect for a casual night out. The chaat burger is a must-try! 🌮',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&h=400&fit=crop',
    likes: 38,
    comments: 6,
  }
];

const Profile = () => {
  const [activeTab, setActiveTab] = useState('reviews');

  return (
    <div>
      <Navbar />

      <section className="py-5 bg-light min-vh-100">
        <div className="container">
          <div className="row justify-content-center">
            
            {/* Main Content Column */}
            <div className="col-lg-8">
              
              {/* Profile Header */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                  <div className="profile-header shadow-sm">
                    <div className="profile-avatar-wrapper">
                      <div className="rounded-circle text-orange d-flex align-items-center justify-content-center fw-bold profile-avatar">
                        {userDetails.avatar}
                      </div>
                    </div>
                  </div>
                  
                  <div className="d-flex justify-content-between align-items-start mt-5 pt-3">
                    <div>
                      <h3 className="fw-bold mb-0">{userDetails.name}</h3>
                      <p className="text-secondary mb-2">{userDetails.handle}</p>
                      <p className="mb-3">{userDetails.bio}</p>
                      
                      <div className="d-flex gap-3 text-secondary small mb-3">
                        <span><i className="bi bi-geo-alt me-1"></i>{userDetails.location}</span>
                        <span><i className="bi bi-calendar3 me-1"></i>Joined {userDetails.joined}</span>
                      </div>
                      
                      <div className="d-flex gap-4">
                        <div><strong className="fs-5">{userDetails.followers}</strong> <span className="text-secondary small">Followers</span></div>
                        <div><strong className="fs-5">{userDetails.following}</strong> <span className="text-secondary small">Following</span></div>
                      </div>
                    </div>
                    <div>
                      <Link to="/edit-profile" className="btn btn-orange px-4 rounded-pill">Edit Profile</Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-0">
                  <ul className="nav nav-pills nav-fill p-2">
                    <li className="nav-item">
                      <button 
                        className={`nav-link rounded-pill ${activeTab === 'reviews' ? 'active' : ''}`}
                        onClick={() => setActiveTab('reviews')}
                      >
                        <i className="bi bi-star me-2"></i>Reviews
                      </button>
                    </li>
                    <li className="nav-item">
                      <button 
                        className={`nav-link rounded-pill ${activeTab === 'saves' ? 'active' : ''}`}
                        onClick={() => setActiveTab('saves')}
                      >
                        <i className="bi bi-bookmark me-2"></i>Saved
                      </button>
                    </li>
                    <li className="nav-item">
                      <button 
                        className={`nav-link rounded-pill ${activeTab === 'dishes' ? 'active' : ''}`}
                        onClick={() => setActiveTab('dishes')}
                      >
                        <i className="bi bi-heart me-2"></i>Favorite Dishes
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Tab Content */}
              {activeTab === 'reviews' && (
                <div>
                  <h5 className="fw-bold mb-3">Your Reviews</h5>
                  {userReviews.map((post) => (
                    <div className="card border-0 shadow-sm mb-3" key={post.id}>
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="fw-bold mb-0">{post.restaurant}</h6>
                          <span className="text-secondary small"><i className="bi bi-clock me-1"></i>{post.time}</span>
                        </div>

                        {post.rating > 0 && (
                          <div className="mb-2">
                            {[...Array(5)].map((_, i) => (
                              <i key={i} className={`bi bi-star${i < post.rating ? '-fill' : ''}`} style={{ color: i < post.rating ? '#f59f00' : '#ddd' }}></i>
                            ))}
                          </div>
                        )}

                        <p className="mb-3">{post.text}</p>

                        {post.image && (
                          <img src={post.image} alt="Food" className="rounded-3 w-100 mb-3" style={{ maxHeight: '300px', objectFit: 'cover' }} />
                        )}

                        <div className="d-flex gap-3 pt-2 border-top">
                          <button className="btn btn-sm btn-light">
                            <i className="bi bi-heart-fill text-danger me-1"></i>{post.likes}
                          </button>
                          <button className="btn btn-sm btn-light">
                            <i className="bi bi-chat me-1"></i>{post.comments}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'saves' && (
                <div>
                  <h5 className="fw-bold mb-3">Saved Restaurants</h5>
                  <div className="row">
                    {savedRestaurants.map((rest) => (
                      <div className="col-md-6 mb-4" key={rest.id}>
                        <div className="card border-0 shadow-sm h-100">
                          <img src={rest.image} className="card-img-top" alt={rest.name} style={{ height: '160px', objectFit: 'cover' }} />
                          <div className="card-body">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <h6 className="fw-bold mb-0">{rest.name}</h6>
                              <div className="badge bg-light text-dark"><i className="bi bi-star-fill text-warning me-1"></i>{rest.rating}</div>
                            </div>
                            <span className="badge bg-orange-subtle text-orange">{rest.category}</span>
                          </div>
                          <div className="card-footer bg-white border-top-0 pb-3 pt-0">
                            <button className="btn btn-sm btn-outline-orange w-100">View Details</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'dishes' && (
                <div>
                  <h5 className="fw-bold mb-3">Favorite Dishes</h5>
                  <div className="card border-0 shadow-sm">
                    <div className="list-group list-group-flush">
                      {favoriteDishes.map((dish) => (
                        <div className="list-group-item p-3 border-0 border-bottom" key={dish.id}>
                          <div className="d-flex align-items-center gap-3">
                            <div className="fs-3 text-center bg-light rounded-circle" style={{ width: '50px', height: '50px', lineHeight: '50px' }}>
                              {dish.icon}
                            </div>
                            <div>
                              <h6 className="fw-bold mb-1">{dish.name}</h6>
                              <div className="text-secondary small"><i className="bi bi-shop me-1"></i>{dish.restaurant}</div>
                            </div>
                            <button className="btn btn-sm btn-light ms-auto rounded-circle">
                              <i className="bi bi-heart-fill text-danger"></i>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Sidebar Column */}
            <div className="col-lg-4 d-none d-lg-block">
              <div className="sticky-top" style={{ top: '80px' }}>
                <div className="card border-0 shadow-sm mb-3">
                  <div className="card-body">
                    <h6 className="fw-bold mb-3"><i className="bi bi-award me-1"></i> Badges</h6>
                    <div className="d-flex flex-wrap gap-2">
                      <span className="badge bg-warning text-dark"><i className="bi bi-star-fill me-1"></i>Top Reviewer</span>
                      <span className="badge bg-danger"><i className="bi bi-fire me-1"></i>Spicy Lover</span>
                      <span className="badge bg-success"><i className="bi bi-camera me-1"></i>Food Grapher</span>
                    </div>
                  </div>
                </div>
                
                <div className="card border-0 shadow-sm">
                  <div className="card-body text-center">
                    <h6 className="fw-bold mb-3">Share your profile</h6>
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=tastesync.com/user/ahmed_foodie" alt="QR Code" className="img-fluid rounded mb-3" style={{ width: '120px' }} />
                    <button className="btn btn-outline-secondary btn-sm w-100"><i className="bi bi-link-45deg me-1"></i>Copy Link</button>
                  </div>
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

export default Profile;
