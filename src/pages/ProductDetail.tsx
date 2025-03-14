
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductDetailComponent from '@/components/products/ProductDetail';
import { allProducts } from '@/lib/data';
import { ArrowLeft } from 'lucide-react';
import ProductRecommendations from '@/components/ai/ProductRecommendations';
import { trackUserActivity } from '@/services/api';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState(allProducts.find(p => p.id === id));
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const foundProduct = allProducts.find(p => p.id === id);
    
    if (foundProduct) {
      setProduct(foundProduct);
      
      // Track product view for AI recommendations
      const userId = localStorage.getItem('userId');
      if (userId) {
        trackUserActivity('view', foundProduct.id).catch(err => {
          console.error('Error tracking product view:', err);
        });
      }
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
          
          {/* AI-Powered Recommendations */}
          <ProductRecommendations 
            productId={product.id} 
            userId={localStorage.getItem('userId') || undefined}
            title="You Might Also Like"
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
