
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Link } from 'react-router-dom';

const CartSummary = () => {
  const { totalPrice } = useCart();
  const shippingEstimate = totalPrice > 100 ? 0 : 10;
  const taxEstimate = totalPrice * 0.1;
  const orderTotal = totalPrice + shippingEstimate + taxEstimate;
  
  return (
    <div className="rounded-lg bg-secondary/50 p-6 animate-fade-in">
      <h2 className="text-lg font-medium mb-4">Order Summary</h2>
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <p className="text-muted-foreground">Subtotal</p>
          <p>${totalPrice.toFixed(2)}</p>
        </div>
        
        <div className="flex justify-between text-sm">
          <p className="text-muted-foreground">Shipping estimate</p>
          <p>{shippingEstimate === 0 ? 'Free' : `$${shippingEstimate.toFixed(2)}`}</p>
        </div>
        
        <div className="flex justify-between text-sm">
          <p className="text-muted-foreground">Tax estimate</p>
          <p>${taxEstimate.toFixed(2)}</p>
        </div>
        
        <div className="border-t border-border pt-3 mt-3">
          <div className="flex justify-between font-medium">
            <p>Order total</p>
            <p>${orderTotal.toFixed(2)}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <Link
          to="/checkout"
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          Checkout
          <ArrowRight className="w-4 h-4" />
        </Link>
        
        <div className="mt-4 text-center">
          <Link to="/shop" className="text-sm text-muted-foreground hover:text-foreground">
            or Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
