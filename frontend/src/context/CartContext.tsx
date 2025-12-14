import React, { createContext, useContext, useState, useEffect } from 'react';
import { Sweet } from '../api/api';

interface CartItem extends Sweet {
  cartQuantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (sweet: Sweet) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (sweet: Sweet) => {
    console.log('Adding to cart:', sweet.name, 'ID:', sweet.id);
    setCartItems(prev => {
      console.log('Current cart items:', prev.map(i => ({ name: i.name, id: i.id })));
      const existingItem = prev.find(item => item.id === sweet.id);
      if (existingItem) {
        console.log('Item exists, incrementing quantity');
        return prev.map(item =>
          item.id === sweet.id
            ? { ...item, cartQuantity: Math.min(item.cartQuantity + 1, sweet.quantity) }
            : item
        );
      }
      console.log('New item, adding to cart');
      const newItem: CartItem = { ...sweet, cartQuantity: 1 };
      return [...prev, newItem];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, cartQuantity: quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.cartQuantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.cartQuantity), 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
