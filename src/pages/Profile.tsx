import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [referralCopied, setReferralCopied] = useState(false);

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

  const activities = [
    ...user.orders.map((order) => ({
      icon: '🛒',
      text: `Placed an order${order.products?.length ? `: ${order.products.map((product) => product.name).join(', ')}` : ''}`,
      points: order.pointsEarned ? `+${order.pointsEarned} pts` : '',
      date: order.date,
    })),
    ...user.redemptions.map((redemption) => ({
      icon: '🎁',
      text: `Redeemed ${redemption.name}`,
      points: `−${redemption.points} pts`,
      date: redemption.date,
    })),
    ...user.pickups.map((pickup) => ({
      icon: '♻️',
      text: `Recycling pickup ${pickup.status.toLowerCase()}${pickup.materials.length ? `: ${pickup.materials.join(', ')}` : ''}`,
      points: '',
      date: pickup.date,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const referralHash = Array.from(user.email.toLowerCase()).reduce((hash, char) => ((hash * 31 + char.charCodeAt(0)) >>> 0), 7);
  const referralCode = `GN${referralHash.toString(36).toUpperCase().padStart(6, '0').slice(-6)}`;

  const copyReferralCode = async () => {
    try {
      await navigator.clipboard.writeText(referralCode);
      setReferralCopied(true);
      window.setTimeout(() => setReferralCopied(false), 1800);
    } catch {
      setReferralCopied(false);
    }
  };

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
              <div className="stat-number" style={{ fontSize: '2rem' }}>{user.orders.length}</div>
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
        <div className="profile-section">
          <h3 style={{ marginBottom: '.5rem', fontSize: '1.15rem' }}>👥 Refer a Friend</h3>
          <p style={{ color: '#8fbfa8', fontSize: '.9rem', marginBottom: '1rem' }}>Share your referral code with a friend.</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '.75rem', padding: '.85rem 1rem', border: '1px dashed rgba(82,183,136,.45)', borderRadius: '10px', background: 'rgba(82,183,136,.07)' }}>
            <strong aria-label="Your referral code" style={{ letterSpacing: '.12em', color: '#d4e8db', fontSize: '1.15rem' }}>{referralCode}</strong>
            <button type="button" className="btn btn-outline" onClick={copyReferralCode} style={{ padding: '.55rem .85rem', minWidth: '5.5rem' }}>
              {referralCopied ? 'Copied!' : 'Copy code'}
            </button>
          </div>
        </div>

        {/* Recent orders */}
        <div className="profile-section">
          <h3 style={{ marginBottom: '1rem', fontSize: '1.15rem' }}>📦 Recent Orders</h3>
          <div className="order-list">
            {user.orders.map((order) => (
              <details className="order-item" key={order.id} style={{ display: 'block' }}>
                <summary style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', cursor: 'pointer', listStyle: 'none' }}>
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{order.id}</div>
                    <div style={{ fontSize: '0.85rem', color: '#6b8f7e' }}>{order.date} · {order.items} {order.items === 1 ? 'item' : 'items'} · View items</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontWeight: 600, color: '#52b788' }}>{order.total}</div>
                    <div className={`order-status ${order.status.toLowerCase()}`}>{order.status}</div>
                  </div>
                </summary>
                <div style={{ marginTop: '.85rem', paddingTop: '.75rem', borderTop: '1px solid rgba(82,183,136,0.18)' }}>
                  {order.products?.length ? order.products.map((product) => (
                    <div key={product.id} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', padding: '.35rem 0', color: '#d4e8db', fontSize: '.9rem' }}>
                      <span>{product.name} <span style={{ color: '#8fbfa8' }}>× {product.quantity}</span></span>
                      <span style={{ whiteSpace: 'nowrap' }}>{product.price}</span>
                    </div>
                  )) : <p style={{ color: '#8fbfa8', fontSize: '.88rem', margin: 0 }}>Item details are unavailable for this order.</p>}
                </div>
              </details>
            ))}
            {user.orders.length === 0 && (
              <p style={{ color: '#6b8f7e' }}>Your orders will appear here after checkout.</p>
            )}
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
                {a.points && <span style={{ color: '#f4a261', fontWeight: 700, fontSize: '0.9rem' }}>{a.points}</span>}
              </div>
            ))}
            {activities.length === 0 && <p style={{ color: '#6b8f7e' }}>Your recent orders, rewards, and recycling activity will appear here.</p>}
          </div>
        </div>

        <div className="profile-section">
          <h3 style={{ marginBottom: '1rem', fontSize: '1.15rem' }}>🎁 Rewards History</h3>
          {user.redemptions.length ? user.redemptions.map((redemption) => (
            <div className="order-item" key={redemption.id}>
              <div><strong>{redemption.name}</strong><div style={{ fontSize: '.85rem', color: '#6b8f7e', marginTop: '.25rem' }}>{redemption.date}</div></div>
              <span style={{ color: '#f4a261', fontWeight: 700 }}>−{redemption.points} pts</span>
            </div>
          )) : <p style={{ color: '#6b8f7e' }}>Your redeemed rewards will appear here.</p>}
        </div>

        <div className="profile-section">
          <h3 style={{ marginBottom: '1rem', fontSize: '1.15rem' }}>♻️ Recycling Pickup Status</h3>
          {user.pickups.length ? user.pickups.map((pickup) => (
            <div className="order-item" key={pickup.id}>
              <div>
                <strong>{pickup.id}</strong>
                <div style={{ fontSize: '.85rem', color: '#6b8f7e', marginTop: '.25rem' }}>{pickup.materials.join(', ')} · {pickup.date}</div>
                {pickup.orderId && <div style={{ fontSize: '.85rem', color: '#6b8f7e' }}>Linked to {pickup.orderId}</div>}
              </div>
              <span className="order-status shipped">{pickup.status}</span>
            </div>
          )) : <p style={{ color: '#6b8f7e' }}>No recycling pickups scheduled. <Link to="/recycling">Schedule one</Link> to have it collected with your next order delivery.</p>}
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
