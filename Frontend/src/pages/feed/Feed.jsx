import { useState, useEffect, useRef } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import './Feed.css';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [rating, setRating] = useState(0);
  const [restaurantName, setRestaurantName] = useState('');
  const [showRating, setShowRating] = useState(false);
  const [showRestaurant, setShowRestaurant] = useState(false);
  const [loading, setLoading] = useState(true);

  const inputRef = useRef(null);

  // Parse user info from localStorage if available
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (showRestaurant && window.google && inputRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ['establishment'],
      });
      
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place && place.name) {
          setRestaurantName(place.name);
        }
      });
    }
  }, [showRestaurant]);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/posts');
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (id) => {
    if (!token) return alert('Please login to like posts');

    try {
      const response = await fetch(`http://localhost:5000/api/posts/${id}/like`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const updatedLikes = await response.json();
        setPosts(posts.map(p => p._id === id ? { ...p, likes: updatedLikes } : p));
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();
    if (!newPost.trim() || !token) return;

    try {
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          text: newPost,
          rating: rating,
          restaurantName: restaurantName
        })
      });

      if (response.ok) {
        const savedPost = await response.json();
        setPosts([savedPost, ...posts]);
        setNewPost('');
        setRating(0);
        setRestaurantName('');
        setShowRating(false);
        setShowRestaurant(false);
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div>
      <Navbar />

      <section className="py-5 bg-light min-vh-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7">
              {/* Header */}
              <h2 className="fw-bold mb-1">
                <i className="bi bi-rss me-2 text-orange"></i>Food Feed
              </h2>
              <p className="text-secondary mb-4">See what the community is sharing</p>

              {/* New Post */}
              {token ? (
                <div className="card border-0 shadow-sm mb-4">
                  <div className="card-body">
                    <form onSubmit={handlePost}>
                      <div className="d-flex gap-3">
                        <div className="rounded-circle bg-orange-avatar text-white d-flex align-items-center justify-content-center fw-bold flex-shrink-0" style={{ width: '40px', height: '40px', fontSize: '0.8rem', backgroundColor: 'var(--ts-orange)' }}>
                          {user.avatar || user.fullName?.substring(0, 2).toUpperCase() || 'U'}
                        </div>
                        <div className="flex-grow-1">
                          <textarea
                            className="form-control border-0 bg-light"
                            rows="2"
                            placeholder="Share your food experience..."
                            value={newPost}
                            onChange={(e) => setNewPost(e.target.value)}
                          ></textarea>
                          <div className="d-flex justify-content-between align-items-center mt-2">
                            <div className="d-flex gap-2">
                              <button type="button" className={`btn btn-sm ${showRestaurant ? 'btn-primary text-white' : 'btn-light'}`} onClick={() => setShowRestaurant(!showRestaurant)}><i className={`bi bi-geo-alt ${showRestaurant ? '' : 'text-primary'}`}></i></button>
                              <button type="button" className={`btn btn-sm ${showRating ? 'btn-warning text-white' : 'btn-light'}`} onClick={() => setShowRating(!showRating)}><i className={`bi bi-star ${showRating ? '' : 'text-warning'}`}></i></button>
                            </div>
                            <button type="submit" className="btn btn-sm btn-orange" disabled={!newPost.trim()}>Post</button>
                          </div>
                          {showRestaurant && (
                            <div className="mt-2">
                              <input 
                                ref={inputRef}
                                type="text" 
                                className="form-control form-control-sm border-0" 
                                placeholder="Search restaurant on Google..." 
                                value={restaurantName} 
                                onChange={(e) => setRestaurantName(e.target.value)} 
                              />
                            </div>
                          )}
                          {showRating && (
                            <div className="mt-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <i key={star} className={`bi bi-star${star <= rating ? '-fill' : ''} fs-5 me-1`} style={{ color: star <= rating ? '#f59f00' : '#ddd', cursor: 'pointer' }} onClick={() => setRating(star)}></i>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              ) : (
                <div className="alert alert-warning mb-4">
                  Please log in to share your food experiences!
                </div>
              )}

              {/* Posts */}
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-orange" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center py-5 text-secondary">
                  <i className="bi bi-journal-x fs-1 mb-3 d-block"></i>
                  <p>No posts yet. Be the first to share!</p>
                </div>
              ) : (
                posts.map((post) => (
                  <div className="card border-0 shadow-sm mb-3" key={post._id}>
                    <div className="card-body">
                      {/* Author */}
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div className="d-flex align-items-center gap-2">
                          <div className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold" style={{ width: '40px', height: '40px', fontSize: '0.8rem', backgroundColor: 'var(--ts-orange)' }}>
                            {post.user?.avatar || post.user?.fullName?.substring(0, 2).toUpperCase() || 'U'}
                          </div>
                          <div>
                            <div className="fw-semibold small">{post.user?.fullName || 'Unknown User'}</div>
                            {post.restaurantName && (
                              <div className="text-secondary" style={{ fontSize: '0.78rem' }}>
                                reviewed <strong>{post.restaurantName}</strong>
                              </div>
                            )}
                          </div>
                        </div>
                        <span className="text-secondary small"><i className="bi bi-clock me-1"></i>{formatDate(post.createdAt)}</span>
                      </div>

                      {/* Stars */}
                      {post.rating > 0 && (
                        <div className="mb-2">
                          {[...Array(5)].map((_, i) => (
                            <i key={i} className={`bi bi-star${i < post.rating ? '-fill' : ''}`} style={{ color: i < post.rating ? '#f59f00' : '#ddd' }}></i>
                          ))}
                        </div>
                      )}

                      {/* Text */}
                      <p className="mb-3">{post.text}</p>

                      {/* Image */}
                      {post.image && (
                        <img src={post.image} alt="Food" className="rounded-3 w-100 mb-3" style={{ maxHeight: '350px', objectFit: 'cover' }} />
                      )}

                      {/* Actions */}
                      <div className="d-flex gap-3 pt-2 border-top">
                        <button className="btn btn-sm btn-light" onClick={() => handleLike(post._id)}>
                          <i className={`bi bi-heart${post.likes?.includes(user._id) ? '-fill text-danger' : ''} me-1`}></i>
                          {post.likes?.length || 0}
                        </button>
                        <button className="btn btn-sm btn-light">
                          <i className="bi bi-chat me-1"></i>{post.comments || 0}
                        </button>
                        <button className="btn btn-sm btn-light">
                          <i className="bi bi-share me-1"></i>Share
                        </button>
                        <button className="btn btn-sm btn-light ms-auto">
                          <i className="bi bi-bookmark"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Sidebar */}
            <div className="col-lg-4 d-none d-lg-block">
              <div className="sticky-top" style={{ top: '80px' }}>
                {/* Trending */}
                <div className="card border-0 shadow-sm mb-3">
                  <div className="card-body">
                    <h6 className="fw-bold mb-3"><i className="bi bi-fire text-orange me-1"></i> Trending</h6>
                    {['The Spice Garden', 'Sakura Ramen House', 'Street Bites Co.'].map((name, i) => (
                      <div className="d-flex align-items-center gap-2 mb-2" key={i}>
                        <span className="badge bg-light text-dark">{i + 1}</span>
                        <span className="small">{name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Who to Follow */}
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <h6 className="fw-bold mb-3"><i className="bi bi-people me-1"></i> Foodies to Follow</h6>
                    {[
                      { name: 'Ahmed Khan', handle: '@ahmedk', avatar: 'AK' },
                      { name: 'Sara Malik', handle: '@saram', avatar: 'SM' },
                      { name: 'Fatima Ali', handle: '@fatimaa', avatar: 'FA' },
                    ].map((user, i) => (
                      <div className="d-flex align-items-center justify-content-between mb-2" key={i}>
                        <div className="d-flex align-items-center gap-2">
                          <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px', fontSize: '0.7rem' }}>
                            {user.avatar}
                          </div>
                          <div>
                            <div className="small fw-semibold">{user.name}</div>
                            <div className="text-secondary" style={{ fontSize: '0.7rem' }}>{user.handle}</div>
                          </div>
                        </div>
                        <button className="btn btn-sm btn-outline-orange">Follow</button>
                      </div>
                    ))}
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

export default Feed;
