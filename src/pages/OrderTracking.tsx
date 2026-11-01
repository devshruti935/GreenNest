import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const trackingSteps = [
  { title: 'Order confirmed', description: 'Your order has been received.' },
  { title: 'Preparing your order', description: 'We are getting your items ready.' },
  { title: 'On the way', description: 'Your package has left our facility.' },
  { title: 'Out for delivery', description: 'Your order is on its final trip to you.' },
  { title: 'Delivered', description: 'Your GreenNest order has arrived.' },
];

const getCurrentStep = (status: string) => {
  const normalized = status.toLowerCase();
  if (normalized.includes('deliver')) return normalized.includes('out for') ? 3 : 4;
  if (normalized.includes('ship') || normalized.includes('way')) return 2;
  if (normalized.includes('process') || normalized.includes('pack')) return 1;
  return 0;
};

const getEstimatedDate = (orderDate: string) => {
  const date = new Date(orderDate);
  if (Number.isNaN(date.getTime())) return '3–5 days after your order';
  date.setDate(date.getDate() + 5);
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long' });
};

const OrderTracking = () => {
  const { id } = useParams();
  const { user, cancelOrder } = useAuth();
  const order = user?.orders.find((item) => item.id === id);

  if (!user) {
    return (
      <main className="page-enter tracking-page">
        <section className="tracking-empty">
          <span aria-hidden="true" className="tracking-empty-icon">🔒</span>
          <h1>Sign in to track your order</h1>
          <p>Your order tracking is available from your account.</p>
          <Link className="btn btn-primary" to="/login">Sign In</Link>
        </section>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="page-enter tracking-page">
        <section className="tracking-empty">
          <span aria-hidden="true" className="tracking-empty-icon">📦</span>
          <h1>We couldn’t find that order</h1>
          <p>Check your order history to choose an order to track.</p>
          <Link className="btn btn-primary" to="/profile">View Profile</Link>
        </section>
      </main>
    );
  }

  const currentStep = getCurrentStep(order.status);
  const delivered = currentStep === trackingSteps.length - 1;
  const cancelled = order.status.toLowerCase() === 'cancelled';
  const handleCancelOrder = () => {
    if (window.confirm('Cancel this order? Its unspent GreenPoints will be removed.')) {
      cancelOrder(order.id);
    }
  };

  return (
    <main className="page-enter tracking-page">
      <div className="tracking-content">
        <Link className="tracking-back-link" to="/profile">← Back to profile</Link>
        <header className="tracking-header">
          <span className="label">ORDER TRACKING</span>
          <h1>Follow your order</h1>
          <p>Order <strong>{order.id}</strong> · Placed {order.date}</p>
        </header>

        <section className="tracking-card" aria-labelledby="tracking-status-title">
          <div className="tracking-summary">
            <div>
              <span className="tracking-summary-label">Current status</span>
              <h2 id="tracking-status-title">{cancelled ? 'Order cancelled' : trackingSteps[currentStep].title}</h2>
              <p>{cancelled ? 'This order has been cancelled.' : trackingSteps[currentStep].description}</p>
            </div>
            <div className="tracking-delivery-estimate">
              <span aria-hidden="true">{cancelled ? '↩️' : '🚚'}</span>
              <div>
                <span className="tracking-summary-label">{delivered || cancelled ? 'Order status' : 'Estimated delivery'}</span>
                <strong>{cancelled ? 'Cancelled' : delivered ? 'Delivered' : getEstimatedDate(order.date)}</strong>
              </div>
            </div>
          </div>

          {cancelled ? (
            <div className="tracking-cancelled" role="status">
              <strong>Cancellation complete</strong>
              <p>Any remaining GreenPoints earned from this order have been removed. Recycling pickups linked to this delivery are waiting to be paired with your next order.</p>
            </div>
          ) : (
            <>
              <ol className="tracking-timeline" aria-label="Order progress">
                {trackingSteps.map((step, index) => {
                  const complete = index < currentStep || (delivered && index === currentStep);
                  const active = index === currentStep && !delivered;
                  return (
                    <li
                      className={`tracking-step${complete ? ' is-complete' : ''}${active ? ' is-active' : ''}`}
                      key={step.title}
                      aria-current={active ? 'step' : undefined}
                    >
                      <span className="tracking-step-marker" aria-hidden="true">{complete ? '✓' : index + 1}</span>
                      <div className="tracking-step-copy">
                        <strong>{step.title}</strong>
                        <span>{step.description}</span>
                        {index === 0 && <small>{order.date}</small>}
                        {active && <small>Current update</small>}
                      </div>
                    </li>
                  );
                })}
              </ol>

              <p className="tracking-demo-note">This is demo tracking for the GreenNest UI prototype. Delivery updates are illustrative and aren’t live carrier updates.</p>
              {order.status === 'Processing' && (
                <button className="btn btn-outline order-cancel-button tracking-cancel-button" type="button" onClick={handleCancelOrder}>
                  Cancel Order
                </button>
              )}
            </>
          )}
        </section>

        <section className="tracking-card tracking-items" aria-labelledby="tracking-items-title">
          <div className="tracking-items-heading">
            <h2 id="tracking-items-title">Items in this order</h2>
            <strong>{order.total}</strong>
          </div>
          {order.products?.length ? order.products.map((product) => (
            <div className="tracking-order-item" key={product.id}>
              <span>{product.name}<small>Quantity: {product.quantity}</small></span>
              <strong>{product.price}</strong>
            </div>
          )) : <p className="tracking-demo-note">Item details are unavailable for this order.</p>}
        </section>
      </div>
    </main>
  );
};

export default OrderTracking;
