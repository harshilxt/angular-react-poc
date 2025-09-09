import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, AlertCircle, RefreshCw, ShoppingCart, Heart, Star, Wrench } from "lucide-react";
import type { ProductDetails } from "@/types/product";

export default function ProductDetails() {
  const [location] = useLocation();
  const productId = location.split('/').pop(); // Extract ID from /products/:id
  
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `https://13b25d97-e1b6-4387-8784-f994731917e9-00-om5kx3mzfcvd.worf.repl.co/api/product-details/${productId}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setProductDetails(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load product details");
      setProductDetails(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (productDetails) {
      // Emit custom event for external frameworks to handle
      const event = new CustomEvent("product-add-to-cart", {
        detail: { productId: productDetails.productId },
        bubbles: true,
      });
      window.dispatchEvent(event);
    }
  };

  const getProductImage = (productName: string) => {
    // Fallback images based on product name
    const name = productName.toLowerCase();
    if (name.includes("headphone") || name.includes("audio")) {
      return "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600";
    } else if (name.includes("watch")) {
      return "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600";
    } else if (name.includes("laptop") || name.includes("macbook")) {
      return "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600";
    } else if (name.includes("phone") || name.includes("iphone")) {
      return "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600";
    } else if (name.includes("mouse")) {
      return "https://images.unsplash.com/photo-1527814050087-3793815479db?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600";
    } else if (name.includes("keyboard")) {
      return "https://images.unsplash.com/photo-1541140532154-b024d705b90a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600";
    } else if (name.includes("tablet") || name.includes("ipad")) {
      return "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600";
    } else if (name.includes("controller") || name.includes("gaming")) {
      return "https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600";
    }
    
    // Default fallback
    return "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-card border-b border-border">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center">
              <Link href="/demo">
                <Button variant="ghost" size="sm" className="mr-4">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Products
                </Button>
              </Link>
              <div>
                <Skeleton className="h-8 w-48 mb-2" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <Skeleton className="w-full aspect-square rounded-lg" />
            </div>
            <div className="space-y-6">
              <div>
                <Skeleton className="h-10 w-3/4 mb-4" />
                <Skeleton className="h-8 w-32 mb-6" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
              <div className="flex space-x-4">
                <Skeleton className="h-12 w-48" />
                <Skeleton className="h-12 w-12" />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-card border-b border-border">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center">
              <Link href="/demo">
                <Button variant="ghost" size="sm" className="mr-4">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Products
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Product Details</h1>
                <p className="text-muted-foreground mt-2">Unable to load product</p>
              </div>
            </div>
          </div>
        </header>

        {/* Error */}
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <Alert className="bg-red-50 border-red-200">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <AlertDescription className="text-red-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium mb-1">Failed to load product</p>
                    <p className="text-sm">{error}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={fetchProduct}
                    className="text-red-800 border-red-300 hover:bg-red-100"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Retry
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        </main>
      </div>
    );
  }

  if (!productDetails) {
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-card border-b border-border">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center">
              <Link href="/demo">
                <Button variant="ghost" size="sm" className="mr-4">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Products
                </Button>
              </Link>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-12">
          <div className="text-center">
            <p className="text-muted-foreground text-lg">Product not found</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/demo">
                <Button variant="ghost" size="sm" className="mr-4">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Products
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Product Details</h1>
                <p className="text-muted-foreground mt-2">View product information and specifications</p>
              </div>
            </div>
            <div className="inline-flex items-center px-4 py-2 bg-accent text-accent-foreground rounded-full text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              Product ID: {productDetails.productId}
            </div>
          </div>
        </div>
      </header>

      {/* Product Details */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Product Image */}
          <div>
            <Card className="overflow-hidden">
              <div className="aspect-square">
                <img
                  src={getProductImage(productDetails.product.name)}
                  alt={productDetails.product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600";
                  }}
                />
              </div>
            </Card>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-4">{productDetails.product.name}</h2>
              <p className="text-3xl font-bold text-primary mb-6">${productDetails.product.price}</p>
              
              <div className="prose prose-gray max-w-none">
                <p className="text-muted-foreground leading-relaxed">{productDetails.description}</p>
              </div>
            </div>

            {/* Product Details */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Product Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Product ID</span>
                    <span className="font-medium">{productDetails.productId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price</span>
                    <span className="font-medium">${productDetails.product.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Availability</span>
                    <span className="font-medium">
                      <span className="text-green-600">Available</span>
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Manufacturer</span>
                    <span className="font-medium">{productDetails.manufacturer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Warranty</span>
                    <span className="font-medium">{productDetails.warranty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rating</span>
                    <div className="flex items-center">
                      <div className="flex items-center mr-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(parseFloat(productDetails.rating)) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="font-medium">{productDetails.rating}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Specifications */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Wrench className="w-5 h-5 mr-2" />
                  Specifications
                </h3>
                <div className="space-y-3">
                  {Object.entries(productDetails.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-muted-foreground">{key}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            {productDetails.reviews.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
                  <div className="space-y-4">
                    {productDetails.reviews.map((review, index) => (
                      <div key={index} className="border-l-4 border-primary/20 pl-4">
                        <p className="text-muted-foreground italic">"{review}"</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <div className="flex space-x-4">
              <Button 
                size="lg" 
                onClick={handleAddToCart}
                className="flex-1 hover:bg-primary/90 transition-colors"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="hover:bg-accent transition-colors"
              >
                <Heart className="w-5 h-5" />
              </Button>
            </div>

            {/* Features */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Key Features</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• High-quality construction and materials</li>
                  <li>• Modern design with attention to detail</li>
                  <li>• Reliable performance for everyday use</li>
                  <li>• Backed by manufacturer warranty</li>
                  <li>• Fast and secure shipping available</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}