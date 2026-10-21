import React from 'react';
import ProductCard from './ProductCard';
import coconutShellBowlSet from '../assets/coconut-shell-bowl-set.png';
import bambooCutleryTravelKit from '../assets/products/bamboo-cutlery-travel-kit.jpg';
import juteToteBag from '../assets/products/jute-tote-bag.jpg';

// Temporary static product list – replace with API data later
const sampleProducts = [
  {
    img: coconutShellBowlSet,
    name: 'Coconut Shell Bowl Set',
    price: '₹ 899',
  },
  {
    img: bambooCutleryTravelKit,
    name: 'Bamboo Cutlery Travel Kit',
    price: '₹ 499',
  },
  {
    img: juteToteBag,
    name: 'Jute Tote Bag',
    price: '₹ 349',
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
