
import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Product } from '@/lib/data';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  const { addItem } = useCart();
  
  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-lg bg-white transition-all duration-300",
        className
      )}
    >
      <div className="aspect-[3/4] overflow-hidden rounded-lg">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </Link>
      </div>
      
      {/* Quick action buttons */}
      <div className="absolute bottom-4 left-0 w-full px-4 opacity-0 transform translate-y-4 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-y-0 flex justify-center space-x-2">
        <button 
          onClick={() => addItem(product)} 
          className="bg-white text-foreground rounded-full p-3 shadow-md hover:bg-primary hover:text-primary-foreground transition-colors"
          aria-label="Add to cart"
        >
          <ShoppingBag className="w-4 h-4" />
        </button>
        <Link 
          to={`/product/${product.id}`} 
          className="bg-white text-foreground rounded-full p-3 shadow-md hover:bg-primary hover:text-primary-foreground transition-colors"
          aria-label="View product"
        >
          <Eye className="w-4 h-4" />
        </Link>
      </div>
      
      {/* Product details */}
      <div className="px-1 py-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-medium text-foreground hover:underline">{product.name}</h3>
        </Link>
        <p className="mt-1 text-sm text-muted-foreground">{product.category}</p>
        <div className="mt-1 flex items-center justify-between">
          <p className="text-sm font-medium">${product.price.toFixed(2)}</p>
          {product.compareAtPrice && (
            <p className="text-sm text-muted-foreground line-through">
              ${product.compareAtPrice.toFixed(2)}
            </p>
          )}
        </div>
      </div>
      
      {/* Sale badge */}
      {product.tag && (
        <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
          {product.tag}
        </div>
      )}
    </div>
  );
};

export default ProductCard;
