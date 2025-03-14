
import React, { useEffect, useState } from 'react';
import { getRecommendations } from '@/services/api';
import { useToast } from '@/components/ui/use-toast';
import ProductCard from '@/components/ui/ProductCard';

interface RecommendationsProps {
  userId?: string;
  productId?: string;
  title?: string;
}

const ProductRecommendations: React.FC<RecommendationsProps> = ({ 
  userId, 
  productId,
  title = "You Might Also Like" 
}) => {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setIsLoading(true);
        const response = await getRecommendations(userId, productId);
        setRecommendations(response.data.recommendations || []);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        toast({
          title: 'Error',
          description: 'Failed to load personalized recommendations.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, [userId, productId, toast]);

  if (isLoading) {
    return (
      <div className="mt-12">
        <h2 className="text-2xl font-medium mb-8">{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="space-y-3">
              <div className="aspect-square bg-muted animate-pulse rounded-md"></div>
              <div className="h-4 bg-muted animate-pulse rounded"></div>
              <div className="h-4 w-1/2 bg-muted animate-pulse rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-medium mb-8">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {recommendations.map((product) => (
          <div key={product.id} className="group">
            <ProductCard
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              category={product.category}
            />
            {product.reason && (
              <p className="text-xs text-muted-foreground mt-1">{product.reason}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductRecommendations;
