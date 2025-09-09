import React from "react";
import { createRoot } from "react-dom/client";

// Inline ProductCard component for standalone build
const ProductCard = () => {
  const [products, setProducts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

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

  React.useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = (productId: string) => {
    const event = new CustomEvent("product-add-to-cart", {
      detail: { productId },
      bubbles: true,
    });
    window.dispatchEvent(event);
  };

  const getProductImage = (product: any) => {
    if (product.image) return product.image;
    
    const name = product.name.toLowerCase();
    if (name.includes("headphone")) return "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300";
    if (name.includes("watch")) return "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300";
    if (name.includes("laptop")) return "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300";
    if (name.includes("phone")) return "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300";
    
    return "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300";
  };

  if (loading) {
    return React.createElement("div", { className: "grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4" },
      Array.from({ length: 8 }).map((_, index) =>
        React.createElement("div", {
          key: index,
          className: "bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm"
        },
          React.createElement("div", { className: "h-48 w-full bg-gray-200 animate-pulse" }),
          React.createElement("div", { className: "p-4" },
            React.createElement("div", { className: "h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" }),
            React.createElement("div", { className: "h-4 bg-gray-200 rounded w-1/2 animate-pulse" })
          )
        )
      )
    );
  }

  if (error) {
    return React.createElement("div", {
      className: "bg-red-50 border border-red-200 rounded-lg p-6 text-center"
    },
      React.createElement("div", { className: "text-red-600 mb-4" },
        React.createElement("h3", { className: "text-lg font-semibold mb-2" }, "Failed to load products"),
        React.createElement("p", null, error)
      ),
      React.createElement("button", {
        onClick: fetchProducts,
        className: "px-4 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition-colors"
      }, "Retry")
    );
  }

  if (products.length === 0) {
    return React.createElement("div", { className: "text-center py-12" },
      React.createElement("p", { className: "text-gray-500 text-lg" }, "No products available")
    );
  }

  return React.createElement("div", { className: "grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4" },
    products.map((product) =>
      React.createElement("div", {
        key: product.id,
        className: "bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
      },
        React.createElement("div", { className: "aspect-video overflow-hidden" },
          React.createElement("img", {
            src: getProductImage(product),
            alt: product.name,
            className: "w-full h-full object-cover"
          })
        ),
        React.createElement("div", { className: "p-4" },
          React.createElement("h3", {
            className: "font-semibold text-gray-900 mb-2 line-clamp-2"
          }, product.name),
          React.createElement("p", {
            className: "text-2xl font-bold text-blue-600 mb-3"
          }, `$${product.price}`),
          React.createElement("div", { className: "flex items-center justify-between" },
            React.createElement("span", { className: "text-sm text-gray-500" }, "In Stock"),
            React.createElement("button", {
              onClick: () => handleAddToCart(product.id),
              className: "px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
            }, "Add to Cart")
          )
        )
      )
    )
  );
};

// Web Component Class
class ProductCardWebComponent extends HTMLElement {
  private reactRoot: any;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    if (this.reactRoot) {
      this.reactRoot.unmount();
    }
  }

  render() {
    if (!this.shadowRoot) return;

    const style = document.createElement("style");
    style.textContent = `
      @import url('https://cdn.tailwindcss.com');
      
      :host {
        display: block;
        width: 100%;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }
      
      .grid { display: grid; }
      .gap-6 { gap: 1.5rem; }
      .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
      
      @media (min-width: 768px) {
        .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      }
      
      @media (min-width: 1024px) {
        .lg\\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
      }
      
      .bg-white { background-color: #ffffff; }
      .rounded-lg { border-radius: 0.5rem; }
      .border { border-width: 1px; }
      .border-gray-200 { border-color: #e5e7eb; }
      .overflow-hidden { overflow: hidden; }
      .shadow-sm { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
      .hover\\:shadow-lg:hover { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
      .transition-all { transition: all 0.2s ease-in-out; }
      .hover\\:-translate-y-1:hover { transform: translateY(-0.25rem); }
      
      .aspect-video { aspect-ratio: 16 / 9; }
      .w-full { width: 100%; }
      .h-full { height: 100%; }
      .h-48 { height: 12rem; }
      .object-cover { object-fit: cover; }
      
      .p-4 { padding: 1rem; }
      .mb-2 { margin-bottom: 0.5rem; }
      .mb-3 { margin-bottom: 0.75rem; }
      .mb-4 { margin-bottom: 1rem; }
      .py-12 { padding-top: 3rem; padding-bottom: 3rem; }
      
      .font-semibold { font-weight: 600; }
      .font-bold { font-weight: 700; }
      .text-gray-900 { color: #111827; }
      .text-gray-500 { color: #6b7280; }
      .text-red-600 { color: #dc2626; }
      .text-red-800 { color: #991b1b; }
      .text-white { color: #ffffff; }
      .text-2xl { font-size: 1.5rem; line-height: 2rem; }
      .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
      .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
      .text-blue-600 { color: #2563eb; }
      
      .flex { display: flex; }
      .items-center { align-items: center; }
      .justify-between { justify-content: space-between; }
      .text-center { text-align: center; }
      
      .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
      .px-4 { padding-left: 1rem; padding-right: 1rem; }
      .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
      .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
      .p-6 { padding: 1.5rem; }
      
      .bg-blue-600 { background-color: #2563eb; }
      .bg-blue-700 { background-color: #1d4ed8; }
      .bg-red-50 { background-color: #fef2f2; }
      .bg-red-100 { background-color: #fee2e2; }
      .bg-red-200 { background-color: #fecaca; }
      .bg-gray-200 { background-color: #e5e7eb; }
      
      .rounded-md { border-radius: 0.375rem; }
      .hover\\:bg-blue-700:hover { background-color: #1d4ed8; }
      .hover\\:bg-red-200:hover { background-color: #fecaca; }
      .transition-colors { transition: background-color 0.15s ease-in-out; }
      
      .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      
      .animate-pulse {
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }
      
      @keyframes pulse {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: .5;
        }
      }
      
      button {
        cursor: pointer;
        border: none;
        outline: none;
      }
    `;

    const container = document.createElement("div");
    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(container);

    this.reactRoot = createRoot(container);
    this.reactRoot.render(React.createElement(ProductCard));
  }
}

// Register web component
if (!customElements.get("product-card")) {
  customElements.define("product-card", ProductCardWebComponent);
}

// Export for module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = { ProductCardWebComponent };
}

// Export for ES modules
if (typeof window !== "undefined") {
  (window as any).ProductCardWebComponent = ProductCardWebComponent;
}
