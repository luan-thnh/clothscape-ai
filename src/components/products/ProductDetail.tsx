
import React, { useState } from 'react';
import { Minus, Plus, ShoppingBag, Heart } from 'lucide-react';
import { Product } from '@/lib/data';
import { useCart } from '@/context/CartContext';

interface ProductDetailProps {
  product: Product;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const { addItem } = useCart();

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  
  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
      {/* Product Images */}
      <div className="space-y-4">
        <div className="overflow-hidden rounded-lg aspect-square bg-secondary/50">
          <img
            src={product.images[activeImage]}
            alt={product.name}
            className="w-full h-full object-cover object-center animate-blur-in"
          />
        </div>
        <div className="flex gap-3 overflow-x-auto">
          {product.images.map((image, index) => (
            <button
              key={index}
              className={`relative overflow-hidden aspect-square w-20 rounded-md border flex-shrink-0 transition-all ${
                index === activeImage ? 'border-primary ring-1 ring-primary' : 'border-border'
              }`}
              onClick={() => setActiveImage(index)}
            >
              <img
                src={image}
                alt={`${product.name} - View ${index + 1}`}
                className="w-full h-full object-cover object-center"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col">
        {product.tag && (
          <span className="inline-block bg-primary/10 text-primary text-xs px-2.5 py-1 rounded-full mb-3">
            {product.tag}
          </span>
        )}
        <h1 className="text-3xl font-medium mb-2">{product.name}</h1>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xl font-medium">${product.price.toFixed(2)}</span>
          {product.compareAtPrice && (
            <span className="text-muted-foreground line-through">
              ${product.compareAtPrice.toFixed(2)}
            </span>
          )}
        </div>
        
        <p className="text-muted-foreground mb-6">{product.description}</p>
        
        <div className="space-y-6">
          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-3">Color: {selectedColor}</h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1 rounded-full border text-sm transition-all ${
                      selectedColor === color
                        ? 'border-primary bg-primary/10 text-foreground'
                        : 'border-border bg-secondary text-muted-foreground'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-3">Size: {selectedSize}</h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 flex items-center justify-center rounded-full border text-sm transition-all ${
                      selectedSize === size
                        ? 'border-primary bg-primary/10 text-foreground'
                        : 'border-border bg-secondary text-muted-foreground'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Quantity Selection */}
          <div>
            <h3 className="text-sm font-medium mb-3">Quantity</h3>
            <div className="flex items-center">
              <button
                onClick={decrementQuantity}
                className="w-10 h-10 flex items-center justify-center border border-border rounded-l-md"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <div className="h-10 w-16 flex items-center justify-center border-t border-b border-border">
                {quantity}
              </div>
              <button
                onClick={incrementQuantity}
                className="w-10 h-10 flex items-center justify-center border border-border rounded-r-md"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Add to Cart Button */}
          <div className="flex gap-3 pt-3">
            <button 
              onClick={handleAddToCart}
              className="btn-primary flex-1 flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              Add to Cart
            </button>
            <button 
              className="w-12 h-12 flex items-center justify-center border border-border rounded-md hover:bg-secondary transition-colors"
              aria-label="Add to wishlist"
            >
              <Heart className="w-5 h-5" />
            </button>
          </div>
          
          {/* Product Details */}
          <div className="pt-6 border-t border-border">
            <div className="flex justify-between py-3">
              <span className="text-sm text-muted-foreground">Category</span>
              <span className="text-sm">{product.category}</span>
            </div>
            {product.subcategory && (
              <div className="flex justify-between py-3 border-t border-border">
                <span className="text-sm text-muted-foreground">Subcategory</span>
                <span className="text-sm">{product.subcategory}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
