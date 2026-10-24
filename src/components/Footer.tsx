import { Link } from 'react-router-dom';
import logo from '../assets/greennest-logo.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="logo">
            <img src={logo} alt="GreenNest" />
          </div>
          <p>Making sustainable living accessible and rewarding for everyone. Shop green, live clean.</p>
        </div>
        <div className="footer-links">
          <h4>Shop</h4>
          <ul>
            <li><Link to="/shop?filter=all">All Products</Link></li>
            <li><Link to="/shop?filter=bestsellers">Best Sellers</Link></li>
            <li><Link to="/shop?filter=new">New Arrivals</Link></li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Programs</h4>
          <ul>
            <li><Link to="/rewards">Rewards</Link></li>
            <li><Link to="/recycling">Recycling</Link></li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Support</h4>
          <ul>
            <li><a href="mailto:green-nest@gmail.com">Contact Us</a></li>
            <li><a href="tel:9563214782">Call Us: 9563214782</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} <span className="brand-word">GreenNest</span>. All rights reserved. Made with 💚 for the planet.
      </div>
    </footer>
  );
};

export default Footer;
