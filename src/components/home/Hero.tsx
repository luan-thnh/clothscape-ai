
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      },
      { threshold: 0.1 }
    );
    
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
    
    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);
  
  return (
    <div className="relative min-h-screen flex items-center py-24 mt-20">
      {/* Background image with parallax effect */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1551232864-3f0890e580d9?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3" 
          alt="Hero background" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div 
          ref={heroRef} 
          className="max-w-2xl opacity-0 translate-y-10 transition-all duration-1000 ease-out"
        >
          <div className="inline-block mb-4">
            <span className="bg-white/90 backdrop-blur-sm text-foreground px-3 py-1 text-sm rounded-full animate-scale-in">
              New Collection SS'24
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-tight md:leading-tight lg:leading-tight mb-6">
            Discover Your Unique <br className="hidden md:block"/> Personal Style
          </h1>
          <p className="text-white/90 text-lg md:text-xl mb-8 max-w-lg">
            Timeless designs crafted with precision and care. Premium clothing for the modern individual.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/shop" 
              className="btn-primary bg-white text-foreground hover:bg-white/90 flex items-center gap-2 group shadow-lg"
            >
              Shop Collection
              <ArrowRight className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link 
              to="/collections/essentials" 
              className="btn-ghost text-white hover:bg-white/20 border border-white/30 backdrop-blur-sm"
            >
              View Essentials
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
