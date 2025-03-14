
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/products/ProductGrid';
import { allProducts } from '@/lib/data';
import { Filter, SlidersHorizontal, X } from 'lucide-react';

const Shop = () => {
  const location = useLocation();
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Parse the URL query parameters
    const searchParams = new URLSearchParams(location.search);
    const categoryParam = searchParams.get('category');
    
    if (categoryParam) {
      setActiveCategory(categoryParam.toLowerCase());
      setFilteredProducts(
        allProducts.filter(product => 
          product.category.toLowerCase() === categoryParam.toLowerCase()
        )
      );
    } else {
      setActiveCategory(null);
      setFilteredProducts(allProducts);
    }
  }, [location]);
  
  const handleCategoryFilter = (category: string | null) => {
    setActiveCategory(category);
    if (category) {
      setFilteredProducts(
        allProducts.filter(product => 
          product.category.toLowerCase() === category.toLowerCase()
        )
      );
    } else {
      setFilteredProducts(allProducts);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Shop Header */}
        <div className="bg-secondary/50 py-12">
          <div className="container-custom">
            <h1 className="text-3xl md:text-4xl font-medium">Shop All Products</h1>
            <p className="text-muted-foreground mt-2">
              Discover our curated collection of timeless essentials
            </p>
          </div>
        </div>
        
        {/* Mobile filter button */}
        <div className="sticky top-20 z-10 bg-background border-b border-border py-3 md:hidden">
          <div className="container-custom">
            <button 
              onClick={() => setIsMobileFilterOpen(true)}
              className="flex items-center text-sm font-medium"
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filter Products
            </button>
          </div>
        </div>
        
        <div className="container-custom py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Filters - Desktop */}
            <div className="w-full md:w-64 lg:w-72 hidden md:block flex-shrink-0">
              <div className="sticky top-28">
                <div className="space-y-6">
                  {/* Categories */}
                  <div>
                    <h3 className="font-medium mb-3 flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      Categories
                    </h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => handleCategoryFilter(null)}
                        className={`text-sm w-full text-left px-3 py-1.5 rounded-md transition-colors ${
                          activeCategory === null
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:bg-secondary'
                        }`}
                      >
                        All Products
                      </button>
                      <button
                        onClick={() => handleCategoryFilter('men')}
                        className={`text-sm w-full text-left px-3 py-1.5 rounded-md transition-colors ${
                          activeCategory === 'men'
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:bg-secondary'
                        }`}
                      >
                        Men
                      </button>
                      <button
                        onClick={() => handleCategoryFilter('women')}
                        className={`text-sm w-full text-left px-3 py-1.5 rounded-md transition-colors ${
                          activeCategory === 'women'
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:bg-secondary'
                        }`}
                      >
                        Women
                      </button>
                      <button
                        onClick={() => handleCategoryFilter('unisex')}
                        className={`text-sm w-full text-left px-3 py-1.5 rounded-md transition-colors ${
                          activeCategory === 'unisex'
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:bg-secondary'
                        }`}
                      >
                        Unisex
                      </button>
                      <button
                        onClick={() => handleCategoryFilter('accessories')}
                        className={`text-sm w-full text-left px-3 py-1.5 rounded-md transition-colors ${
                          activeCategory === 'accessories'
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:bg-secondary'
                        }`}
                      >
                        Accessories
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mobile Filters Sidebar */}
            {isMobileFilterOpen && (
              <div className="fixed inset-0 z-50 bg-background p-4 md:hidden animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium">Filters</h2>
                  <button 
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-1"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  {/* Categories */}
                  <div>
                    <h3 className="font-medium mb-3">Categories</h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          handleCategoryFilter(null);
                          setIsMobileFilterOpen(false);
                        }}
                        className={`text-sm w-full text-left px-3 py-2 rounded-md transition-colors ${
                          activeCategory === null
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:bg-secondary'
                        }`}
                      >
                        All Products
                      </button>
                      <button
                        onClick={() => {
                          handleCategoryFilter('men');
                          setIsMobileFilterOpen(false);
                        }}
                        className={`text-sm w-full text-left px-3 py-2 rounded-md transition-colors ${
                          activeCategory === 'men'
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:bg-secondary'
                        }`}
                      >
                        Men
                      </button>
                      <button
                        onClick={() => {
                          handleCategoryFilter('women');
                          setIsMobileFilterOpen(false);
                        }}
                        className={`text-sm w-full text-left px-3 py-2 rounded-md transition-colors ${
                          activeCategory === 'women'
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:bg-secondary'
                        }`}
                      >
                        Women
                      </button>
                      <button
                        onClick={() => {
                          handleCategoryFilter('unisex');
                          setIsMobileFilterOpen(false);
                        }}
                        className={`text-sm w-full text-left px-3 py-2 rounded-md transition-colors ${
                          activeCategory === 'unisex'
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:bg-secondary'
                        }`}
                      >
                        Unisex
                      </button>
                      <button
                        onClick={() => {
                          handleCategoryFilter('accessories');
                          setIsMobileFilterOpen(false);
                        }}
                        className={`text-sm w-full text-left px-3 py-2 rounded-md transition-colors ${
                          activeCategory === 'accessories'
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:bg-secondary'
                        }`}
                      >
                        Accessories
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Product Grid */}
            <div className="flex-1">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <span className="text-sm text-muted-foreground">
                    Showing {filteredProducts.length} products
                  </span>
                </div>
                <div>
                  <select className="text-sm border border-border rounded-md p-1.5 bg-background">
                    <option>Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest</option>
                  </select>
                </div>
              </div>
              
              <ProductGrid products={filteredProducts} />
              
              {filteredProducts.length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground">No products found. Try a different filter.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Shop;
