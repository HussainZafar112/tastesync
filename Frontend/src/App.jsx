import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Landing from './pages/landing/Landing';
import Restaurants from './pages/restaurants/Restaurants';
import RestaurantDetail from './pages/restaurants/RestaurantDetail';
import Feed from './pages/feed/Feed';
import CreatePost from './pages/feed/CreatePost';
import About from './pages/about/About';
import Profile from './pages/profile/Profile';
import EditProfile from './pages/profile/EditProfile';

import AddRestaurant from './pages/owner/AddRestaurant';
import ManagePosts from './pages/owner/ManagePosts';
import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/restaurants/:id" element={<RestaurantDetail />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />

        <Route path="/add-restaurant" element={<AddRestaurant />} />
        <Route path="/manage-posts" element={<ManagePosts />} />
      </Routes>
    </Router>
  );
}

export default App;
