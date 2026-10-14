import { useState } from 'react';
import { useCart } from '../context/CartContext';

const products = [
  // ── Coconut Shell Products ──
  {
    id: 1,
    name: 'Coconut Shell Bowl Set',
    desc: 'Hand-polished natural coconut shell bowls. Set of 4 with wooden spoons.',
    price: '₹899',
    image: 'https://images.unsplash.com/photo-1625943553852-781c6dd46faa?auto=format&fit=crop&w=600&q=80',
    badge: 'Best Seller',
    category: 'Kitchen',
  },
  {
    id: 2,
    name: 'Coconut Shell Candle Holder',
    desc: 'Rustic hand-carved candle holder with natural coconut texture.',
    price: '₹449',
    image: 'https://images.unsplash.com/photo-1602607616315-75254e033120?auto=format&fit=crop&w=600&q=80',
    badge: 'Artisan',
    category: 'Home Decor',
  },
  // ── Bamboo Products ──
  {
    id: 3,
    name: 'Bamboo Cutlery Travel Kit',
    desc: 'Reusable bamboo fork, knife, spoon, straw & chopsticks with cotton pouch.',
    price: '₹499',
    image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=600&q=80',
    badge: 'Eco Pick',
    category: 'Kitchen',
  },
  {
    id: 4,
    name: 'Bamboo Toothbrush Pack',
    desc: 'Pack of 4 biodegradable bamboo toothbrushes with charcoal bristles.',
    price: '₹299',
    image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=600&q=80',
    badge: 'Popular',
    category: 'Personal Care',
  },
  {
    id: 5,
    name: 'Bamboo Desk Organizer',
    desc: 'Multi-compartment bamboo organizer for pens, phones, and stationery.',
    price: '₹749',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
    badge: 'New',
    category: 'Office',
  },
  // ── Jute & Fabric ──
  {
    id: 6,
    name: 'Jute Tote Bag',
    desc: 'Durable hand-woven jute bag with reinforced handles for daily carry.',
    price: '₹349',
    image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=600&q=80',
    badge: 'Best Seller',
    category: 'Bags',
  },
  {
    id: 7,
    name: 'Organic Cotton Tote',
    desc: 'Lightweight organic cotton bag with botanical print. Machine washable.',
    price: '₹299',
    image: 'https://images.unsplash.com/photo-1597484662317-9bd7bdda2907?auto=format&fit=crop&w=600&q=80',
    badge: 'Organic',
    category: 'Bags',
  },
  {
    id: 8,
    name: 'Recycled Fabric Cushion Covers',
    desc: 'Set of 2 cushion covers made from upcycled fabric scraps.',
    price: '₹599',
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80',
    badge: 'Upcycled',
    category: 'Home Decor',
  },
  // ── Beeswax & Natural ──
  {
    id: 9,
    name: 'Beeswax Food Wraps',
    desc: 'Replace single-use plastic wrap. Pack of 3 sizes (S, M, L).',
    price: '₹599',
    image: 'https://images.unsplash.com/photo-1611068661807-2be5e5fb2e81?auto=format&fit=crop&w=600&q=80',
    badge: 'Eco Pick',
    category: 'Kitchen',
  },
  {
    id: 10,
    name: 'Natural Loofah Sponge Set',
    desc: 'Pack of 5 biodegradable loofahs for kitchen and bath use.',
    price: '₹249',
    image: 'https://images.unsplash.com/photo-1598662779094-110c2bad80b5?auto=format&fit=crop&w=600&q=80',
    badge: 'Natural',
    category: 'Personal Care',
  },
  // ── Glass & Ceramics ──
  {
    id: 11,
    name: 'Recycled Glass Vase',
    desc: 'Beautiful hand-blown vase from 100% recycled glass. Each one unique.',
    price: '₹1,299',
    image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=600&q=80',
    badge: 'Artisan',
    category: 'Home Decor',
  },
  {
    id: 12,
    name: 'Terracotta Planter Set',
    desc: 'Set of 3 handmade terracotta planters with saucers. Perfect for herbs.',
    price: '₹649',
    image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=600&q=80',
    badge: 'Handmade',
    category: 'Garden',
  },
  // ── Stationery ──
  {
    id: 13,
    name: 'Seed Paper Notebook',
    desc: 'Write your notes, then plant the cover! Embedded with wildflower seeds.',
    price: '₹399',
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=600&q=80',
    badge: 'Unique',
    category: 'Stationery',
  },
  {
    id: 14,
    name: 'Recycled Paper Pencil Set',
    desc: 'Set of 12 pencils made from recycled newspapers. Non-toxic.',
    price: '₹199',
    image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=600&q=80',
    badge: 'Recycled',
    category: 'Stationery',
  },
  // ── Textiles ──
  {
    id: 15,
    name: 'Organic Cotton Towels',
    desc: 'Soft, chemical-free bath towels dyed with plant-based colors. Set of 2.',
    price: '₹749',
    image: 'https://images.unsplash.com/photo-1616627547584-bf28cee262db?auto=format&fit=crop&w=600&q=80',
    badge: 'Organic',
    category: 'Bath',
  },
  {
    id: 16,
    name: 'Hemp Yoga Mat',
    desc: 'Natural hemp and rubber yoga mat. Anti-slip, biodegradable.',
    price: '₹1,499',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80',
    badge: 'Premium',
    category: 'Fitness',
  },
  // ── Drinkware ──
  {
    id: 17,
    name: 'Stainless Steel Water Bottle',
    desc: 'Double-wall insulated 750ml bottle. Keeps drinks cold 24hrs, hot 12hrs.',
    price: '₹799',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80',
    badge: 'Popular',
    category: 'Drinkware',
  },
  {
    id: 18,
    name: 'Bamboo Travel Mug',
    desc: 'Leak-proof bamboo exterior travel mug with silicone lid. 350ml.',
    price: '₹549',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=600&q=80',
    badge: 'New',
    category: 'Drinkware',
  },
];

const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))];

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();

  const filtered = products.filter((p) => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="page-enter">
      <section className="section">
        <div className="section-header">
          <span className="label">Our Collection</span>
          <h2>Sustainable Products</h2>
          <p>Every item is crafted with care for both you and the planet. {products.length} eco-friendly products and counting.</p>
        </div>

        {/* Search bar */}
        <div className="shop-controls">
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category filters */}
          <div className="category-filters">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-chip ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p style={{ color: '#6b8f7e', fontSize: '0.9rem', marginBottom: '1.5rem', textAlign: 'center' }}>
          Showing {filtered.length} product{filtered.length !== 1 ? 's' : ''}
          {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
        </p>

        <div className="product-grid">
          {filtered.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-image-wrapper">
                <img
                  className="product-image"
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                />
                <span className="eco-badge">{product.badge}</span>
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-desc">{product.desc}</p>
                <div className="product-bottom">
                  <span className="price">{product.price}</span>
                  <button className="btn-add" onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, image: product.image })}>Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#6b8f7e' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <h3 style={{ color: '#a5c4b5' }}>No products found</h3>
            <p>Try a different search term or category.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Shop;
