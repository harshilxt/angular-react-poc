export interface Product {
  id: string;
  name: string;
  price: string;
  image?: string;
  description?: string;
  stock?: number;
}

export interface ProductApiResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
}

export interface ProductDetails {
  id: string;
  productId: string;
  description: string;
  specifications: Record<string, string>;
  rating: string;
  reviews: string[];
  manufacturer: string;
  warranty: string;
  product: {
    id: string;
    name: string;
    price: string;
    categoryId: string;
  };
}
