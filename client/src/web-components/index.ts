import ProductCardWebComponent from "../components/ProductCardWebComponent";

// Register the web component
if (!customElements.get("product-card")) {
  customElements.define("product-card", ProductCardWebComponent);
}

// Export for external use
export { ProductCardWebComponent };

// Add TypeScript declaration for the custom element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "product-card": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}
