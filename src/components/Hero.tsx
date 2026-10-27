import { Link, useNavigate } from 'react-router-dom';
import bambooMaterialImage from '../assets/bamboo-comb.png';
import coconutShellMaterialImage from '../assets/coconut-shell-bowl-set.png';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-badge">🌱 Sustainable Living Starts Here</div>
      <h1>
        Shop <span className="gradient-text">Eco-Friendly</span> Products That
        Make a Difference
      </h1>
      <p>
        Discover sustainable products crafted from coconut shells, bamboo, and
        renewable materials. Earn rewards for every green action you take.
      </p>
      <div className="hero-buttons">
        <button className="btn btn-primary" onClick={() => navigate('/shop')}>
          🛒 Start Shopping
        </button>
        <button className="btn btn-outline" onClick={() => navigate('/recycling')}>
          ♻️ Recycle &amp; Earn
        </button>
      </div>

      {/* Stats bar */}
      <div className="stats-bar" style={{ marginTop: '4rem', width: '100%' }}>
        <div className="stat-item">
          <div className="stat-number">12K+</div>
          <div className="stat-label">Products Sold</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">8.5K</div>
          <div className="stat-label">Happy Customers</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">2.1T</div>
          <div className="stat-label">CO₂ Saved (kg)</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">95%</div>
          <div className="stat-label">Recyclable Packaging</div>
        </div>
      </div>

      {/* Features */}
      <div className="features-grid" style={{ marginTop: '2rem', width: '100%', padding: '0 1rem' }}>
        <div className="feature-card">
          <div className="feature-icon">🌿</div>
          <h3>100% Sustainable</h3>
          <p>Every product is sourced from renewable materials with zero-waste manufacturing processes.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🎁</div>
          <h3>Earn Rewards</h3>
          <p>Get points for every purchase and recycling action. Redeem them for discounts and exclusive items.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">♻️</div>
          <h3>Easy Recycling</h3>
          <p>Schedule free pickups for recyclable materials right from your doorstep. We handle the rest.</p>
        </div>
      </div>

      <section className="home-materials" aria-labelledby="shop-materials-heading">
        <span className="label">Explore our collection</span>
        <h2 id="shop-materials-heading">Shop by Material</h2>
        <p>Choose a natural material to find products made with it.</p>
        <div className="home-material-grid">
          <Link className="home-material-card" to="/shop?filter=all&material=bamboo">
            <img src={bambooMaterialImage} alt="Bamboo comb" loading="lazy" />
            <span className="home-material-overlay" aria-hidden="true" />
            <span className="home-material-content">
              <span className="home-material-eyebrow">NATURAL &amp; RENEWABLE</span>
              <span className="home-material-name">Bamboo</span>
              <span className="home-material-description">Reusable essentials and everyday pieces</span>
              <span className="home-material-action">Explore collection <span aria-hidden="true">→</span></span>
            </span>
          </Link>
          <Link className="home-material-card" to="/shop?filter=all&material=coconut-shell">
            <img src={coconutShellMaterialImage} alt="Coconut shell bowl set" loading="lazy" />
            <span className="home-material-overlay" aria-hidden="true" />
            <span className="home-material-content">
              <span className="home-material-eyebrow">HANDCRAFTED &amp; RECLAIMED</span>
              <span className="home-material-name">Coconut Shell</span>
              <span className="home-material-description">Thoughtful decor and kitchen pieces</span>
              <span className="home-material-action">Explore collection <span aria-hidden="true">→</span></span>
            </span>
          </Link>
        </div>
      </section>
    </section>
  );
};

export default Hero;
