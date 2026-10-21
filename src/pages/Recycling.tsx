import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const materials = [
  { icon: '📦', name: 'Cardboard' },
  { icon: '🥤', name: 'Plastic Bottles' },
  { icon: '📰', name: 'Paper & Newspaper' },
  { icon: '🍶', name: 'Glass Jars' },
  { icon: '🥫', name: 'Metal Cans' },
  { icon: '👕', name: 'Old Clothing' },
  { icon: '📱', name: 'E-Waste' },
  { icon: '🔋', name: 'Batteries' },
];

const steps = [
  { num: 1, title: 'Select Materials', desc: 'Choose what recyclable materials you want to schedule for pickup.' },
  { num: 2, title: 'Schedule Pickup', desc: 'We will collect your selected items when your next order is delivered.' },
  { num: 3, title: 'Earn Rewards', desc: 'Get GreenPoints credited to your account for every kg recycled.' },
];

const Recycling = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const { user, addPickup } = useAuth();

  const toggleMaterial = (name: string) => {
    setMessage('');
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((m) => m !== name) : [...prev, name]
    );
  };

  return (
    <div className="page-enter">
      <section className="section">
        <div className="section-header">
          <span className="label">Recycling Program</span>
          <h2>Recycle from Home, Earn Rewards</h2>
          <p>We make recycling easy. Schedule a free doorstep pickup and earn GreenPoints for every item.</p>
        </div>

        {/* Steps */}
        <div className="recycling-steps">
          {steps.map((s) => (
            <div className="step-card" key={s.num}>
              <div className="step-number">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Material selector */}
      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="section-header">
          <span className="label">What can you recycle?</span>
          <h2>Accepted Materials</h2>
          <p>Tap to select materials you'd like to recycle. We accept all of these!</p>
        </div>

        <div className="materials-grid">
          {materials.map((m) => (
            <div
              className="material-chip"
              key={m.name}
              onClick={() => toggleMaterial(m.name)}
              style={{
                cursor: 'pointer',
                borderColor: selected.includes(m.name) ? '#52b788' : undefined,
                background: selected.includes(m.name) ? 'rgba(82,183,136,0.08)' : undefined,
              }}
            >
              <span className="material-icon">{m.icon}</span>
              <span>{m.name}</span>
              {selected.includes(m.name) && (
                <span style={{ marginLeft: 'auto', color: '#52b788', fontWeight: 700 }}>✓</span>
              )}
            </div>
          ))}
        </div>

        {selected.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button className="btn btn-primary" onClick={() => {
              if (!user) {
                setMessage('Sign in to schedule a recycling pickup.');
                return;
              }
              addPickup(selected);
              setSelected([]);
              setMessage('Pickup request saved. We will collect it with your next order delivery.');
            }}>
              📅 Schedule Pickup ({selected.length} item{selected.length > 1 ? 's' : ''})
            </button>
          </div>
        )}
        {message && <p role="status" style={{ textAlign: 'center', marginTop: '1rem', color: '#52b788' }}>{message} {!user && <Link to="/login">Sign in</Link>}</p>}
        {user && user.pickups.length > 0 && (
          <div className="profile-section" style={{ maxWidth: '760px', margin: '2rem auto 0' }}>
            <h3 style={{ marginBottom: '1rem' }}>♻️ Pickup status</h3>
            {user.pickups.map((pickup) => (
              <div className="order-item" key={pickup.id}>
                <div><strong>{pickup.id}</strong><p style={{ color: '#8fbfa8', marginTop: '.35rem' }}>{pickup.materials.join(', ')} · {pickup.date}{pickup.orderId ? ` · Order ${pickup.orderId}` : ''}</p></div>
                <span className="order-status shipped">{pickup.status}</span>
              </div>
            ))}
            <p style={{ color: '#6b8f7e', marginTop: '1rem', fontSize: '.9rem' }}>Once you place an order, pending pickups are linked to it and collected when it is delivered.</p>
          </div>
        )}
      </section>

      {/* Impact stats */}
      <div className="stats-bar">
        <div className="stat-item">
          <div className="stat-number">45T</div>
          <div className="stat-label">Materials Recycled (kg)</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">3.2K</div>
          <div className="stat-label">Pickups Completed</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">18K</div>
          <div className="stat-label">Points Awarded</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">120+</div>
          <div className="stat-label">Cities Covered</div>
        </div>
      </div>
    </div>
  );
};

export default Recycling;
