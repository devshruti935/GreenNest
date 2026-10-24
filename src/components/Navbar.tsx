import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/greennest-logo.png';

const Navbar = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => (
    localStorage.getItem('greennest-theme') === 'light' ? 'light' : 'dark'
  ));
  const location = useLocation();
  const { totalItems } = useCart();
  const { isLoggedIn, user, favorites } = useAuth();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('greennest-theme', theme);
  }, [theme]);

  const links = [
    { to: '/', label: 'Home', icon: '⌂' },
    { to: '/shop', label: 'Shop', icon: '▦' },
    { to: '/favorites', label: 'Favorites', icon: '♡' },
    { to: '/rewards', label: 'Rewards', icon: '✧' },
    { to: '/recycling', label: 'Recycle', icon: '♻' },
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
              <span className="mobile-nav-icon" aria-hidden="true">{link.icon}</span>
              <span>{link.label}</span>
              {link.to === '/favorites' && favorites.length > 0 && <span className="mobile-nav-count">{favorites.length}</span>}
            </Link>
          </li>
        ))}
      </ul>
      <div className="nav-auth">
        <button
          type="button"
          className="theme-toggle"
          onClick={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? '☀️' : '🌙'} <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
        </button>
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
