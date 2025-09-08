import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

interface ProductCardProps {
  className?: string;
}

export default function ProductCard({ className }: ProductCardProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        "https://13b25d97-e1b6-4387-8784-f994731917e9-00-om5kx3mzfcvd.worf.repl.co/api/products"
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Handle different response formats
      if (Array.isArray(data)) {
        setProducts(data);
      } else if (data.products && Array.isArray(data.products)) {
        setProducts(data.products);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = (productId: string) => {
    // Emit custom event for external frameworks to handle
    const event = new CustomEvent("product-add-to-cart", {
      detail: { productId },
      bubbles: true,
    });
    window.dispatchEvent(event);
  };

  const getProductImage = (product: Product) => {
    if (product.image) {
      return product.image;
    }
    
    // Fallback images based on product name
    const name = product.name.toLowerCase();
    if (name.includes("headphone") || name.includes("audio")) {
      return "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300";
    } else if (name.includes("watch")) {
      return "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300";
    } else if (name.includes("laptop") || name.includes("macbook")) {
      return "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300";
    } else if (name.includes("phone") || name.includes("iphone")) {
      return "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300";
    } else if (name.includes("mouse")) {
      return "https://images.unsplash.com/photo-1527814050087-3793815479db?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300";
    } else if (name.includes("keyboard")) {
      return "https://images.unsplash.com/photo-1541140532154-b024d705b90a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300";
    } else if (name.includes("tablet") || name.includes("ipad")) {
      return "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300";
    } else if (name.includes("controller") || name.includes("gaming")) {
      return "https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300";
    }
    
    // Default fallback
    return "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300";
  };

  if (loading) {
    return (
      <div className={cn("grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4", className)}>
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <CardContent className="p-4">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-3" />
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-8 w-20" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert className="bg-red-50 border-red-200">
        <AlertCircle className="h-4 w-4 text-red-500" />
        <AlertDescription className="text-red-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium mb-1">Failed to load products</p>
              <p className="text-sm">{error}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchProducts}
              className="text-red-800 border-red-300 hover:bg-red-100"
              data-testid="button-retry"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No products available</p>
      </div>
    );
  }

  return (
    <div className={cn("grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4", className)}>
      {products.map((product) => (
        <Card
          key={product.id}
          className="overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
          data-testid={`card-product-${product.id}`}
        >
          <Link href={`/products/${product.id}`}>
            <div className="aspect-video overflow-hidden cursor-pointer">
              <img
                src={getProductImage(product)}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300";
                }}
                data-testid={`img-product-${product.id}`}
              />
            </div>
          </Link>
          <CardContent className="p-4">
            <Link href={`/products/${product.id}`}>
              <h3 
                className="font-semibold text-card-foreground mb-2 line-clamp-2 cursor-pointer hover:text-primary transition-colors"
                data-testid={`text-product-name-${product.id}`}
              >
                {product.name}
              </h3>
            </Link>
            <p 
              className="text-2xl font-bold text-primary mb-3"
              data-testid={`text-product-price-${product.id}`}
            >
              ${product.price}
            </p>
            <div className="flex items-center justify-between">
              <span 
                className="text-sm text-muted-foreground"
                data-testid={`text-product-stock-${product.id}`}
              >
                {product.stock !== undefined && product.stock > 0 ? "In Stock" : "Available"}
              </span>
              <Button
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleAddToCart(product.id);
                }}
                className="hover:bg-primary/90 transition-colors"
                data-testid={`button-add-to-cart-${product.id}`}
              >
                Add to Cart
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
