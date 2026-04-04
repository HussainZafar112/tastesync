import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import './RestaurantDetail.css';

const restaurantsData = {
  1: {
    name: 'The Spice Garden',
    cuisine: 'Indian • Pakistani',
    rating: 4.8,
    reviews: 342,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=400&fit=crop',
    location: 'Gulberg, Lahore',
    priceRange: '$$',
    phone: '+92 321 1234567',
    hours: 'Mon–Sun: 12:00 PM – 11:00 PM',
    description: 'A beloved spot for authentic South Asian cuisine. Known for our signature biryani and hand-crafted curries made with fresh, locally sourced spices.',
    menu: {
      'Starters': [
        { name: 'Samosa Chaat', price: 350, description: 'Crispy samosas topped with yogurt and chutneys' },
        { name: 'Seekh Kebab', price: 550, description: 'Grilled minced meat kebabs with mint chutney' },
        { name: 'Dahi Bhalla', price: 300, description: 'Lentil dumplings in yogurt with tamarind' },
      ],
      'Main Course': [
        { name: 'Chicken Biryani', price: 850, description: 'Fragrant basmati rice with tender chicken' },
        { name: 'Mutton Karahi', price: 1200, description: 'Slow-cooked mutton in tomato-based gravy' },
        { name: 'Butter Chicken', price: 950, description: 'Creamy tomato sauce with grilled chicken' },
        { name: 'Dal Makhani', price: 650, description: 'Creamy black lentils simmered overnight' },
      ],
      'Desserts': [
        { name: 'Gulab Jamun', price: 250, description: 'Soft milk-solid balls in rose syrup' },
        { name: 'Kheer', price: 300, description: 'Traditional rice pudding with cardamom' },
      ],
    },
    reviewsList: [
      { id: 1, user: 'Ahmed Khan', avatar: 'AK', rating: 5, date: '2 days ago', text: 'The biryani is absolutely phenomenal! Best in Lahore, hands down.' },
      { id: 2, user: 'Sara Malik', avatar: 'SM', rating: 4, date: '1 week ago', text: 'Great food and ambiance. The mutton karahi was cooked to perfection. Service was a bit slow during peak hours.' },
      { id: 3, user: 'Fatima Ali', avatar: 'FA', rating: 5, date: '2 weeks ago', text: 'My go-to restaurant for family dinners. Everything on the menu is delicious!' },
    ],
  },
  2: {
    name: 'Sakura Ramen House',
    cuisine: 'Japanese • Ramen',
    rating: 4.9,
    reviews: 218,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=400&fit=crop',
    location: 'F-7, Islamabad',
    priceRange: '$$$',
    phone: '+92 51 9876543',
    hours: 'Tue–Sun: 11:30 AM – 10:00 PM',
    description: 'Authentic Japanese ramen experience in the heart of Islamabad. Our broth is simmered for 18 hours for deep, rich flavor.',
    menu: {
      'Ramen': [
        { name: 'Tonkotsu Ramen', price: 1200, description: 'Pork bone broth with chashu and soft egg' },
        { name: 'Miso Ramen', price: 1100, description: 'Soybean paste broth with corn and butter' },
        { name: 'Shoyu Ramen', price: 1000, description: 'Soy sauce broth with chicken and nori' },
      ],
      'Sides': [
        { name: 'Gyoza (6 pcs)', price: 650, description: 'Pan-fried pork dumplings' },
        { name: 'Edamame', price: 400, description: 'Steamed soybeans with sea salt' },
      ],
      'Drinks': [
        { name: 'Matcha Latte', price: 500, description: 'Ceremonial grade matcha with steamed milk' },
        { name: 'Ramune Soda', price: 350, description: 'Japanese marble soda' },
      ],
    },
    reviewsList: [
      { id: 1, user: 'Zain Abbas', avatar: 'ZA', rating: 5, date: '3 days ago', text: 'Best ramen in the city! The tonkotsu broth is incredibly rich.' },
      { id: 2, user: 'Hassan Raza', avatar: 'HR', rating: 5, date: '1 week ago', text: 'Authentic Japanese flavors. The gyoza were crispy and perfect.' },
    ],
  },
};

// Fallback for IDs not in data
const defaultRestaurant = {
  name: 'Restaurant',
  cuisine: 'Various Cuisines',
  rating: 4.5,
  reviews: 100,
  image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=400&fit=crop',
  location: 'Pakistan',
  priceRange: '$$',
  phone: '+92 300 0000000',
  hours: 'Mon–Sun: 11:00 AM – 11:00 PM',
  description: 'A wonderful dining experience with a diverse menu.',
  menu: {
    'Popular Items': [
      { name: 'House Special', price: 900, description: 'Chef\'s signature dish' },
      { name: 'Grilled Platter', price: 1100, description: 'Mixed grill with sides' },
    ],
  },
  reviewsList: [
    { id: 1, user: 'Guest User', avatar: 'GU', rating: 4, date: 'Recently', text: 'Good food and nice atmosphere.' },
  ],
};

const RestaurantDetail = () => {
  const { id } = useParams();
  const restaurant = restaurantsData[id] || defaultRestaurant;
  const menuCategories = Object.keys(restaurant.menu);
  const [activeMenu, setActiveMenu] = useState(menuCategories[0]);

  return (
    <div>
      <Navbar />

      {/* Hero Image */}
      <div className="position-relative">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-100"
          style={{ height: '300px', objectFit: 'cover' }}
        />
        <div className="position-absolute bottom-0 start-0 w-100 p-4" style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.7))' }}>
          <div className="container text-white">
            <h1 className="fw-bold mb-1" style={{ color: '#fff' }}>{restaurant.name}</h1>
            <p className="mb-0">{restaurant.cuisine} · {restaurant.priceRange}</p>
          </div>
        </div>
      </div>

      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            {/* Main Content */}
            <div className="col-lg-8">
              {/* About */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                  <h5 className="fw-bold mb-3">About</h5>
                  <p className="text-secondary">{restaurant.description}</p>
                  <div className="d-flex flex-wrap gap-3 text-secondary small">
                    <span><i className="bi bi-geo-alt me-1"></i>{restaurant.location}</span>
                    <span><i className="bi bi-telephone me-1"></i>{restaurant.phone}</span>
                    <span><i className="bi bi-clock me-1"></i>{restaurant.hours}</span>
                  </div>
                </div>
              </div>

              {/* Menu */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                  <h5 className="fw-bold mb-3"><i className="bi bi-book me-2 text-orange"></i>Menu</h5>

                  {/* Category tabs */}
                  <div className="d-flex flex-wrap gap-2 mb-4">
                    {menuCategories.map((cat) => (
                      <button
                        key={cat}
                        className={`btn btn-sm rounded-pill ${activeMenu === cat ? 'btn-orange' : 'btn-outline-secondary'}`}
                        onClick={() => setActiveMenu(cat)}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Menu Items */}
                  <div>
                    {restaurant.menu[activeMenu]?.map((item, i) => (
                      <div className={`d-flex justify-content-between align-items-start py-3 ${i > 0 ? 'border-top' : ''}`} key={i}>
                        <div>
                          <h6 className="fw-semibold mb-1">{item.name}</h6>
                          <p className="text-secondary small mb-0">{item.description}</p>
                        </div>
                        <span className="fw-bold text-orange text-nowrap ms-3">Rs. {item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reviews */}
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold mb-0"><i className="bi bi-chat-left-text me-2 text-orange"></i>Reviews</h5>
                    <span className="badge bg-warning text-dark">
                      <i className="bi bi-star-fill me-1"></i>{restaurant.rating} ({restaurant.reviews})
                    </span>
                  </div>

                  {restaurant.reviewsList.map((review) => (
                    <div className="py-3 border-top" key={review.id}>
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <div className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold review-avatar" style={{ backgroundColor: 'var(--ts-orange)' }}>
                          {review.avatar}
                        </div>
                        <div>
                          <div className="fw-semibold small">{review.user}</div>
                          <div className="text-secondary" style={{ fontSize: '0.75rem' }}>{review.date}</div>
                        </div>
                        <div className="ms-auto">
                          {[...Array(5)].map((_, i) => (
                            <i key={i} className={`bi bi-star${i < review.rating ? '-fill' : ''}`} style={{ color: i < review.rating ? '#f59f00' : '#ddd', fontSize: '0.8rem' }}></i>
                          ))}
                        </div>
                      </div>
                      <p className="mb-0 small">{review.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              <div className="sticky-top" style={{ top: '80px' }}>
                {/* Quick Info */}
                <div className="card border-0 shadow-sm mb-3">
                  <div className="card-body text-center">
                    <div className="mb-3">
                      <span className="fs-2 fw-bold text-orange">{restaurant.rating}</span>
                      <span className="text-secondary small"> / 5</span>
                    </div>
                    <div className="mb-2">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className={`bi bi-star${i < Math.round(restaurant.rating) ? '-fill' : ''} fs-5`} style={{ color: i < Math.round(restaurant.rating) ? '#f59f00' : '#ddd' }}></i>
                      ))}
                    </div>
                    <p className="text-secondary small mb-3">Based on {restaurant.reviews} reviews</p>
                    <button className="btn btn-orange w-100 mb-2">
                      <i className="bi bi-pencil me-1"></i>Write a Review
                    </button>
                    <button className="btn btn-outline-secondary w-100">
                      <i className="bi bi-bookmark me-1"></i>Save Restaurant
                    </button>
                  </div>
                </div>

                {/* Location */}
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <h6 className="fw-bold mb-3">Location & Hours</h6>
                    <p className="small text-secondary mb-2">
                      <i className="bi bi-geo-alt me-1"></i>{restaurant.location}
                    </p>
                    <p className="small text-secondary mb-2">
                      <i className="bi bi-clock me-1"></i>{restaurant.hours}
                    </p>
                    <p className="small text-secondary mb-0">
                      <i className="bi bi-telephone me-1"></i>{restaurant.phone}
                    </p>
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

export default RestaurantDetail;
