import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import './AdminDashboard.css';

const stats = [
  { label: 'Total Users', value: '1,248', icon: 'bi-people-fill', color: 'bg-primary bg-opacity-10 text-primary' },
  { label: 'Restaurants', value: '86', icon: 'bi-shop', color: 'bg-success bg-opacity-10 text-success' },
  { label: 'Posts Today', value: '34', icon: 'bi-pencil-square', color: 'bg-warning bg-opacity-10 text-warning' },
  { label: 'Flagged Content', value: '5', icon: 'bi-flag-fill', color: 'bg-danger bg-opacity-10 text-danger' },
];

const pendingRestaurants = [
  { id: 1, name: 'Tandoori Nights', owner: 'Ali Raza', cuisine: 'Pakistani', date: 'Apr 2, 2026', status: 'pending' },
  { id: 2, name: 'Seoul Kitchen', owner: 'Kim Lee', cuisine: 'Korean', date: 'Apr 3, 2026', status: 'pending' },
  { id: 3, name: 'Pasta La Vista', owner: 'Marco Polo', cuisine: 'Italian', date: 'Apr 4, 2026', status: 'pending' },
];

const recentUsers = [
  { id: 1, name: 'Ayesha Siddiqui', email: 'ayesha@email.com', joined: 'Apr 3, 2026', role: 'User' },
  { id: 2, name: 'Bilal Ahmed', email: 'bilal@email.com', joined: 'Apr 3, 2026', role: 'Owner' },
  { id: 3, name: 'Zara Khan', email: 'zara@email.com', joined: 'Apr 2, 2026', role: 'User' },
  { id: 4, name: 'Omar Farooq', email: 'omar@email.com', joined: 'Apr 1, 2026', role: 'User' },
];

const flaggedContent = [
  { id: 1, type: 'Post', user: 'Anonymous123', reason: 'Inappropriate language', date: 'Apr 4, 2026' },
  { id: 2, type: 'Review', user: 'SpamBot99', reason: 'Spam / fake review', date: 'Apr 3, 2026' },
];

const AdminDashboard = () => {
  const [restaurants, setRestaurants] = useState(pendingRestaurants);

  const handleApprove = (id) => {
    setRestaurants(restaurants.map(r =>
      r.id === id ? { ...r, status: 'approved' } : r
    ));
  };

  const handleReject = (id) => {
    setRestaurants(restaurants.map(r =>
      r.id === id ? { ...r, status: 'rejected' } : r
    ));
  };

  return (
    <div>
      <Navbar />

      <section className="py-5 bg-light min-vh-100">
        <div className="container">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="fw-bold mb-1">
                <i className="bi bi-shield-check me-2 text-orange"></i>Admin Dashboard
              </h2>
              <p className="text-secondary mb-0">Manage users, restaurants, and content</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="row g-3 mb-4">
            {stats.map((stat, i) => (
              <div className="col-6 col-md-3" key={i}>
                <div className="card border-0 shadow-sm stat-card">
                  <div className="card-body d-flex align-items-center gap-3">
                    <div className={`stat-icon ${stat.color}`}>
                      <i className={`bi ${stat.icon}`}></i>
                    </div>
                    <div>
                      <div className="text-secondary small">{stat.label}</div>
                      <div className="fw-bold fs-5">{stat.value}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="row g-4">
            {/* Pending Restaurants */}
            <div className="col-lg-7">
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                  <h5 className="fw-bold mb-3">
                    <i className="bi bi-hourglass-split me-2 text-warning"></i>Pending Restaurant Approvals
                  </h5>
                  <div className="table-responsive">
                    <table className="table admin-table mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>Restaurant</th>
                          <th>Owner</th>
                          <th>Cuisine</th>
                          <th>Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {restaurants.map((r) => (
                          <tr key={r.id}>
                            <td className="fw-semibold">{r.name}</td>
                            <td>{r.owner}</td>
                            <td>{r.cuisine}</td>
                            <td className="text-secondary">{r.date}</td>
                            <td>
                              {r.status === 'pending' ? (
                                <div className="d-flex gap-1">
                                  <button
                                    className="btn btn-sm btn-success"
                                    onClick={() => handleApprove(r.id)}
                                    title="Approve"
                                  >
                                    <i className="bi bi-check"></i>
                                  </button>
                                  <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleReject(r.id)}
                                    title="Reject"
                                  >
                                    <i className="bi bi-x"></i>
                                  </button>
                                </div>
                              ) : (
                                <span className={`badge ${r.status === 'approved' ? 'bg-success' : 'bg-danger'}`}>
                                  {r.status === 'approved' ? 'Approved' : 'Rejected'}
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Flagged Content */}
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="fw-bold mb-3">
                    <i className="bi bi-flag me-2 text-danger"></i>Flagged Content
                  </h5>
                  <div className="table-responsive">
                    <table className="table admin-table mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>Type</th>
                          <th>User</th>
                          <th>Reason</th>
                          <th>Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {flaggedContent.map((item) => (
                          <tr key={item.id}>
                            <td>
                              <span className="badge bg-secondary">{item.type}</span>
                            </td>
                            <td>{item.user}</td>
                            <td className="text-secondary">{item.reason}</td>
                            <td className="text-secondary">{item.date}</td>
                            <td>
                              <div className="d-flex gap-1">
                                <button className="btn btn-sm btn-outline-secondary" title="Review">
                                  <i className="bi bi-eye"></i>
                                </button>
                                <button className="btn btn-sm btn-outline-danger" title="Remove">
                                  <i className="bi bi-trash"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar — Recent Users */}
            <div className="col-lg-5">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="fw-bold mb-3">
                    <i className="bi bi-person-plus me-2 text-primary"></i>Recent Users
                  </h5>
                  {recentUsers.map((user) => (
                    <div className="d-flex align-items-center justify-content-between py-2 border-top" key={user.id}>
                      <div className="d-flex align-items-center gap-2">
                        <div
                          className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold"
                          style={{ width: '36px', height: '36px', fontSize: '0.7rem', backgroundColor: 'var(--ts-orange)' }}
                        >
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="small fw-semibold">{user.name}</div>
                          <div className="text-secondary" style={{ fontSize: '0.75rem' }}>{user.email}</div>
                        </div>
                      </div>
                      <div className="text-end">
                        <span className={`badge ${user.role === 'Owner' ? 'bg-warning text-dark' : 'bg-light text-dark'}`}>
                          {user.role}
                        </span>
                        <div className="text-secondary" style={{ fontSize: '0.7rem' }}>{user.joined}</div>
                      </div>
                    </div>
                  ))}
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

export default AdminDashboard;
