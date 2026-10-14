import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="logo">🌿 GreenNest</div>
          <p>Making sustainable living accessible and rewarding for everyone. Shop green, live clean.</p>
        </div>
        <div className="footer-links">
          <h4>Shop</h4>
          <ul>
            <li><Link to="/shop">All Products</Link></li>
            <li><Link to="/shop">Best Sellers</Link></li>
            <li><Link to="/shop">New Arrivals</Link></li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Programs</h4>
          <ul>
            <li><Link to="/rewards">Rewards</Link></li>
            <li><Link to="/recycling">Recycling</Link></li>
            <li><Link to="/about">Our Mission</Link></li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Support</h4>
          <ul>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Shipping Info</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        © 2024 GreenNest. All rights reserved. Made with 💚 for the planet.
      </div>
    </footer>
  );
};

export default Footer;
