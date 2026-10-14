import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  if (!isLoggedIn || !user) {
    return (
      <div className="page-enter" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div className="auth-card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
          <h2 style={{ marginBottom: '0.75rem' }}>Sign In Required</h2>
          <p style={{ color: '#6b8f7e', marginBottom: '2rem' }}>
            Please sign in to view your profile and order history.
          </p>
          <Link to="/login" className="btn btn-primary" style={{ justifyContent: 'center', width: '100%' }}>
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const orders = [
    { id: 'GN-2024-001', date: 'Oct 12, 2024', items: 3, total: '₹1,747', status: 'Delivered' },
    { id: 'GN-2024-002', date: 'Oct 8, 2024', items: 1, total: '₹499', status: 'Shipped' },
    { id: 'GN-2024-003', date: 'Sep 29, 2024', items: 5, total: '₹3,096', status: 'Delivered' },
  ];

  const activities = [
    { icon: '♻️', text: 'Recycled 2.5kg of plastic bottles', points: '+125', date: 'Oct 10' },
    { icon: '🛒', text: 'Purchased Bamboo Cutlery Kit', points: '+50', date: 'Oct 8' },
    { icon: '⭐', text: 'Wrote a review for Coconut Bowl Set', points: '+25', date: 'Oct 5' },
    { icon: '👥', text: 'Referred a friend — Meera joined!', points: '+200', date: 'Sep 30' },
  ];

  return (
    <div className="page-enter">
      {/* Profile header */}
      <section className="section" style={{ paddingBottom: '1rem' }}>
        <div className="profile-header">
          <div className="profile-avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="profile-info">
            <h2>{user.name}</h2>
            <p style={{ color: '#6b8f7e' }}>{user.email}</p>
            <p style={{ color: '#6b8f7e', fontSize: '0.85rem' }}>Member since {user.joinedDate}</p>
          </div>
          <div className="profile-stats">
            <div className="profile-stat">
              <div className="stat-number" style={{ fontSize: '2rem' }}>{user.points.toLocaleString()}</div>
              <div className="stat-label">GreenPoints</div>
            </div>
            <div className="profile-stat">
              <div className="stat-number" style={{ fontSize: '2rem' }}>3</div>
              <div className="stat-label">Orders</div>
            </div>
            <div className="profile-stat">
              <div className="stat-number" style={{ fontSize: '2rem' }}>2.5kg</div>
              <div className="stat-label">Recycled</div>
            </div>
          </div>
        </div>
      </section>

      <div className="profile-grid">
        {/* Recent orders */}
        <div className="profile-section">
          <h3 style={{ marginBottom: '1rem', fontSize: '1.15rem' }}>📦 Recent Orders</h3>
          <div className="order-list">
            {orders.map((order) => (
              <div className="order-item" key={order.id}>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{order.id}</div>
                  <div style={{ fontSize: '0.85rem', color: '#6b8f7e' }}>{order.date} · {order.items} items</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 600, color: '#52b788' }}>{order.total}</div>
                  <div className={`order-status ${order.status.toLowerCase()}`}>{order.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity feed */}
        <div className="profile-section">
          <h3 style={{ marginBottom: '1rem', fontSize: '1.15rem' }}>🌱 Recent Activity</h3>
          <div className="activity-list">
            {activities.map((a, i) => (
              <div className="activity-item" key={i}>
                <span className="activity-icon">{a.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.9rem' }}>{a.text}</div>
                  <div style={{ fontSize: '0.8rem', color: '#6b8f7e' }}>{a.date}</div>
                </div>
                <span style={{ color: '#f4a261', fontWeight: 700, fontSize: '0.9rem' }}>{a.points}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Logout */}
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <button
          onClick={() => { logout(); navigate('/'); }}
          className="btn btn-outline"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
