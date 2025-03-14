
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import { useCart } from '@/context/CartContext';
import { ShoppingBag } from 'lucide-react';

const Cart = () => {
  const { items, itemCount, clearCart } = useCart();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container-custom py-8">
          <h1 className="text-3xl font-medium mb-6">Shopping Cart</h1>
          
          {itemCount > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2">
                <div className="border-b border-border pb-4 flex justify-between">
                  <p className="text-muted-foreground">{itemCount} items</p>
                  <button 
                    onClick={clearCart}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Clear Cart
                  </button>
                </div>
                
                <div className="divide-y divide-border">
                  {items.map(item => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
                
                <div className="mt-8 border-t border-border pt-6">
                  <Link to="/shop" className="text-sm text-primary hover:underline flex items-center">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Continue Shopping
                  </Link>
                </div>
              </div>
              
              <div>
                <CartSummary />
              </div>
            </div>
          ) : (
            <div className="py-16 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-4">
                <ShoppingBag className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-lg font-medium mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Link to="/shop" className="btn-primary inline-flex">
                Start Shopping
              </Link>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
