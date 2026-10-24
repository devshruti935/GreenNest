import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';

const cities = [
  'Ahmedabad', 'Bengaluru', 'Bhopal', 'Bhubaneswar', 'Chandigarh', 'Chennai',
  'Coimbatore', 'Dehradun', 'Delhi', 'Guwahati', 'Hyderabad', 'Indore', 'Jaipur',
  'Kanpur', 'Kochi', 'Kolkata', 'Lucknow', 'Mumbai', 'Mysuru', 'Nagpur', 'Patna',
  'Pune', 'Surat', 'Thiruvananthapuram', 'Visakhapatnam',
];

const paymentInputStyle = {
  display: 'block',
  width: '100%',
  marginTop: '.4rem',
  padding: '.75rem 1rem',
  background: 'rgba(82,183,136,0.08)',
  border: '1px solid rgba(82,183,136,0.2)',
  borderRadius: '10px',
  color: '#d4e8db',
  fontFamily: 'Inter, sans-serif',
  fontSize: '.95rem',
  outline: 'none',
};

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user, addPoints, addOrder, attachPendingPickups } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [customCity, setCustomCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMode, setPaymentMode] = useState('cod');
  const [cardholder, setCardholder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [bankName, setBankName] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [pointsEarned, setPointsEarned] = useState(0);

  const finalTotal = Math.round(totalPrice * 0.95);
  const demoUpiIntent = `upi://pay?pa=demo%40greennest.invalid&pn=GreenNest%20Demo&am=${finalTotal}&cu=INR&tn=Demo%20order`;

  useEffect(() => {
    if (orderPlaced) window.scrollTo(0, 0);
  }, [orderPlaced]);

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
    const cleanAddress = address.trim().replace(/[ \t]+/g, ' ');
    const cleanCity = (city === 'Other' ? customCity : city).trim().replace(/\s+/g, ' ');
    if (cleanAddress.length < 10 || !cleanCity || !/^\d{6}$/.test(pincode) || !/^\d{10}$/.test(phone)) {
      alert('Enter a complete address, a 6-digit PIN code, and a 10-digit phone number.');
      return;
    }
    setAddress(cleanAddress);
    setCity(cleanCity);
    const earned = Math.max(1, Math.round(finalTotal / 10));
    setPointsEarned(earned);
    addPoints(earned);
    // Generate a random order ID
    const id = 'GN-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase();
    setOrderId(id);
    addOrder({
      id,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      items: items.reduce((count, item) => count + item.quantity, 0),
      products: items.map(({ id: productId, name, quantity, price }) => ({ id: productId, name, quantity, price })),
      pointsEarned: earned,
      total: `₹${finalTotal.toLocaleString()}`,
      status: 'Processing',
    });
    if (user.pickups.some((pickup) => pickup.status === 'Awaiting next order delivery')) {
      attachPendingPickups(id);
    }
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
              🌱 You earned <strong>+{pointsEarned}</strong> green points!
            </p>
            {user.pickups.some((pickup) => pickup.orderId === orderId) && (
              <p role="status" style={{ color: '#52b788', marginBottom: '1.5rem' }}>
                ♻️ Your recycling items are scheduled to be picked up with this order's delivery.
              </p>
            )}
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
                    onBlur={() => setAddress((current) => current.trim().replace(/[ \t]+/g, ' '))}
                    placeholder="House/flat number, street, and locality"
                    rows={3}
                    minLength={10}
                    maxLength={200}
                    autoComplete="street-address"
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
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      autoComplete="address-level2"
                      required
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        background: '#e5f0e7',
                        border: '1px solid rgba(82,183,136,0.2)',
                        borderRadius: '10px',
                        color: '#173b2b',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.95rem',
                        outline: 'none',
                        colorScheme: 'light',
                      }}
                    >
                      <option value="" style={{ color: '#173b2b', backgroundColor: '#f7faf7' }}>Choose your city</option>
                      {cities.map((cityOption) => <option key={cityOption} value={cityOption} style={{ color: '#173b2b', backgroundColor: '#f7faf7' }}>{cityOption}</option>)}
                      <option value="Other" style={{ color: '#173b2b', backgroundColor: '#f7faf7' }}>Other</option>
                    </select>
                    {city === 'Other' && (
                      <input
                        type="text"
                        value={customCity}
                        onChange={(e) => setCustomCity(e.target.value)}
                        onBlur={() => setCustomCity((current) => current.trim().replace(/\s+/g, ' '))}
                        placeholder="Enter your city"
                        minLength={2}
                        maxLength={60}
                        autoComplete="address-level2"
                        required
                        style={{
                          width: '100%',
                          marginTop: '.6rem',
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
                    )}
                  </div>
                  <div>
                    <label style={{ color: '#8fbfa8', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Pincode *</label>
                    <input
                      type="text"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="6-digit PIN code"
                      inputMode="numeric"
                      pattern="[0-9]{6}"
                      maxLength={6}
                      autoComplete="postal-code"
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
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="10-digit mobile number"
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    maxLength={10}
                    autoComplete="tel-national"
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

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', padding: '1.25rem 1.5rem', borderRadius: '14px', background: 'rgba(82,183,136,0.08)', border: '1px solid rgba(82,183,136,0.2)' }}>
              <div>
                <strong style={{ color: '#52b788' }}>♻️ Want to recycle with GreenNest?</strong>
                <p style={{ color: '#8fbfa8', fontSize: '.88rem', marginTop: '.25rem' }}>Schedule a recycling pickup to go with your order.</p>
              </div>
              <button type="button" className="btn btn-outline" onClick={() => navigate('/recycling')}>
                Recycle with this order
              </button>
            </div>

            {user.pickups.filter((pickup) => pickup.status === 'Awaiting next order delivery').length > 0 && (
              <div style={{ padding: '1.25rem 1.5rem', borderRadius: '14px', background: 'rgba(82,183,136,0.08)', border: '1px solid rgba(82,183,136,0.2)' }}>
                <strong style={{ color: '#52b788' }}>♻️ Recycling pickup added to this order</strong>
                {user.pickups.filter((pickup) => pickup.status === 'Awaiting next order delivery').map((pickup) => (
                  <p key={pickup.id} style={{ color: '#8fbfa8', fontSize: '.9rem', marginTop: '.45rem' }}>
                    {pickup.materials.join(', ')} · {pickup.date}
                  </p>
                ))}
              </div>
            )}

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

              {paymentMode === 'upi' && (
                <div style={{ marginTop: '1.25rem', padding: '1.25rem', borderRadius: '12px', background: 'rgba(82,183,136,0.07)', border: '1px solid rgba(82,183,136,0.15)', textAlign: 'center' }}>
                  <h4 style={{ color: '#d4e8db', marginBottom: '.75rem' }}>Scan with any UPI app</h4>
                  <div style={{ display: 'inline-block', padding: '0.75rem', borderRadius: '12px', background: '#fff' }}>
                    <QRCodeSVG value={demoUpiIntent} size={180} level="M" />
                  </div>
                  <p style={{ color: '#f4a261', fontWeight: 600, marginTop: '.75rem' }}>Demo QR — payments are not enabled</p>
                  <p style={{ color: '#8fbfa8', fontSize: '.85rem', marginTop: '.35rem' }}>A real GreenNest UPI ID and payment verification are needed to accept payments.</p>
                </div>
              )}

              {paymentMode === 'card' && (
                <div style={{ marginTop: '1.25rem', padding: '1.25rem', borderRadius: '12px', background: 'rgba(82,183,136,0.07)', border: '1px solid rgba(82,183,136,0.15)', display: 'grid', gap: '1rem' }}>
                  <h4 style={{ color: '#d4e8db' }}>Card details</h4>
                  <label style={{ color: '#8fbfa8', fontSize: '.85rem' }}>Name on card
                    <input value={cardholder} onChange={(e) => setCardholder(e.target.value)} autoComplete="cc-name" placeholder="Cardholder name" minLength={2} required style={paymentInputStyle} />
                  </label>
                  <label style={{ color: '#8fbfa8', fontSize: '.85rem' }}>Card number
                    <input value={cardNumber} onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 19).replace(/(.{4})/g, '$1 ').trim())} autoComplete="cc-number" inputMode="numeric" placeholder="1234 5678 9012 3456" minLength={19} maxLength={23} required style={paymentInputStyle} />
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.75rem' }}>
                    <label style={{ color: '#8fbfa8', fontSize: '.85rem' }}>Expiry (MM/YY)
                      <input value={cardExpiry} onChange={(e) => { const digits = e.target.value.replace(/\D/g, '').slice(0, 4); setCardExpiry(digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits); }} autoComplete="cc-exp" inputMode="numeric" placeholder="MM/YY" pattern="(0[1-9]|1[0-2])/[0-9]{2}" maxLength={5} required style={paymentInputStyle} />
                    </label>
                    <label style={{ color: '#8fbfa8', fontSize: '.85rem' }}>CVV
                      <input type="password" value={cardCvv} onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))} autoComplete="cc-csc" inputMode="numeric" placeholder="3–4 digits" pattern="[0-9]{3,4}" minLength={3} maxLength={4} required style={paymentInputStyle} />
                    </label>
                  </div>
                  <p style={{ color: '#f4a261', fontSize: '.82rem' }}>Demo checkout only. Card information is not sent, charged, or saved.</p>
                </div>
              )}

              {paymentMode === 'netbanking' && (
                <div style={{ marginTop: '1.25rem', padding: '1.25rem', borderRadius: '12px', background: 'rgba(82,183,136,0.07)', border: '1px solid rgba(82,183,136,0.15)' }}>
                  <label htmlFor="bank-name" style={{ color: '#8fbfa8', fontSize: '.85rem' }}>Choose your bank
                    <select id="bank-name" value={bankName} onChange={(e) => setBankName(e.target.value)} required style={{ ...paymentInputStyle, background: '#e5f0e7', color: '#173b2b', colorScheme: 'light' }}>
                      <option value="" style={{ color: '#173b2b', backgroundColor: '#f7faf7' }}>Select a bank</option>
                      <option style={{ color: '#173b2b', backgroundColor: '#f7faf7' }}>State Bank of India</option>
                      <option style={{ color: '#173b2b', backgroundColor: '#f7faf7' }}>HDFC Bank</option>
                      <option style={{ color: '#173b2b', backgroundColor: '#f7faf7' }}>ICICI Bank</option>
                      <option style={{ color: '#173b2b', backgroundColor: '#f7faf7' }}>Axis Bank</option>
                      <option style={{ color: '#173b2b', backgroundColor: '#f7faf7' }}>Kotak Mahindra Bank</option>
                      <option style={{ color: '#173b2b', backgroundColor: '#f7faf7' }}>Punjab National Bank</option>
                      <option style={{ color: '#173b2b', backgroundColor: '#f7faf7' }}>Other bank</option>
                    </select>
                  </label>
                  <p style={{ color: '#f4a261', fontSize: '.82rem', marginTop: '.75rem' }}>Demo checkout only. Bank sign-in and payment processing are not connected.</p>
                </div>
              )}

              {paymentMode === 'cod' && (
                <p style={{ color: '#8fbfa8', fontSize: '.85rem', marginTop: '1rem' }}>No payment details needed. Pay when your order is delivered.</p>
              )}
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
