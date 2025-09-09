import React from "react";
import { createRoot } from "react-dom/client";
import ProductCard from "./ProductCard";
import "../index.css";

class ProductCardWebComponent extends HTMLElement {
  private root: any;
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

    // Create a style element with Tailwind CSS and custom styles
    const style = document.createElement("style");
    style.textContent = `
      @import url('https://cdn.tailwindcss.com');
      
      :host {
        display: block;
        width: 100%;
      }
      
      .product-card-container {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }
      
      /* Custom CSS variables */
      :host {
        --background: hsl(0 0% 100%);
        --foreground: hsl(222.2 84% 4.9%);
        --card: hsl(0 0% 100%);
        --card-foreground: hsl(222.2 84% 4.9%);
        --primary: hsl(221.2 83.2% 53.3%);
        --primary-foreground: hsl(210 40% 98%);
        --secondary: hsl(210 40% 96%);
        --secondary-foreground: hsl(222.2 47.4% 11.2%);
        --muted: hsl(210 40% 96%);
        --muted-foreground: hsl(215.4 16.3% 46.9%);
        --accent: hsl(210 40% 96%);
        --accent-foreground: hsl(222.2 47.4% 11.2%);
        --border: hsl(214.3 31.8% 91.4%);
        --ring: hsl(221.2 83.2% 53.3%);
        --radius: 0.5rem;
      }
      
      /* Tailwind-like utility classes for the shadow DOM */
      .grid { display: grid; }
      .gap-6 { gap: 1.5rem; }
      .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
      .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
      
      @media (min-width: 768px) {
        .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      }
      
      @media (min-width: 1024px) {
        .lg\\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
      }
      
      .overflow-hidden { overflow: hidden; }
      .rounded-lg { border-radius: var(--radius); }
      .border { border-width: 1px; border-color: var(--border); }
      .bg-card { background-color: var(--card); }
      .shadow-sm { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
      .transition-all { transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 200ms; }
      .hover\\:shadow-lg:hover { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
      .hover\\:-translate-y-1:hover { transform: translateY(-0.25rem); }
      
      .aspect-video { aspect-ratio: 16 / 9; }
      .w-full { width: 100%; }
      .h-full { height: 100%; }
      .object-cover { object-fit: cover; }
      
      .p-4 { padding: 1rem; }
      .mb-2 { margin-bottom: 0.5rem; }
      .mb-3 { margin-bottom: 0.75rem; }
      
      .font-semibold { font-weight: 600; }
      .text-card-foreground { color: var(--card-foreground); }
      .text-2xl { font-size: 1.5rem; line-height: 2rem; }
      .font-bold { font-weight: 700; }
      .text-primary { color: var(--primary); }
      .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
      .text-muted-foreground { color: var(--muted-foreground); }
      
      .flex { display: flex; }
      .items-center { align-items: center; }
      .justify-between { justify-content: space-between; }
      
      .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
      .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
      .bg-primary { background-color: var(--primary); }
      .text-primary-foreground { color: var(--primary-foreground); }
      .rounded-md { border-radius: calc(var(--radius) - 2px); }
      .hover\\:bg-primary\\/90:hover { background-color: hsl(221.2 83.2% 53.3% / 0.9); }
      .transition-colors { transition-property: color, background-color, border-color, text-decoration-color, fill, stroke; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
      
      button {
        border: none;
        cursor: pointer;
        font-size: 0.875rem;
        line-height: 1.25rem;
        padding: 0.25rem 0.75rem;
        background-color: var(--primary);
        color: var(--primary-foreground);
        border-radius: calc(var(--radius) - 2px);
        transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      button:hover {
        background-color: hsl(221.2 83.2% 53.3% / 0.9);
      }
      
      .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    `;

    // Create container div
    const container = document.createElement("div");
    container.className = "product-card-container";

    // Clear shadow root and append style and container
    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(container);

    // Create React root and render ProductCard
    this.reactRoot = createRoot(container);
    this.reactRoot.render(React.createElement(ProductCard));
  }
}

export default ProductCardWebComponent;
