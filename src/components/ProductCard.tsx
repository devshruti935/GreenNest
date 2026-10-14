import React from 'react';

type ProductCardProps = {
  img: string;
  name: string;
  price: string;
};

const ProductCard: React.FC<ProductCardProps> = ({ img, name, price }) => (
  <div className="product-card">
    <img src={img} alt={name} />
    <div className="info">
      <h3>{name}</h3>
      <div className="price">{price}</div>
      <button className="cta">Add to Cart</button>
    </div>
  </div>
);

export default ProductCard;
