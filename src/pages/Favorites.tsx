import { Link } from 'react-router-dom';
import { products } from './Shop';
import AddToCartControl from '../components/AddToCartControl';
import { useAuth } from '../context/AuthContext';

const Favorites = () => {
  const { favorites, toggleFavorite } = useAuth();
  const favoriteProducts = products.filter((product) => favorites.includes(product.id));

  return (
    <main className="section page-enter">
      <div className="section-header">
        <span className="label">Your Collection</span>
        <h2>Favorites</h2>
        <p>Products you have saved for later.</p>
      </div>
      {favoriteProducts.length ? (
        <div className="product-grid">
          {favoriteProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <Link to={`/product/${product.id}`} className="product-detail-link">
                <div className="product-image-wrapper">
                  <img className="product-image" src={product.image} alt={product.name} />
                  <span className="eco-badge">{product.badge}</span>
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="product-desc">{product.desc}</p>
                </div>
              </Link>
              <div className="product-info product-bottom">
                <span className="price">{product.price}</span>
                <AddToCartControl product={{ id: product.id, name: product.name, price: product.price, image: product.image }} />
              </div>
              <button type="button" className="btn btn-outline" style={{ margin: '0 1rem 1rem' }} onClick={() => toggleFavorite(product.id)}>
                Remove from Favorites
              </button>
            </article>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#8fbfa8' }}>
          <p style={{ fontSize: '1.1rem', marginBottom: '1.25rem' }}>You haven't saved any products yet.</p>
          <Link to="/shop" className="btn btn-primary">Explore the Shop</Link>
        </div>
      )}
    </main>
  );
};

export default Favorites;
