import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import AddToCartControl from '../components/AddToCartControl';
import { useAuth } from '../context/AuthContext';
import coconutShellBowlSet from '../assets/coconut-shell-bowl-set.png';
import bambooTravelMug from '../assets/bamboo-travel-mug.png';
import bambooComb from '../assets/bamboo-comb.png';
import coconutShellCandleHolder from '../assets/products/coconut-shell-candle-holder.jpg';
import bambooCutleryTravelKit from '../assets/products/bamboo-cutlery-travel-kit.jpg';
import bambooToothbrushPack from '../assets/products/bamboo-toothbrush-pack.jpg';
import bambooDeskOrganizer from '../assets/products/bamboo-desk-organizer.png';
import juteToteBag from '../assets/products/jute-tote-bag.jpg';
import organicCottonTote from '../assets/products/organic-cotton-tote.jpg';
import recycledFabricCushionCovers from '../assets/products/recycled-fabric-cushion-covers.jpg';
import beeswaxFoodWraps from '../assets/products/beeswax-food-wraps.jpg';
import naturalLoofahSpongeSet from '../assets/products/natural-loofah-sponge-set.jpg';
import recycledGlassVase from '../assets/products/recycled-glass-vase.jpg';
import seedPaperNotebook from '../assets/products/seed-paper-notebook.jpg';
import recycledPaperPencilSet from '../assets/products/recycled-paper-pencil-set.jpg';
import plantablePencils from '../assets/products/plantable-pencils.png';
import stainlessSteelWaterBottle from '../assets/products/stainless-steel-water-bottle.jpg';
import bambooStrawSet from '../assets/products/bamboo-straw-set.png';
import bambooSoapDish from '../assets/products/bamboo-soap-dish.png';
import organicCottonProduceBags from '../assets/products/organic-cotton-produce-bags.png';
import bambooCoconutShowpiece from '../assets/products/bamboo-coconut-showpiece.png';
import recycledPaperYearPlanner from '../assets/products/recycled-paper-year-planner.png';
import coconutShellPlanter from '../assets/products/coconut-shell-planter.png';
import greenNestCottonTote from '../assets/products/greennest-cotton-tote.png';

export const products = [
  // ── Coconut Shell Products ──
  {
    id: 1,
    name: 'Coconut Shell Bowl Set',
    desc: 'Hand-polished natural coconut shell bowls. Set of 4 with wooden spoons.',
    price: '₹899',
    image: coconutShellBowlSet,
    badge: 'Best Seller',
    category: 'Kitchen',
  },
  {
    id: 2,
    name: 'Coconut Shell Candle Holder',
    desc: 'Rustic hand-carved candle holder with natural coconut texture.',
    price: '₹449',
    image: coconutShellCandleHolder,
    badge: 'Artisan',
    category: 'Home Decor',
  },
  // ── Bamboo Products ──
  {
    id: 3,
    name: 'Bamboo Cutlery Travel Kit',
    desc: 'Reusable bamboo fork, knife, spoon, straw & chopsticks with cotton pouch.',
    price: '₹499',
    image: bambooCutleryTravelKit,
    badge: 'Eco Pick',
    category: 'Kitchen',
  },
  {
    id: 4,
    name: 'Bamboo Toothbrush Pack',
    desc: 'Pack of 4 biodegradable bamboo toothbrushes with charcoal bristles.',
    price: '₹299',
    image: bambooToothbrushPack,
    badge: 'Popular',
    category: 'Personal Care',
  },
  {
    id: 5,
    name: 'Bamboo Desk Organizer',
    desc: 'Multi-compartment bamboo organizer for pens, phones, and stationery.',
    price: '₹749',
    image: bambooDeskOrganizer,
    badge: 'New',
    category: 'Home Decor',
  },
  // ── Jute & Fabric ──
  {
    id: 6,
    name: 'Jute Tote Bag',
    desc: 'Durable hand-woven jute bag with reinforced handles for daily carry.',
    price: '₹349',
    image: juteToteBag,
    badge: 'Best Seller',
    category: 'Bags',
  },
  {
    id: 7,
    name: 'Organic Cotton Tote',
    desc: 'Lightweight organic cotton bag with botanical print. Machine washable.',
    price: '₹299',
    image: organicCottonTote,
    badge: 'Organic',
    category: 'Bags',
  },
  {
    id: 8,
    name: 'Recycled Fabric Cushion Covers',
    desc: 'Set of 2 cushion covers made from upcycled fabric scraps.',
    price: '₹599',
    image: recycledFabricCushionCovers,
    badge: 'Upcycled',
    category: 'Home Decor',
  },
  {
    id: 22,
    name: 'Organic Cotton Produce Bags',
    desc: 'Three washable mesh bags for carrying fruit, vegetables, and pantry staples.',
    price: '₹449',
    image: organicCottonProduceBags,
    badge: 'Reusable',
    category: 'Kitchen',
  },
  {
    id: 23,
    name: 'Bamboo & Coconut Shell Showpiece',
    desc: 'Handcrafted bamboo and coconut shell table decor, made with natural materials.',
    price: '₹899',
    image: bambooCoconutShowpiece,
    badge: 'Handcrafted',
    category: 'Home Decor',
  },
  {
    id: 24,
    name: 'Recycled Paper Year Planner',
    desc: 'A reusable year-at-a-glance planner printed on responsibly recycled paper.',
    price: '₹499',
    image: recycledPaperYearPlanner,
    badge: 'Recycled',
    category: 'Stationery',
  },
  {
    id: 25,
    name: 'Coconut Shell Planter',
    desc: 'A polished coconut shell planter that gives natural materials a second life.',
    price: '₹549',
    image: coconutShellPlanter,
    badge: 'Natural',
    category: 'Home Decor',
  },
  {
    id: 26,
    name: 'GreenNest Organic Cotton Tote',
    desc: 'A reusable cotton tote featuring the GreenNest logo, made for everyday errands.',
    price: '₹399',
    image: greenNestCottonTote,
    badge: 'GreenNest',
    category: 'Bags',
  },
  // ── Beeswax & Natural ──
  {
    id: 9,
    name: 'Beeswax Food Wraps',
    desc: 'Replace single-use plastic wrap. Pack of 3 sizes (S, M, L).',
    price: '₹599',
    image: beeswaxFoodWraps,
    badge: 'Eco Pick',
    category: 'Kitchen',
  },
  {
    id: 10,
    name: 'Natural Loofah Sponge Set',
    desc: 'Pack of 5 biodegradable loofahs for kitchen and bath use.',
    price: '₹249',
    image: naturalLoofahSpongeSet,
    badge: 'Natural',
    category: 'Personal Care',
  },
  {
    id: 19,
    name: 'Bamboo Wide-Tooth Comb',
    desc: 'Smooth, wide-tooth bamboo comb that gently detangles hair and is plastic-free.',
    price: '₹279',
    image: bambooComb,
    badge: 'Plastic-Free',
    category: 'Personal Care',
  },
  {
    id: 21,
    name: 'Bamboo Soap Dish',
    desc: 'Draining bamboo soap dish that helps your soap stay dry between uses.',
    price: '₹399',
    image: bambooSoapDish,
    badge: 'Natural',
    category: 'Personal Care',
  },
  // ── Glass & Ceramics ──
  {
    id: 11,
    name: 'Recycled Glass Vase',
    desc: 'Beautiful hand-blown vase from 100% recycled glass. Each one unique.',
    price: '₹1,299',
    image: recycledGlassVase,
    badge: 'Artisan',
    category: 'Home Decor',
  },
  
  // ── Stationery ──
  {
    id: 13,
    name: 'Seed Paper Notebook',
    desc: 'Write your notes, then plant the cover! Embedded with wildflower seeds.',
    price: '₹399',
    image: seedPaperNotebook,
    badge: 'Unique',
    category: 'Stationery',
  },
  {
    id: 14,
    name: 'Recycled Paper Pencil Set',
    desc: 'Set of 12 pencils made from recycled newspapers. Non-toxic.',
    price: '₹199',
    image: recycledPaperPencilSet,
    badge: 'Recycled',
    category: 'Stationery',
  },
  {
    id: 27,
    name: 'Plantable Pencils',
    desc: 'Set of 5 wooden pencils with seed capsules at the ends. Plant the stub after use to grow herbs or flowers.',
    price: '₹249',
    image: plantablePencils,
    badge: 'Plantable',
    category: 'Stationery',
  },
  // ── Drinkware ──
  {
    id: 17,
    name: 'Stainless Steel Water Bottle',
    desc: 'Double-wall insulated 750ml bottle. Keeps drinks cold 24hrs, hot 12hrs.',
    price: '₹799',
    image: stainlessSteelWaterBottle,
    badge: 'Popular',
    category: 'Drinkware',
  },
  {
    id: 18,
    name: 'Bamboo Travel Mug',
    desc: 'Leak-proof bamboo exterior travel mug with silicone lid. 350ml.',
    price: '₹549',
    image: bambooTravelMug,
    badge: 'New',
    category: 'Drinkware',
  },
  {
    id: 20,
    name: 'Bamboo Straw Set',
    desc: 'Set of 6 reusable bamboo straws with a cotton pouch and cleaning brush.',
    price: '₹329',
    image: bambooStrawSet,
    badge: 'Plastic-Free',
    category: 'Drinkware',
  },
];

const categories = Array.from(new Set(products.map((p) => p.category)));

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommended');
  const [searchParams, setSearchParams] = useSearchParams();
  const preserveCategoryOnFilterClear = useRef(false);
  const { favorites, toggleFavorite } = useAuth();
  const activeFilter = searchParams.get('filter') ?? 'all';
  const activeMaterial = searchParams.get('material') ?? '';
  const showNewArrivals = activeFilter === 'new';
  const showBestSellers = activeFilter === 'bestsellers';

  useEffect(() => {
    if (activeFilter === 'all' && !preserveCategoryOnFilterClear.current) setActiveCategory('All');
    preserveCategoryOnFilterClear.current = false;
  }, [activeFilter]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeFilter, activeMaterial]);

  const normalizedMaterial = activeMaterial.replace(/-/g, ' ');
  const filtered = products.filter((p) => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchArrival = !showNewArrivals || p.badge === 'New';
    const matchBestSeller = !showBestSellers || p.badge === 'Best Seller';
    const matchMaterial = !activeMaterial || `${p.name} ${p.desc}`.toLowerCase().replace(/[-–]/g, ' ').includes(normalizedMaterial);
    const matchSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchArrival && matchBestSeller && matchMaterial && matchSearch;
  });
  const sortedProducts = [...filtered].sort((a, b) => {
    if (sortBy === 'price-low') return Number(a.price.replace(/[₹,]/g, '')) - Number(b.price.replace(/[₹,]/g, ''));
    if (sortBy === 'price-high') return Number(b.price.replace(/[₹,]/g, '')) - Number(a.price.replace(/[₹,]/g, ''));
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
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

          <label className="sort-control">
            <span>Sort by</span>
            <select className="sort-select" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="name">Name: A–Z</option>
            </select>
          </label>

          {/* Category filters */}
          <div className="category-filters">
            <button
              className={`filter-chip ${showBestSellers ? 'active' : ''}`}
              onClick={() => setSearchParams({ filter: 'bestsellers' })}
            >
              Best Sellers
            </button>
            <button
              className={`filter-chip ${showNewArrivals ? 'active' : ''}`}
              onClick={() => setSearchParams({ filter: 'new' })}
            >
              New Arrivals
            </button>
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
          {(activeCategory !== 'All' || showBestSellers || showNewArrivals || activeMaterial || searchQuery.trim()) && (
            <div className="active-filter-list" aria-label="Active filters">
              {activeCategory !== 'All' && (
                <button type="button" className="active-filter-chip" onClick={() => setActiveCategory('All')} aria-label={`Remove ${activeCategory} category filter`}>
                  {activeCategory}<span aria-hidden="true">×</span>
                </button>
              )}
              {(showBestSellers || showNewArrivals) && (
                <button
                  type="button"
                  className="active-filter-chip"
                  onClick={() => {
                    preserveCategoryOnFilterClear.current = true;
                    setSearchParams({ filter: 'all' });
                  }}
                  aria-label={`Remove ${showBestSellers ? 'Best Sellers' : 'New Arrivals'} filter`}
                >
                  {showBestSellers ? 'Best Sellers' : 'New Arrivals'}<span aria-hidden="true">×</span>
                </button>
              )}
              {activeMaterial && (
                <button
                  type="button"
                  className="active-filter-chip"
                  onClick={() => setSearchParams({ filter: activeFilter })}
                  aria-label={`Remove ${normalizedMaterial} material filter`}
                >
                  Material: {normalizedMaterial}<span aria-hidden="true">×</span>
                </button>
              )}
              {searchQuery.trim() && (
                <button type="button" className="active-filter-chip" onClick={() => setSearchQuery('')} aria-label={`Clear search for ${searchQuery.trim()}`}>
                  Search: {searchQuery.trim()}<span aria-hidden="true">×</span>
                </button>
              )}
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '.75rem' }}>
            <button
              type="button"
              className="filter-chip"
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
                setSearchParams({ filter: 'all' });
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Clear all filters
            </button>
          </div>
        </div>

        {/* Results count */}
        <p style={{ color: '#6b8f7e', fontSize: '0.9rem', marginBottom: '1.5rem', textAlign: 'center' }}>
          Showing {filtered.length} product{filtered.length !== 1 ? 's' : ''}
          {showBestSellers ? ' in Best Sellers' : ''}
          {showNewArrivals ? ' in New Arrivals' : ''}
          {activeMaterial ? ` made with ${activeMaterial.replace(/-/g, ' ')}` : ''}
          {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
        </p>

        <div className="product-grid">
          {sortedProducts.map((product) => (
            <div className="product-card" key={product.id} style={{ position: 'relative' }}>
              <Link to={`/product/${product.id}`} className="product-detail-link">
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
                </div>
              </Link>
              <button
                type="button"
                aria-label={favorites.includes(product.id) ? `Remove ${product.name} from favorites` : `Add ${product.name} to favorites`}
                title={favorites.includes(product.id) ? 'Remove from favorites' : 'Add to favorites'}
                onClick={() => toggleFavorite(product.id)}
                style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 2, border: '1px solid rgba(82,183,136,.3)', borderRadius: '50%', width: '38px', height: '38px', cursor: 'pointer', background: 'rgba(10,30,20,.85)', color: '#ff8fab', fontSize: '1.2rem' }}
              >{favorites.includes(product.id) ? '♥' : '♡'}</button>
              <div className="product-info product-bottom">
                <span className="price">{product.price}</span>
                <AddToCartControl product={{ id: product.id, name: product.name, price: product.price, image: product.image }} />
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
