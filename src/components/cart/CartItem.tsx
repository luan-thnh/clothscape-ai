
import React from 'react';
import { Minus, Plus, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/lib/data';

interface CartItemProps {
  item: Product & { quantity: number };
}

const CartItem = ({ item }: CartItemProps) => {
  const { updateItemQuantity, removeItem } = useCart();
  
  const incrementQuantity = () => {
    updateItemQuantity(item.id, item.quantity + 1);
  };
  
  const decrementQuantity = () => {
    if (item.quantity > 1) {
      updateItemQuantity(item.id, item.quantity - 1);
    }
  };
  
  return (
    <div className="flex gap-4 py-4 border-b border-border animate-fade-in">
      <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-md">
        <img 
          src={item.images[0]} 
          alt={item.name}
          className="h-full w-full object-cover object-center"
        />
      </div>
      
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between text-base font-medium">
          <h3>{item.name}</h3>
          <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          {item.category} {item.colors && `• ${item.colors[0]}`}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center border border-border rounded-md">
            <button
              onClick={decrementQuantity}
              className="p-1 text-muted-foreground hover:text-foreground"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center text-sm">{item.quantity}</span>
            <button
              onClick={incrementQuantity}
              className="p-1 text-muted-foreground hover:text-foreground"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          <button
            onClick={() => removeItem(item.id)}
            className="text-muted-foreground hover:text-foreground"
            aria-label="Remove item"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
