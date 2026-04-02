import { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const ManagerDashboard = () => {
  const [activeTab, setActiveTab] = useState('menu');

  // Dummy State for Restaurant Profile
  const [profile, setProfile] = useState({
    name: 'The Spice Garden',
    description: 'Authentic flavors that remind you of home cooking but elevated to restaurant quality.',
    phone: '+92 300 1234567',
    address: 'MM Alam Road, Lahore',
  });

  // Dummy State for Menu Items
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Chicken Karahi', price: 1200, category: 'Main Course', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&h=200&fit=crop' },
    { id: 2, name: 'Garlic Naan', price: 150, category: 'Bread', image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=300&h=200&fit=crop' },
  ]);

  // Dummy State for Reviews
  const [reviews, setReviews] = useState([
    { id: 101, user: 'Ahmed Khan', rating: 5, date: '2 days ago', text: 'The biryani here is absolutely phenomenal! Highly recommend the chicken karahi too.', reply: '' },
    { id: 102, user: 'Sara Malik', rating: 3, date: '1 week ago', text: 'Food was decent but the delivery took way too long.', reply: 'Hi Sara, we sincerely apologize for the delay. We are working on speeding up our kitchen operations.' },
  ]);

  const [replyText, setReplyText] = useState({});

  const handleReplyChange = (id, text) => {
    setReplyText(prev => ({ ...prev, [id]: text }));
  };

  const submitReply = (id) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, reply: replyText[id] } : r));
    setReplyText(prev => ({ ...prev, [id]: '' }));
  };

  return (
    <div>
      <Navbar />
      
      <div className="bg-dark text-white pt-4 pb-0">
        <div className="container">
          <div className="d-flex align-items-center gap-3 mb-4">
            <div className="bg-orange text-white rounded p-3 shadow">
              <i className="bi bi-shop fs-2"></i>
            </div>
            <div>
              <h2 className="fw-bold mb-1">{profile.name} Dashboard</h2>
              <p className="text-light opacity-75 mb-0">Manage your restaurant details, menu, and customer interactions.</p>
            </div>
          </div>
          
          <ul className="nav nav-tabs border-bottom-0">
            <li className="nav-item">
              <button className={`nav-link text-white bg-transparent border-0 rounded-top ${activeTab === 'profile' ? 'border-bottom border-3 text-orange fw-bold' : 'opacity-75'}`} onClick={() => setActiveTab('profile')}>
                <i className="bi bi-info-circle me-2"></i>Profile Settings
              </button>
            </li>
            <li className="nav-item">
              <button className={`nav-link text-white bg-transparent border-0 rounded-top ${activeTab === 'menu' ? 'border-bottom border-3 text-orange fw-bold' : 'opacity-75'}`} onClick={() => setActiveTab('menu')}>
                <i className="bi bi-list-ul me-2"></i>Menu Management
              </button>
            </li>
            <li className="nav-item">
              <button className={`nav-link text-white bg-transparent border-0 rounded-top ${activeTab === 'reviews' ? 'border-bottom border-3 text-orange fw-bold' : 'opacity-75'}`} onClick={() => setActiveTab('reviews')}>
                <i className="bi bi-star me-2"></i>Reviews
              </button>
            </li>
          </ul>
        </div>
      </div>

      <section className="py-5 bg-light min-vh-100">
        <div className="container">
          
          {/* PROFILE MANAGEMENT */}
          {activeTab === 'profile' && (
            <div className="row">
              <div className="col-lg-8">
                <div className="card border-0 shadow-sm mb-4">
                  <div className="card-header bg-white border-bottom-0 pt-4 pb-0">
                    <h5 className="fw-bold mb-0">Public Details</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label text-secondary small fw-semibold">Restaurant Name</label>
                      <input type="text" className="form-control bg-light border-0" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label text-secondary small fw-semibold">Description</label>
                      <textarea className="form-control bg-light border-0" rows="3" value={profile.description} onChange={(e) => setProfile({...profile, description: e.target.value})}></textarea>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label text-secondary small fw-semibold">Phone Number</label>
                        <input type="text" className="form-control bg-light border-0" value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label text-secondary small fw-semibold">Address</label>
                        <input type="text" className="form-control bg-light border-0" value={profile.address} onChange={(e) => setProfile({...profile, address: e.target.value})} />
                      </div>
                    </div>
                    <div className="mt-3 text-end">
                      <button className="btn btn-orange px-4">Save Changes</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card border-0 shadow-sm mb-4">
                  <div className="card-body">
                    <h6 className="fw-bold">Cover Photo</h6>
                    <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop" alt="Cover" className="img-fluid rounded mb-3" />
                    <button className="btn btn-outline-secondary w-100 btn-sm"><i className="bi bi-cloud-upload me-2"></i>Upload New Cover</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MENU MANAGEMENT */}
          {activeTab === 'menu' && (
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white border-bottom p-4 d-flex justify-content-between align-items-center">
                <h5 className="fw-bold mb-0">Menu Items</h5>
                <button className="btn btn-sm btn-orange"><i className="bi bi-plus-lg me-1"></i>Add New Item</button>
              </div>
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th scope="col" className="ps-4">Item</th>
                      <th scope="col">Category</th>
                      <th scope="col">Price</th>
                      <th scope="col" className="text-end pe-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {menuItems.map(item => (
                      <tr key={item.id}>
                        <td className="ps-4">
                          <div className="d-flex align-items-center gap-3">
                            <img src={item.image} alt={item.name} className="rounded object-fit-cover" style={{ width: '50px', height: '50px' }} />
                            <span className="fw-semibold">{item.name}</span>
                          </div>
                        </td>
                        <td><span className="badge bg-light text-dark border">{item.category}</span></td>
                        <td>Rs. {item.price}</td>
                        <td className="text-end pe-4">
                          <button className="btn btn-sm btn-light me-2"><i className="bi bi-pencil"></i></button>
                          <button className="btn btn-sm btn-light text-danger"><i className="bi bi-trash"></i></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* REVIEWS MANAGEMENT */}
          {activeTab === 'reviews' && (
            <div className="row">
              <div className="col-12">
                <div className="card border-0 shadow-sm">
                  <div className="card-header bg-white border-bottom p-4">
                    <h5 className="fw-bold mb-0">Customer Reviews</h5>
                  </div>
                  <div className="card-body p-0">
                    <div className="list-group list-group-flush">
                      {reviews.map(review => (
                        <div className="list-group-item p-4" key={review.id}>
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <div>
                              <span className="fw-bold me-2">{review.user}</span>
                              <span className="text-secondary small">{review.date}</span>
                            </div>
                            <div>
                              {[...Array(5)].map((_, i) => (
                                <i key={i} className={`bi bi-star${i < review.rating ? '-fill text-warning' : ' text-light'}`}></i>
                              ))}
                            </div>
                          </div>
                          <p className="mb-3">{review.text}</p>
                          
                          {review.reply ? (
                            <div className="bg-light p-3 rounded-3 border-start border-4 border-orange">
                              <div className="fw-bold small text-orange mb-1">Your Reply</div>
                              <p className="small mb-0">{review.reply}</p>
                            </div>
                          ) : (
                            <div className="mt-3">
                              <textarea 
                                className="form-control bg-light border-0 mb-2" 
                                rows="2" 
                                placeholder="Write a reply to this customer..."
                                value={replyText[review.id] || ''}
                                onChange={(e) => handleReplyChange(review.id, e.target.value)}
                              ></textarea>
                              <div className="d-flex justify-content-end">
                                <button 
                                  className="btn btn-sm btn-outline-orange" 
                                  onClick={() => submitReply(review.id)}
                                  disabled={!replyText[review.id]?.trim()}
                                >
                                  Post Reply
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ManagerDashboard;
