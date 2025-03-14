
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Mail, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white pt-16 pb-8 border-t border-border">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold tracking-tight">clothscape</h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              Premium clothing with a focus on simplicity, quality, and design. Effortless style for the modern individual.
            </p>
            <div className="flex space-x-5 pt-2">
              <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-sm uppercase tracking-wider">Shop</h4>
            <ul className="space-y-3">
              <li><Link to="/shop" className="text-muted-foreground hover:text-foreground transition-colors">All Products</Link></li>
              <li><Link to="/shop?category=new" className="text-muted-foreground hover:text-foreground transition-colors">New Arrivals</Link></li>
              <li><Link to="/shop?category=bestsellers" className="text-muted-foreground hover:text-foreground transition-colors">Best Sellers</Link></li>
              <li><Link to="/shop?category=sale" className="text-muted-foreground hover:text-foreground transition-colors">Sale Items</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link to="/sustainability" className="text-muted-foreground hover:text-foreground transition-colors">Sustainability</Link></li>
              <li><Link to="/careers" className="text-muted-foreground hover:text-foreground transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-sm uppercase tracking-wider">Newsletter</h4>
            <p className="text-muted-foreground text-sm">
              Subscribe to our newsletter for exclusive updates and offers.
            </p>
            <div className="flex mt-2">
              <input
                type="email"
                placeholder="Your email"
                className="bg-secondary px-4 py-2 text-sm rounded-l-md w-full focus:outline-none"
              />
              <button className="bg-primary text-primary-foreground px-3 py-2 rounded-r-md" aria-label="Subscribe">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© 2023 clothscape. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link to="/shipping" className="hover:text-foreground transition-colors">Shipping</Link>
            <Link to="/returns" className="hover:text-foreground transition-colors">Returns</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
