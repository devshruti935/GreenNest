import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="page-enter">
        <section className="section" style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🛒</div>
          <h2 style={{ marginBottom: '0.75rem' }}>Your Cart is Empty</h2>
          <p style={{ color: '#6b8f7e', marginBottom: '2rem', maxWidth: '400px' }}>
            Looks like you haven't added any eco-friendly products yet. Start shopping to make a difference!
          </p>
          <Link to="/shop" className="btn btn-primary">Browse Products</Link>
        </section>
      </div>
    );
  }

  return (
    <div className="page-enter">
      <section className="section">
        <div className="section-header">
          <span className="label">Your Cart</span>
          <h2>Shopping Cart ({totalItems} item{totalItems !== 1 ? 's' : ''})</h2>
        </div>

        <div className="cart-layout">
          {/* Cart items */}
          <div className="cart-items">
            {items.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p className="cart-item-price">{item.price}</p>
                </div>
                <div className="cart-item-actions">
                  <div className="quantity-control">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                    🗑️ Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal ({totalItems} items)</span>
              <span>₹{totalPrice.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span style={{ color: '#52b788' }}>Free</span>
            </div>
            <div className="summary-row">
              <span>Eco Discount</span>
              <span style={{ color: '#52b788' }}>−₹{Math.round(totalPrice * 0.05).toLocaleString()}</span>
            </div>
            <div className="summary-divider" />
            <div className="summary-row summary-total">
              <span>Total</span>
              <span>₹{Math.round(totalPrice * 0.95).toLocaleString()}</span>
            </div>
            <div className="summary-row" style={{ marginTop: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: '#6b8f7e' }}>🌱 Points you'll earn</span>
              <span style={{ color: '#f4a261', fontWeight: 600 }}>+{Math.round(totalPrice * 0.95 / 10)}</span>
            </div>
            <Link to="/checkout" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1.5rem', textAlign: 'center', textDecoration: 'none' }}>
              Proceed to Checkout
            </Link>
            <button
              onClick={clearCart}
              style={{ width: '100%', marginTop: '0.75rem', padding: '0.6rem', background: 'none', border: '1px solid rgba(82,183,136,0.15)', borderRadius: '10px', color: '#6b8f7e', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}
            >
              Clear Cart
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
