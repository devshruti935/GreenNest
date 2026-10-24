import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { products } from './Shop';
import AddToCartControl from '../components/AddToCartControl';
import { useAuth } from '../context/AuthContext';

interface ProductReview {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const ProductDetails = () => {
  const { id } = useParams();
  const { favorites, toggleFavorite, user } = useAuth();
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [reviewerName, setReviewerName] = useState(user?.name ?? '');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewMessage, setReviewMessage] = useState('');
  const product = products.find((item) => String(item.id) === id);

  useEffect(() => {
    setReviewerName(user?.name ?? '');
  }, [user?.name]);

  useEffect(() => {
    if (!id) return;
    try {
      const saved = localStorage.getItem(`greennest-reviews-${id}`);
      setReviews(saved ? JSON.parse(saved) as ProductReview[] : []);
    } catch {
      setReviews([]);
    }
    setReviewMessage('');
  }, [id]);

  const submitReview = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanName = reviewerName.trim();
    const cleanComment = comment.trim();
    if (!cleanName || cleanComment.length < 5 || !id) {
      setReviewMessage('Enter your name and a review of at least 5 characters.');
      return;
    }

    const updatedReviews = [{
      id: `${Date.now()}`,
      name: cleanName,
      rating,
      comment: cleanComment,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    }, ...reviews];

    try {
      localStorage.setItem(`greennest-reviews-${id}`, JSON.stringify(updatedReviews));
      setReviews(updatedReviews);
      setComment('');
      setRating(5);
      setReviewMessage('Your review has been added.');
    } catch {
      setReviewMessage('Could not save your review in this browser. Please try again.');
    }
  };

  if (!product) {
    return (
      <main className="section page-enter product-not-found">
        <h2>Product not found</h2>
        <Link to="/shop" className="btn btn-primary">Back to Shop</Link>
      </main>
    );
  }

  return (
    <main className="section page-enter">
      <Link to="/shop" className="product-back-link">← Back to Shop</Link>
      <article className="product-detail">
        <div className="product-detail-image-wrap">
          <img src={product.image} alt={product.name} className="product-detail-image" />
        </div>
        <div className="product-detail-content">
          <span className="product-detail-category">{product.category} · {product.badge}</span>
          <h1>{product.name}</h1>
          <p className="product-detail-price">{product.price}</p>
          <h2>About this product</h2>
          <p className="product-detail-description">{product.desc}</p>
          <button type="button" className="btn btn-outline" onClick={() => toggleFavorite(product.id)} style={{ marginBottom: '1rem' }}>
            {favorites.includes(product.id) ? '♥ Remove from Favorites' : '♡ Add to Favorites'}
          </button>
          <AddToCartControl
            variant="primary"
            product={{ id: product.id, name: product.name, price: product.price, image: product.image }}
          />
        </div>
      </article>
      <section aria-labelledby="product-reviews-title" style={{ maxWidth: '900px', margin: '3rem auto 0' }}>
        <div className="section-header" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
          <span className="label">Customer feedback</span>
          <h2 id="product-reviews-title">Product Reviews</h2>
          <p>Share your experience with {product.name}.</p>
        </div>
        <form onSubmit={submitReview} style={{ display: 'grid', gap: '1rem', padding: '1.5rem', borderRadius: '16px', background: 'rgba(10,30,20,.55)', border: '1px solid rgba(82,183,136,.18)' }}>
          <label style={{ color: '#a5c4b5', display: 'grid', gap: '.45rem' }}>
            Your name
            <input value={reviewerName} onChange={(event) => setReviewerName(event.target.value)} maxLength={60} required placeholder="Enter your name" style={reviewInputStyle} />
          </label>
          <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
            <legend style={{ color: '#a5c4b5', marginBottom: '.45rem' }}>Rating</legend>
            <div role="radiogroup" aria-label="Product rating" style={{ display: 'flex', gap: '.35rem' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} type="button" role="radio" aria-checked={rating === star} aria-label={`${star} ${star === 1 ? 'star' : 'stars'}`} onClick={() => setRating(star)} style={{ border: 0, background: 'transparent', color: star <= rating ? '#f4a261' : '#587366', cursor: 'pointer', fontSize: '1.8rem', padding: '.1rem' }}>★</button>
              ))}
            </div>
          </fieldset>
          <label style={{ color: '#a5c4b5', display: 'grid', gap: '.45rem' }}>
            Your review
            <textarea value={comment} onChange={(event) => setComment(event.target.value)} minLength={5} maxLength={1000} required rows={4} placeholder="What did you think of this product?" style={{ ...reviewInputStyle, resize: 'vertical' }} />
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" type="submit">Submit review</button>
            {reviewMessage && <span role="status" style={{ color: '#a5c4b5', fontSize: '.9rem' }}>{reviewMessage}</span>}
          </div>
          <small style={{ color: '#6b8f7e' }}>Reviews are saved in this browser on this device.</small>
        </form>
        <div style={{ display: 'grid', gap: '.9rem', marginTop: '1.5rem' }}>
          {reviews.map((review) => (
            <article key={review.id} style={{ padding: '1.25rem 1.5rem', borderRadius: '14px', background: 'rgba(10,30,20,.4)', border: '1px solid rgba(82,183,136,.14)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                <strong style={{ color: '#d4e8db' }}>{review.name}</strong>
                <time style={{ color: '#6b8f7e', fontSize: '.85rem' }}>{review.date}</time>
              </div>
              <div aria-label={`${review.rating} out of 5 stars`} style={{ color: '#f4a261', margin: '.35rem 0' }}>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</div>
              <p style={{ color: '#a5c4b5', whiteSpace: 'pre-wrap', margin: 0 }}>{review.comment}</p>
            </article>
          ))}
          {reviews.length === 0 && <p style={{ color: '#6b8f7e' }}>No reviews yet. Be the first to share your experience.</p>}
        </div>
      </section>
    </main>
  );
};

const reviewInputStyle: React.CSSProperties = {
  width: '100%',
  padding: '.8rem 1rem',
  borderRadius: '10px',
  border: '1px solid rgba(82,183,136,.25)',
  background: 'rgba(82,183,136,.07)',
  color: '#d4e8db',
  font: 'inherit',
  outline: 'none',
};

export default ProductDetails;
