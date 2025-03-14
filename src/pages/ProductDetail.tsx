
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductDetailComponent from '@/components/products/ProductDetail';
import ProductGrid from '@/components/products/ProductGrid';
import { allProducts } from '@/lib/data';
import { ArrowLeft } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState(allProducts.find(p => p.id === id));
  const [relatedProducts, setRelatedProducts] = useState(allProducts.slice(0, 4));
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const foundProduct = allProducts.find(p => p.id === id);
    
    if (foundProduct) {
      setProduct(foundProduct);
      
      // Find related products from the same category, excluding the current product
      const related = allProducts
        .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
        .slice(0, 4);
      
      setRelatedProducts(related);
    }
  }, [id]);
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container-custom py-24">
          <div className="text-center py-12">
            <h1 className="text-2xl font-medium mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <button 
              onClick={() => navigate(-1)} 
              className="btn-secondary flex items-center mx-auto"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container-custom py-8">
          {/* Breadcrumbs */}
          <nav className="flex mb-8 text-sm">
            <button 
              onClick={() => navigate(-1)}
              className="text-muted-foreground hover:text-foreground flex items-center"
            >
              <ArrowLeft className="mr-1 h-4 w-4" /> Back
            </button>
          </nav>
          
          {/* Product Details */}
          <ProductDetailComponent product={product} />
          
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-24">
              <h2 className="text-2xl font-medium mb-8">You Might Also Like</h2>
              <ProductGrid products={relatedProducts} />
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
