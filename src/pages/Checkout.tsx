import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMode, setPaymentMode] = useState('cod');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const finalTotal = Math.round(totalPrice * 0.95);

  if (!user) {
    navigate('/login');
    return null;
  }

  if (items.length === 0 && !orderPlaced) {
    navigate('/shop');
    return null;
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim() || !city.trim() || !pincode.trim() || !phone.trim()) {
      alert('Please fill in all address fields');
      return;
    }
    // Generate a random order ID
    const id = 'GN-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase();
    setOrderId(id);
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="page-enter">
        <section className="section" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            background: 'rgba(10, 30, 20, 0.6)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(82,183,136,0.2)',
            borderRadius: '24px',
            padding: '3rem',
            textAlign: 'center',
            maxWidth: '500px',
            width: '100%',
            animation: 'fadeInUp 0.6s ease-out',
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
            <h2 style={{ color: '#52b788', marginBottom: '0.5rem', fontSize: '1.8rem' }}>Order Placed Successfully!</h2>
            <p style={{ color: '#6b8f7e', marginBottom: '1.5rem', fontSize: '1rem' }}>
              Thank you for your eco-friendly purchase, {user?.name}!
            </p>
            <div style={{
              background: 'rgba(82,183,136,0.1)',
              borderRadius: '12px',
              padding: '1.25rem',
              marginBottom: '1.5rem',
              border: '1px solid rgba(82,183,136,0.15)',
            }}>
              <p style={{ color: '#8fbfa8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Order ID</p>
              <p style={{ color: '#52b788', fontSize: '1.2rem', fontWeight: 700, letterSpacing: '2px' }}>{orderId}</p>
            </div>
            <div style={{
              background: 'rgba(82,183,136,0.1)',
              borderRadius: '12px',
              padding: '1.25rem',
              marginBottom: '1.5rem',
              border: '1px solid rgba(82,183,136,0.15)',
              textAlign: 'left',
            }}>
              <p style={{ color: '#8fbfa8', fontSize: '0.85rem', marginBottom: '0.75rem' }}>Delivery Details</p>
              <p style={{ color: '#d4e8db', fontSize: '0.95rem', lineHeight: '1.6' }}>
                {address}<br />{city} - {pincode}<br />📞 {phone}
              </p>
              <p style={{ color: '#8fbfa8', fontSize: '0.85rem', marginTop: '0.75rem' }}>
                Payment: <span style={{ color: '#f4a261', fontWeight: 600 }}>
                  {paymentMode === 'cod' ? 'Cash on Delivery' :
                   paymentMode === 'upi' ? 'UPI' :
                   paymentMode === 'card' ? 'Credit/Debit Card' : 'Net Banking'}
                </span>
              </p>
            </div>
            <p style={{ color: '#52b788', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              🌱 You earned <strong>+{Math.round(finalTotal / 10)}</strong> green points!
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button onClick={() => navigate('/shop')} className="btn btn-primary">
                Continue Shopping
              </button>
              <button onClick={() => navigate('/')} style={{
                padding: '0.75rem 1.5rem',
                background: 'none',
                border: '1px solid rgba(82,183,136,0.3)',
                borderRadius: '10px',
                color: '#52b788',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.95rem',
              }}>
                Go Home
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="page-enter">
      <section className="section">
        <div className="section-header">
          <span className="label">Checkout</span>
          <h2>Complete Your Order</h2>
        </div>

        <form onSubmit={handlePlaceOrder} style={{
          display: 'grid',
          gridTemplateColumns: '1fr 400px',
          gap: '2rem',
          maxWidth: '1000px',
          margin: '0 auto',
        }}>
          {/* Left — Address & Payment */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Delivery Address */}
            <div style={{
              background: 'rgba(10, 30, 20, 0.6)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(82,183,136,0.15)',
              borderRadius: '16px',
              padding: '2rem',
            }}>
              <h3 style={{ color: '#52b788', marginBottom: '1.25rem', fontSize: '1.15rem' }}>📍 Delivery Address</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ color: '#8fbfa8', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Full Address *</label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House/Flat No., Street, Locality"
                    rows={3}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'rgba(82,183,136,0.08)',
                      border: '1px solid rgba(82,183,136,0.2)',
                      borderRadius: '10px',
                      color: '#d4e8db',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.95rem',
                      resize: 'vertical',
                      outline: 'none',
                    }}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ color: '#8fbfa8', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>City *</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="City"
                      required
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        background: 'rgba(82,183,136,0.08)',
                        border: '1px solid rgba(82,183,136,0.2)',
                        borderRadius: '10px',
                        color: '#d4e8db',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.95rem',
                        outline: 'none',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ color: '#8fbfa8', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Pincode *</label>
                    <input
                      type="text"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="Pincode"
                      required
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        background: 'rgba(82,183,136,0.08)',
                        border: '1px solid rgba(82,183,136,0.2)',
                        borderRadius: '10px',
                        color: '#d4e8db',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.95rem',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ color: '#8fbfa8', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Phone Number *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'rgba(82,183,136,0.08)',
                      border: '1px solid rgba(82,183,136,0.2)',
                      borderRadius: '10px',
                      color: '#d4e8db',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.95rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Payment Mode */}
            <div style={{
              background: 'rgba(10, 30, 20, 0.6)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(82,183,136,0.15)',
              borderRadius: '16px',
              padding: '2rem',
            }}>
              <h3 style={{ color: '#52b788', marginBottom: '1.25rem', fontSize: '1.15rem' }}>💳 Payment Method</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { value: 'cod', label: 'Cash on Delivery', icon: '💵', desc: 'Pay when your order arrives' },
                  { value: 'upi', label: 'UPI', icon: '📱', desc: 'Google Pay, PhonePe, Paytm' },
                  { value: 'card', label: 'Credit / Debit Card', icon: '💳', desc: 'Visa, Mastercard, RuPay' },
                  { value: 'netbanking', label: 'Net Banking', icon: '🏦', desc: 'All major banks supported' },
                ].map(option => (
                  <label
                    key={option.value}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem 1.25rem',
                      background: paymentMode === option.value ? 'rgba(82,183,136,0.15)' : 'rgba(82,183,136,0.05)',
                      border: paymentMode === option.value ? '1px solid rgba(82,183,136,0.4)' : '1px solid rgba(82,183,136,0.1)',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentMode"
                      value={option.value}
                      checked={paymentMode === option.value}
                      onChange={(e) => setPaymentMode(e.target.value)}
                      style={{ accentColor: '#52b788', width: '18px', height: '18px' }}
                    />
                    <span style={{ fontSize: '1.3rem' }}>{option.icon}</span>
                    <div>
                      <p style={{ color: '#d4e8db', fontWeight: 600, fontSize: '0.95rem' }}>{option.label}</p>
                      <p style={{ color: '#6b8f7e', fontSize: '0.8rem' }}>{option.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Order Summary */}
          <div style={{
            background: 'rgba(10, 30, 20, 0.6)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(82,183,136,0.15)',
            borderRadius: '16px',
            padding: '2rem',
            alignSelf: 'start',
            position: 'sticky',
            top: '100px',
          }}>
            <h3 style={{ color: '#52b788', marginBottom: '1.25rem', fontSize: '1.15rem' }}>🧾 Order Summary</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
              {items.map(item => (
                <div key={item.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.5rem 0',
                  borderBottom: '1px solid rgba(82,183,136,0.08)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img src={item.image} alt={item.name} style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      objectFit: 'cover',
                    }} />
                    <div>
                      <p style={{ color: '#d4e8db', fontSize: '0.85rem', fontWeight: 500 }}>{item.name}</p>
                      <p style={{ color: '#6b8f7e', fontSize: '0.75rem' }}>Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span style={{ color: '#d4e8db', fontSize: '0.9rem', fontWeight: 600 }}>{item.price}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#8fbfa8', fontSize: '0.9rem' }}>
                <span>Subtotal</span>
                <span>₹{totalPrice.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#8fbfa8', fontSize: '0.9rem' }}>
                <span>Shipping</span>
                <span style={{ color: '#52b788' }}>Free</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#8fbfa8', fontSize: '0.9rem' }}>
                <span>Eco Discount (5%)</span>
                <span style={{ color: '#52b788' }}>−₹{Math.round(totalPrice * 0.05).toLocaleString()}</span>
              </div>
              <div style={{ height: '1px', background: 'rgba(82,183,136,0.15)', margin: '0.5rem 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 700 }}>
                <span style={{ color: '#d4e8db' }}>Total</span>
                <span style={{ color: '#52b788' }}>₹{finalTotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{
                width: '100%',
                justifyContent: 'center',
                marginTop: '1rem',
                padding: '0.85rem',
                fontSize: '1rem',
                fontWeight: 700,
                borderRadius: '12px',
              }}
            >
              🛒 Place Order — ₹{finalTotal.toLocaleString()}
            </button>
            <p style={{ color: '#6b8f7e', fontSize: '0.75rem', textAlign: 'center', marginTop: '0.75rem' }}>
              🔒 Your payment information is secure
            </p>
          </div>
        </form>
      </section>

      <style>{`
        @media (max-width: 768px) {
          form {
            grid-template-columns: 1fr !important;
          }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        textarea:focus, input[type="text"]:focus, input[type="tel"]:focus {
          border-color: rgba(82,183,136,0.5) !important;
          box-shadow: 0 0 0 3px rgba(82,183,136,0.1);
        }
      `}</style>
    </div>
  );
};

export default Checkout;
