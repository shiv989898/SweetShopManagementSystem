import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { sweetsAPI } from '../api/api';
import '../styles/Cart.css';

interface CartProps {
  onClose: () => void;
  onCheckoutSuccess: () => void;
}

const Cart: React.FC<CartProps> = ({ onClose, onCheckoutSuccess }) => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheckout = async () => {
    setLoading(true);
    setError('');

    try {
      // Process each item in the cart
      for (const item of cartItems) {
        await sweetsAPI.purchase(item.id, item.cartQuantity);
      }
      
      clearCart();
      onCheckoutSuccess();
      alert('Purchase successful! Thank you for your order.');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Checkout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content cart-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>🛒 Shopping Cart</h2>
          <button onClick={onClose} className="btn-close">✕</button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <button onClick={onClose} className="btn-primary">Continue Shopping</button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  {item.imageUrl && (
                    <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                  )}
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p className="cart-item-price">₹{item.price}</p>
                  </div>
                  <div className="cart-item-actions">
                    <div className="quantity-controls">
                      <button
                        onClick={() => updateQuantity(item.id, item.cartQuantity - 1)}
                        className="btn-quantity"
                      >
                        -
                      </button>
                      <span className="quantity">{item.cartQuantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.cartQuantity + 1)}
                        className="btn-quantity"
                        disabled={item.cartQuantity >= item.quantity}
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="btn-remove"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="cart-item-total">
                    ₹{(item.price * item.cartQuantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total">
                <h3>Total: ₹{getTotalPrice().toFixed(2)}</h3>
              </div>
              <div className="cart-actions">
                <button onClick={() => clearCart()} className="btn-secondary">
                  Clear Cart
                </button>
                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="btn-primary"
                >
                  {loading ? 'Processing...' : 'Checkout'}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
