import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const rewards = [
  { icon: '🎋', name: '10% Off Next Order', cost: '200 pts', desc: 'Save on your next eco-purchase.' },
  { icon: '🌱', name: 'Plant a Tree', cost: '500 pts', desc: 'We plant a tree in your name.' },
  { icon: '🎁', name: 'Free Bamboo Kit', cost: '1,000 pts', desc: 'Complete bamboo essentials set.' },
  { icon: '🏷️', name: '₹500 Store Credit', cost: '1,500 pts', desc: 'Redeemable on any product.' },
  { icon: '🌍', name: 'Carbon Offset', cost: '800 pts', desc: 'Offset 100kg of CO₂ emissions.' },
  { icon: '💎', name: 'VIP Membership', cost: '3,000 pts', desc: 'Exclusive deals and early access.' },
];

const earnMethods = [
  { icon: '🛒', title: 'Shop Green', desc: 'Earn 1 point per ₹10 spent on eco-products.', points: '+1pt / ₹10' },
  { icon: '♻️', title: 'Recycle Materials', desc: 'Schedule a pickup and earn points for recyclables.', points: '+50pts' },
  { icon: '👥', title: 'Refer Friends', desc: 'Both you and your friend get bonus points.', points: '+200pts' },
  { icon: '⭐', title: 'Write Reviews', desc: 'Share your experience and earn per review.', points: '+25pts' },
];

const Rewards = () => {
  const { user, redeemPoints } = useAuth();
  const points = user?.points ?? 0;
  const [redeemed, setRedeemed] = useState<string | null>(null);

  const redeem = (name: string, cost: string) => {
    const requiredPoints = Number(cost.replace(/[^0-9]/g, ''));

    if (!user) {
      setRedeemed('Sign in to redeem GreenPoints.');
      return;
    }

    if (points < requiredPoints) {
      setRedeemed(`You need ${requiredPoints - points} more GreenPoints for ${name}.`);
      return;
    }

    redeemPoints(name, requiredPoints);
    setRedeemed(`${name} redeemed successfully!`);
  };

  return (
    <div className="page-enter">
      <div className="rewards-hero">
        <span className="label" style={{ display: 'inline-block', padding: '0.35rem 1rem', borderRadius: '50px', background: 'rgba(82,183,136,0.1)', border: '1px solid rgba(82,183,136,0.15)', color: '#52b788', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>
          Loyalty Program
        </span>
        <h1>Your Green Rewards</h1>
        <div className="reward-points-display">
          <div>
            <div className="points">{points.toLocaleString()}</div>
            <div className="points-label">GreenPoints<br />available to redeem</div>
          </div>
        </div>
        {!user && (
          <p className="rewards-sign-in-note">
            <Link to="/login">Sign in</Link> to see and redeem your GreenPoints.
          </p>
        )}
      </div>

      {/* How to earn */}
      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="section-header">
          <span className="label">Earn Points</span>
          <h2>Ways to Earn</h2>
          <p>Every green action is rewarded. Here's how you can rack up points.</p>
        </div>
        <div className="features-grid">
          {earnMethods.map((m, i) => (
            <div className="feature-card" key={i}>
              <div className="feature-icon">{m.icon}</div>
              <h3>{m.title}</h3>
              <p>{m.desc}</p>
              <div style={{ marginTop: '0.75rem', color: '#52b788', fontWeight: 700, fontSize: '1.1rem' }}>{m.points}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Redeem rewards */}
      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="section-header">
          <span className="label">Redeem</span>
          <h2>Available Rewards</h2>
          <p>Use your GreenPoints to unlock these eco-rewards.</p>
        </div>
        <div className="rewards-grid" style={{ padding: '0' }}>
          {rewards.map((r, i) => (
            <div className="reward-card" key={i}>
              <div className="reward-icon">{r.icon}</div>
              <h3>{r.name}</h3>
              <p style={{ color: '#a5c4b5', fontSize: '0.9rem', marginBottom: '0.75rem' }}>{r.desc}</p>
              <div className="reward-cost">{r.cost}</div>
              <button className="btn-redeem" onClick={() => redeem(r.name, r.cost)}>
                Redeem
              </button>
            </div>
          ))}
        </div>
        {redeemed && (
          <p role="status" style={{ textAlign: 'center', color: '#52b788', marginTop: '1.5rem', fontWeight: 600 }}>
            {redeemed}
          </p>
        )}
      </section>
    </div>
  );
};

export default Rewards;
