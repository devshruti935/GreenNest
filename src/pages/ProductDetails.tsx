import { Link, useParams } from 'react-router-dom';
import { products } from './Shop';
import AddToCartControl from '../components/AddToCartControl';

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((item) => String(item.id) === id);

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
          <AddToCartControl
            variant="primary"
            product={{ id: product.id, name: product.name, price: product.price, image: product.image }}
          />
        </div>
      </article>
    </main>
  );
};

export default ProductDetails;
