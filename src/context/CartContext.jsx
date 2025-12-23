import { createContext, useContext, useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load cart from Firestore (for persistence across sessions)
  useEffect(() => {
    const cartId = sessionStorage.getItem('cartId');
    if (cartId) {
      // If cart exists in session, load it
      // For now, we'll use sessionStorage for cart during checkout
      // Orders will be stored in Firestore
    }
  }, []);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    sessionStorage.removeItem('cartId');
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const placeOrder = async (orderDetails) => {
    setLoading(true);
    try {
      const order = {
        items: [...cart],
        total: getTotalPrice(),
        paymentMethod: orderDetails.paymentMethod || 'cash',
        status: 'pending', // pending → completed
        createdAt: serverTimestamp(),
        orderNumber: Date.now(),
      };

      // Add order to Firestore
      const docRef = await addDoc(collection(db, 'orders'), order);

      const orderWithId = {
        ...order,
        id: docRef.id,
        createdAt: new Date().toISOString(),
      };

      clearCart();
      setLoading(false);
      return orderWithId;
    } catch (error) {
      console.error('Error placing order:', error);
      setLoading(false);
      throw error;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
        placeOrder,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
