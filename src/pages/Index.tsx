
import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        <FeaturedProducts />
        
        {/* Categories Section */}
        <section className="py-24">
          <div className="container-custom">
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="text-sm font-medium text-primary">Explore</span>
              <h2 className="text-3xl md:text-4xl font-medium mt-2">Shop by Category</h2>
              <p className="text-muted-foreground mt-3">
                Discover our curated collections designed to elevate your wardrobe with timeless essentials and contemporary pieces.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Men's Category */}
              <div className="relative overflow-hidden rounded-lg aspect-[3/4] group">
                <img 
                  src="https://images.unsplash.com/photo-1515600051222-a3c338ff16f6?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3"
                  alt="Men's Collection" 
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-white text-2xl font-medium mb-2">Men's Collection</h3>
                  <Link 
                    to="/shop?category=men" 
                    className="text-white flex items-center group/link"
                  >
                    Shop Now
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
              
              {/* Women's Category */}
              <div className="relative overflow-hidden rounded-lg aspect-[3/4] group">
                <img 
                  src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=1286&auto=format&fit=crop&ixlib=rb-4.0.3"
                  alt="Women's Collection" 
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-white text-2xl font-medium mb-2">Women's Collection</h3>
                  <Link 
                    to="/shop?category=women" 
                    className="text-white flex items-center group/link"
                  >
                    Shop Now
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
              
              {/* Accessories Category */}
              <div className="relative overflow-hidden rounded-lg aspect-[3/4] group">
                <img 
                  src="https://images.unsplash.com/photo-1523779105320-d1cd346702a8?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3"
                  alt="Accessories Collection" 
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-white text-2xl font-medium mb-2">Accessories</h3>
                  <Link 
                    to="/shop?category=accessories" 
                    className="text-white flex items-center group/link"
                  >
                    Shop Now
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section className="bg-secondary/50 py-20">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-medium mb-4">Join Our Newsletter</h2>
              <p className="text-muted-foreground mb-8">
                Stay updated with our latest collections, exclusive offers and styling tips.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <button className="btn-primary whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
