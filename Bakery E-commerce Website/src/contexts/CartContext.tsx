import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '../types';
import { storage } from '../lib/storage';
import { useAuth } from './AuthContext';
import * as cartApi from '../lib/api';

interface CartContextType {
  cart: CartItem[];
  loading: boolean;
  addToCart: (product: Product, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Load cart from storage on mount
  useEffect(() => {
    const savedCart = storage.getCart();
    setCart(savedCart);
  }, []);

  // Save cart to storage whenever it changes
  useEffect(() => {
    storage.setCart(cart);
  }, [cart]);

  // Fetch cart from API when user logs in
  useEffect(() => {
    if (user) {
      syncCartWithServer();
    }
  }, [user]);

  const syncCartWithServer = async () => {
    try {
      setLoading(true);
      const serverCart = await cartApi.getCart();
      if (serverCart.items) {
        setCart(serverCart.items);
        storage.setCart(serverCart.items);
      }
    } catch (err) {
      // If API fails, keep local cart
      console.error('Failed to sync cart from server:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product: Product, quantity: number) => {
    setLoading(true);
    try {
      if (user) {
        // Use API for authenticated users
        const result = await cartApi.addToCart({
          productId: product.id,
          quantity,
        });
        if (result.items) {
          setCart(result.items);
          storage.setCart(result.items);
        }
      } else {
        // Use local storage for guests
        setCart(prev => {
          const existingItem = prev.find(item => item.product.id === product.id);
          if (existingItem) {
            return prev.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          }
          return [...prev, { product, quantity }];
        });
      }
    } catch (err) {
      console.error('Failed to add to cart:', err);
      // Fallback to local cart
      setCart(prev => {
        const existingItem = prev.find(item => item.product.id === product.id);
        if (existingItem) {
          return prev.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prev, { product, quantity }];
      });
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId: string) => {
    setLoading(true);
    try {
      if (user) {
        // Find the item to get its ID (this might need to be adjusted based on API)
        const item = cart.find(i => i.product.id === productId);
        if (item) {
          await cartApi.removeCartItem(item.product.id);
        }
      }
      setCart(prev => prev.filter(item => item.product.id !== productId));
    } catch (err) {
      console.error('Failed to remove from cart:', err);
      // Fallback to local removal
      setCart(prev => prev.filter(item => item.product.id !== productId));
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }

    setLoading(true);
    try {
      if (user) {
        const result = await cartApi.updateCartItem(productId, quantity);
        if (result.items) {
          setCart(result.items);
          storage.setCart(result.items);
        }
      } else {
        // Local update for guests
        setCart(prev =>
          prev.map(item =>
            item.product.id === productId ? { ...item, quantity } : item
          )
        );
      }
    } catch (err) {
      console.error('Failed to update quantity:', err);
      // Fallback to local update
      setCart(prev =>
        prev.map(item =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    setLoading(true);
    try {
      if (user) {
        await cartApi.clearCart();
      }
      setCart([]);
      storage.clearCart();
    } catch (err) {
      console.error('Failed to clear cart:', err);
      // Fallback to local clear
      setCart([]);
      storage.clearCart();
    } finally {
      setLoading(false);
    }
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
