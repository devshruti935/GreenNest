import React from 'react';
import ProductCard from './ProductCard';

// Temporary static product list – replace with API data later
const sampleProducts = [
  {
    img: 'https://images.unsplash.com/photo-1591035897813-6951b57f5f2c?auto=format&fit=crop&w=400&q=80',
    name: 'Coconut Shell Bowl',
    price: '₹ 1,199',
  },
  {
    img: 'https://images.unsplash.com/photo-1608597028820-8f2c0c2d1c15?auto=format&fit=crop&w=400&q=80',
    name: 'Bamboo Cutlery Set',
    price: '₹ 899',
  },
  {
    img: 'https://images.unsplash.com/photo-1624482451500-7d5b80e1a6c9?auto=format&fit=crop&w=400&q=80',
    name: 'Recycled Fabric Tote',
    price: '₹ 749',
  },
];

const ProductGrid: React.FC = () => (
  <section className="product-grid">
    {sampleProducts.map((product) => (
      <ProductCard
        key={product.name}
        img={product.img}
        name={product.name}
        price={product.price}
      />
    ))}
  </section>
);

export default ProductGrid;
