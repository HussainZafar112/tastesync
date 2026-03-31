import { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import './Feed.css';

const initialPosts = [
  {
    id: 1,
    user: 'Ahmed Khan',
    avatar: 'AK',
    time: '2h ago',
    restaurant: 'The Spice Garden',
    rating: 5,
    text: 'The biryani here is absolutely phenomenal! Authentic flavors that remind me of home cooking but elevated to restaurant quality. Highly recommend the chicken karahi too. 🔥',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&h=400&fit=crop',
    likes: 24,
    comments: 8,
  },
  {
    id: 2,
    user: 'Sara Malik',
    avatar: 'SM',
    time: '4h ago',
    restaurant: 'Sakura Ramen House',
    rating: 5,
    text: 'Best ramen in the city, hands down. The tonkotsu broth is rich and creamy. The gyoza were crispy perfection. Will definitely be coming back! 🍜',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&h=400&fit=crop',
    likes: 42,
    comments: 12,
  },
  {
    id: 3,
    user: 'Hassan Raza',
    avatar: 'HR',
    time: '6h ago',
    restaurant: 'Olive & Thyme',
    rating: 4,
    text: 'Great ambiance and the pasta was cooked perfectly al dente. The tiramisu was the highlight of our meal. Service could be a bit faster though.',
    image: null,
    likes: 15,
    comments: 3,
  },
  {
    id: 4,
    user: 'Fatima Ali',
    avatar: 'FA',
    time: '8h ago',
    restaurant: 'Street Bites Co.',
    rating: 5,
    text: 'This place is a hidden gem! Their fusion tacos with desi fillings are insane. Perfect for a casual night out. The chaat burger is a must-try! 🌮',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&h=400&fit=crop',
    likes: 38,
    comments: 6,
  },
  {
    id: 5,
    user: 'Zain Abbas',
    avatar: 'ZA',
    time: '12h ago',
    restaurant: 'Café Aroma',
    rating: 4,
    text: 'Perfect spot for brunch! Their avocado toast is simple but done right, and the coffee is always consistently good. Love the cozy vibes here. ☕',
    image: null,
    likes: 19,
    comments: 5,
  },
];

const Feed = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [newPost, setNewPost] = useState('');

  const handleLike = (id) => {
    setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  const handlePost = (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    const post = {
      id: Date.now(),
      user: 'You',
      avatar: 'YO',
      time: 'Just now',
      restaurant: '',
      rating: 0,
      text: newPost,
      image: null,
      likes: 0,
      comments: 0,
    };
    setPosts([post, ...posts]);
    setNewPost('');
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
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                  <form onSubmit={handlePost}>
                    <div className="d-flex gap-3">
                      <div className="rounded-circle bg-orange-avatar text-white d-flex align-items-center justify-content-center fw-bold flex-shrink-0" style={{ width: '40px', height: '40px', fontSize: '0.8rem', backgroundColor: 'var(--ts-orange)' }}>
                        YO
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
                            <button type="button" className="btn btn-sm btn-light"><i className="bi bi-image text-success"></i></button>
                            <button type="button" className="btn btn-sm btn-light"><i className="bi bi-geo-alt text-primary"></i></button>
                            <button type="button" className="btn btn-sm btn-light"><i className="bi bi-star text-warning"></i></button>
                          </div>
                          <button type="submit" className="btn btn-sm btn-orange" disabled={!newPost.trim()}>Post</button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              {/* Posts */}
              {posts.map((post) => (
                <div className="card border-0 shadow-sm mb-3" key={post.id}>
                  <div className="card-body">
                    {/* Author */}
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div className="d-flex align-items-center gap-2">
                        <div className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold" style={{ width: '40px', height: '40px', fontSize: '0.8rem', backgroundColor: 'var(--ts-orange)' }}>
                          {post.avatar}
                        </div>
                        <div>
                          <div className="fw-semibold small">{post.user}</div>
                          {post.restaurant && (
                            <div className="text-secondary" style={{ fontSize: '0.78rem' }}>
                              reviewed <strong>{post.restaurant}</strong>
                            </div>
                          )}
                        </div>
                      </div>
                      <span className="text-secondary small"><i className="bi bi-clock me-1"></i>{post.time}</span>
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
                      <button className="btn btn-sm btn-light" onClick={() => handleLike(post.id)}>
                        <i className="bi bi-heart me-1"></i>{post.likes}
                      </button>
                      <button className="btn btn-sm btn-light">
                        <i className="bi bi-chat me-1"></i>{post.comments}
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
              ))}
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
