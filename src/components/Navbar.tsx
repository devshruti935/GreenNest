import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/greennest-logo.png';

const Navbar = () => {
  const location = useLocation();
  const { totalItems } = useCart();
  const { isLoggedIn, user, favorites } = useAuth();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/favorites', label: `Favorites${favorites.length ? ` (${favorites.length})` : ''}` },
    { to: '/rewards', label: 'Rewards' },
    { to: '/recycling', label: 'Recycling' },
  ];

  return (
    <nav className="navbar">
      <Link to="/" className="logo" aria-label="GreenNest home">
        <img src={logo} alt="GreenNest" />
      </Link>
      <ul className="menu">
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className={location.pathname === link.to ? 'active' : ''}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="nav-auth">
        <Link to="/cart" className="cart-link">
          🛒
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </Link>
        {isLoggedIn ? (
          <Link to="/profile" className="profile-link">
            <div className="nav-avatar">{user?.name.charAt(0).toUpperCase()}</div>
          </Link>
        ) : (
          <>
            <Link to="/login" className="btn-login">Sign In</Link>
            <Link to="/register" className="btn btn-primary btn-sm">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
