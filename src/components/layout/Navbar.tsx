
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled 
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3" 
          : "bg-transparent py-5"
      )}
    >
      <nav className="container-custom flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl font-semibold tracking-tight"
          aria-label="Home"
        >
          clothscape
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="nav-item">Home</Link>
          <Link to="/shop" className="nav-item">Shop</Link>
          <Link to="/collections" className="nav-item">Collections</Link>
          <Link to="/about" className="nav-item">About</Link>
        </div>

        {/* Navigation Icons */}
        <div className="hidden md:flex items-center space-x-6">
          <button 
            className="nav-item" 
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          <Link 
            to="/account" 
            className="nav-item" 
            aria-label="Account"
          >
            <User className="w-5 h-5" />
          </Link>
          <Link 
            to="/cart" 
            className="nav-item relative" 
            aria-label="Shopping bag"
          >
            <ShoppingBag className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-medium w-5 h-5 rounded-full flex items-center justify-center animate-scale-in">
                {itemCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4 md:hidden">
          <Link 
            to="/cart" 
            className="relative" 
            aria-label="Shopping bag"
          >
            <ShoppingBag className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-medium w-5 h-5 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            className="flex items-center justify-center"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-background z-40 pt-20 px-6 md:hidden animate-fade-in">
          <div className="flex flex-col space-y-6 text-lg">
            <Link 
              to="/" 
              className="py-2 border-b border-border"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/shop" 
              className="py-2 border-b border-border"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <Link 
              to="/collections" 
              className="py-2 border-b border-border"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Collections
            </Link>
            <Link 
              to="/about" 
              className="py-2 border-b border-border"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <div className="flex items-center space-x-6 py-2">
              <button aria-label="Search">
                <Search className="w-5 h-5" />
              </button>
              <Link to="/account" aria-label="Account">
                <User className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
