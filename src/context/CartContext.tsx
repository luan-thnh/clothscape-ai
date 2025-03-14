
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { Product } from '@/lib/data';

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  totalPrice: number;
  addItem: (product: Product, quantity?: number) => void;
  updateItemQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType>({
  items: [],
  itemCount: 0,
  totalPrice: 0,
  addItem: () => {},
  updateItemQuantity: () => {},
  removeItem: () => {},
  clearCart: () => {},
});

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [itemCount, setItemCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Initialize cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        setItems(parsedCart);
      } catch (error) {
        console.error('Failed to parse cart from localStorage', error);
      }
    }
  }, []);

  // Update localStorage when cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
    
    // Update totals
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    setItemCount(count);
    setTotalPrice(total);
  }, [items]);

  const addItem = (product: Product, quantity = 1) => {
    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
        return updatedItems;
      } else {
        // Item doesn't exist, add new item
        return [...prevItems, { ...product, quantity }];
      }
    });
    
    toast({
      title: `${product.name} added to cart`,
      description: `${quantity} item${quantity > 1 ? 's' : ''} added`,
    });
  };

  const updateItemQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== productId));
    
    toast({
      title: "Item removed from cart"
    });
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: "Cart cleared"
    });
  };

  const value = {
    items,
    itemCount,
    totalPrice,
    addItem,
    updateItemQuantity,
    removeItem,
    clearCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
