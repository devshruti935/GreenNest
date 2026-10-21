import { useCart } from '../context/CartContext';
import type { CartItem } from '../context/CartContext';

type AddToCartControlProps = {
  product: Omit<CartItem, 'quantity'>;
  variant?: 'card' | 'primary';
};

const AddToCartControl = ({ product, variant = 'card' }: AddToCartControlProps) => {
  const { items, addToCart, updateQuantity } = useCart();
  const quantity = items.find((item) => item.id === product.id)?.quantity ?? 0;

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
      <button type="button" aria-label={`Add one ${product.name}`} onClick={() => updateQuantity(product.id, quantity + 1)}>+</button>
    </div>
  );
};

export default AddToCartControl;
