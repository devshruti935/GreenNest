import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    register(form.name, form.email, form.password);
    navigate('/profile');
  };

  const passwordStrength = () => {
    const len = form.password.length;
    if (len === 0) return { label: '', color: 'transparent', width: '0%' };
    if (len < 6) return { label: 'Weak', color: '#e74c3c', width: '30%' };
    if (len < 10) return { label: 'Medium', color: '#f4a261', width: '60%' };
    return { label: 'Strong', color: '#52b788', width: '100%' };
  };

  const strength = passwordStrength();

  return (
    <div className="page-enter" style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div className="auth-card">
        <div className="auth-header">
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🌱</div>
          <h2>Join GreenNest</h2>
          <p>Create your account and start shopping sustainably</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="Your full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="reg-email">Email Address</label>
            <input
              id="reg-email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="reg-password">Password</label>
            <div className="password-wrapper">
              <input
                id="reg-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {form.password.length > 0 && (
              <div className="password-strength">
                <div className="strength-bar">
                  <div
                    className="strength-fill"
                    style={{ width: strength.width, background: strength.color }}
                  />
                </div>
                <span style={{ color: strength.color, fontSize: '0.8rem' }}>{strength.label}</span>
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              id="confirm-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              required
            />
          </div>

          <label className="checkbox-label" style={{ marginBottom: '1rem' }}>
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            I agree to the <a href="#" style={{ color: '#52b788' }}>Terms of Service</a> and{' '}
            <a href="#" style={{ color: '#52b788' }}>Privacy Policy</a>
          </label>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', opacity: agreed ? 1 : 0.5 }}
            disabled={!agreed}
          >
            Create Account
          </button>
        </form>

        <div className="auth-divider">
          <span>or sign up with</span>
        </div>

        <div className="social-buttons">
          <button className="social-btn" type="button">🔵 Google</button>
          <button className="social-btn" type="button">⚫ GitHub</button>
        </div>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
