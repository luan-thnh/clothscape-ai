
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';
import { featuredProducts } from '@/lib/data';

const FeaturedProducts = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );
    
    const productsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );
    
    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current);
    }
    
    if (productsRef.current) {
      productsObserver.observe(productsRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        sectionObserver.unobserve(sectionRef.current);
      }
      if (productsRef.current) {
        productsObserver.unobserve(productsRef.current);
      }
    };
  }, []);
  
  return (
    <section className="py-24 bg-secondary/50">
      <div className="container-custom">
        <div 
          ref={sectionRef} 
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 opacity-0 translate-y-10 transition-all duration-700 ease-out"
        >
          <div>
            <span className="text-sm font-medium text-primary">Curated Selection</span>
            <h2 className="text-3xl md:text-4xl font-medium mt-2">Featured Products</h2>
            <p className="text-muted-foreground mt-3 max-w-xl">
              Discover our most coveted pieces, carefully selected to elevate your wardrobe with timeless elegance and contemporary style.
            </p>
          </div>
          <Link 
            to="/shop" 
            className="mt-4 md:mt-0 group flex items-center text-foreground font-medium"
          >
            View All Products
            <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
        
        <div 
          ref={productsRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 opacity-0 translate-y-10 transition-all duration-1000 delay-300 ease-out"
        >
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
