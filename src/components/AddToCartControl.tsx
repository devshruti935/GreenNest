import { MAX_QUANTITY_PER_PRODUCT, useCart } from '../context/CartContext';
import type { CartItem } from '../context/CartContext';

type AddToCartControlProps = {
  product: Omit<CartItem, 'quantity'>;
  variant?: 'card' | 'primary';
};

const AddToCartControl = ({ product, variant = 'card' }: AddToCartControlProps) => {
  const { items, addToCart, updateQuantity } = useCart();
  const quantity = items.find((item) => item.id === product.id)?.quantity ?? 0;
  const atLimit = quantity >= MAX_QUANTITY_PER_PRODUCT;

  if (quantity === 0) {
    return (
      <button
        type="button"
        className={variant === 'primary' ? 'btn btn-primary' : 'btn-add'}
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    );
  }

  return (
    <div className="cart-quantity-control" aria-label={`${product.name} quantity`}>
      <button type="button" aria-label={`Remove one ${product.name}`} onClick={() => updateQuantity(product.id, quantity - 1)}>−</button>
      <span aria-live="polite">{quantity}</span>
      <button type="button" aria-label={atLimit ? `Maximum ${MAX_QUANTITY_PER_PRODUCT} ${product.name} reached` : `Add one ${product.name}`} title={atLimit ? `Maximum ${MAX_QUANTITY_PER_PRODUCT} per product` : undefined} disabled={atLimit} onClick={() => updateQuantity(product.id, quantity + 1)}>+</button>
      {atLimit && <span className="quantity-limit-note">Max {MAX_QUANTITY_PER_PRODUCT}</span>}
    </div>
  );
};

export default AddToCartControl;
