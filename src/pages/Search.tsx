import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search as SearchIcon, Filter, X, Loader2 } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/products/ProductGrid';
import { searchProductsAI, getProducts } from '@/services/api';
import { Product } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(query);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
  });
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  
  useEffect(() => {
    // Reset search query when URL changes
    setSearchQuery(query);
  }, [query]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        let fetchedProducts;
        if (query) {
          // Search with AI if query exists
          const response = await searchProductsAI(query);
          fetchedProducts = response.data.products || [];
        } else {
          // Otherwise fetch all products
          const response = await getProducts();
          fetchedProducts = response.data;
        }
        
        // Extract available categories
        const categories = [...new Set(fetchedProducts.map((p: Product) => p.category))];
        setAvailableCategories(categories);
        
        // Apply any active filters
        const filteredProducts = applyFilters(fetchedProducts);
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Failed to fetch products', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, [query]);
  
  const applyFilters = (productList: Product[]) => {
    return productList.filter((product) => {
      const matchesCategory = !filters.category || product.category === filters.category;
      const matchesMinPrice = !filters.minPrice || product.price >= parseFloat(filters.minPrice);
      const matchesMaxPrice = !filters.maxPrice || product.price <= parseFloat(filters.maxPrice);
      
      return matchesCategory && matchesMinPrice && matchesMaxPrice;
    });
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  const handleApplyFilters = () => {
    // Re-filter the products based on the current filters
    const fetchAndFilter = async () => {
      try {
        let fetchedProducts;
        if (query) {
          const response = await searchProductsAI(query);
          fetchedProducts = response.data.products || [];
        } else {
          const response = await getProducts();
          fetchedProducts = response.data;
        }
        
        const filteredProducts = applyFilters(fetchedProducts);
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Failed to apply filters', error);
      }
    };
    
    fetchAndFilter();
  };
  
  const handleResetFilters = () => {
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
    });
    
    // Reset the products to the original search results
    const fetchProducts = async () => {
      try {
        let fetchedProducts;
        if (query) {
          const response = await searchProductsAI(query);
          fetchedProducts = response.data.products || [];
        } else {
          const response = await getProducts();
          fetchedProducts = response.data;
        }
        
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Failed to reset filters', error);
      }
    };
    
    fetchProducts();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container-custom py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <h1 className="text-3xl font-medium">
              {query ? `Search Results: "${query}"` : 'All Products'}
            </h1>
            
            <form onSubmit={handleSearch} className="flex w-full md:w-96">
              <Input
                type="search"
                placeholder="Search for products..."
                className="rounded-r-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" className="rounded-l-none">
                <SearchIcon className="h-4 w-4" />
              </Button>
            </form>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters Section */}
            <div className="md:w-64 flex-shrink-0">
              <div className="bg-secondary/30 rounded-lg p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                  </h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowFilters(!showFilters)}
                    className="md:hidden"
                  >
                    {showFilters ? <X className="h-4 w-4" /> : <Filter className="h-4 w-4" />}
                  </Button>
                </div>
                
                <div className={`space-y-5 ${showFilters || 'hidden md:block'}`}>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Category</label>
                    <select
                      name="category"
                      value={filters.category}
                      onChange={handleFilterChange}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="">All Categories</option>
                      {availableCategories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Price Range</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="number"
                        name="minPrice"
                        placeholder="Min"
                        value={filters.minPrice}
                        onChange={handleFilterChange}
                        min="0"
                      />
                      <Input
                        type="number"
                        name="maxPrice"
                        placeholder="Max"
                        value={filters.maxPrice}
                        onChange={handleFilterChange}
                        min="0"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-2 space-y-2">
                    <Button 
                      onClick={handleApplyFilters} 
                      className="w-full"
                    >
                      Apply Filters
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={handleResetFilters}
                      className="w-full"
                    >
                      Reset Filters
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Products Section */}
            <div className="flex-1">
              {isLoading ? (
                <div className="flex justify-center items-center h-96">
                  <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
                </div>
              ) : products.length > 0 ? (
                <>
                  <p className="text-muted-foreground mb-6">
                    Showing {products.length} {products.length === 1 ? 'product' : 'products'}
                  </p>
                  <ProductGrid products={products} />
                </>
              ) : (
                <div className="text-center py-20">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-4">
                    <SearchIcon className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h2 className="text-lg font-medium mb-2">No products found</h2>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                  <Button onClick={() => navigate('/shop')}>
                    Browse All Products
                  </Button>
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

export default Search;
