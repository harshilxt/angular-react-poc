import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import ProductCard from "@/components/ProductCard";

export default function Demo() {
  const [demoState, setDemoState] = useState<"loading" | "products" | "error">("products");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/">
                <Button variant="ghost" size="sm" className="mr-4">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Live Demo</h1>
                <p className="text-muted-foreground mt-2">ProductCard web component in action</p>
              </div>
            </div>
            <div className="inline-flex items-center px-4 py-2 bg-accent text-accent-foreground rounded-full text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              API: /api/products
            </div>
          </div>
        </div>
      </header>

      {/* Demo Controls */}
      <section className="bg-muted py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-4">Demo Controls</h2>
            <p className="text-muted-foreground mb-6">
              Test different states of the ProductCard component
            </p>
            <div className="flex justify-center space-x-4">
              <Button
                variant={demoState === "products" ? "default" : "secondary"}
                onClick={() => setDemoState("products")}
                data-testid="button-show-products"
              >
                Show Products
              </Button>
              <Button
                variant={demoState === "loading" ? "default" : "secondary"}
                onClick={() => setDemoState("loading")}
                data-testid="button-show-loading"
              >
                Show Loading
              </Button>
              <Button
                variant={demoState === "error" ? "default" : "secondary"}
                onClick={() => setDemoState("error")}
                data-testid="button-show-error"
              >
                Show Error
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Live Demo */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">React ProductCard Component</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Below is the ProductCard component fetching data from the API endpoint
          </p>
        </div>

        {demoState === "products" && (
          <div data-testid="demo-products">
            <h3 className="text-xl font-semibold mb-6">Live Products from API</h3>
            <ProductCard />
          </div>
        )}

        {demoState === "loading" && (
          <div data-testid="demo-loading">
            <h3 className="text-xl font-semibold mb-6">Loading State</h3>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="h-48 w-full bg-muted animate-pulse" />
                  <CardContent className="p-4">
                    <div className="h-4 bg-muted rounded w-3/4 mb-2 animate-pulse" />
                    <div className="h-4 bg-muted rounded w-1/2 mb-3 animate-pulse" />
                    <div className="flex items-center justify-between">
                      <div className="h-4 bg-muted rounded w-16 animate-pulse" />
                      <div className="h-8 bg-muted rounded w-20 animate-pulse" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {demoState === "error" && (
          <div data-testid="demo-error">
            <h3 className="text-xl font-semibold mb-6">Error State</h3>
            <Card className="bg-destructive/10 border-destructive/20 max-w-2xl mx-auto">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 text-destructive">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-destructive mb-2">Failed to load products</h3>
                <p className="text-destructive/80 mb-4">Unable to connect to the API endpoint. Please check your connection and try again.</p>
                <Button
                  variant="outline"
                  className="border-destructive/30 text-destructive hover:bg-destructive/10"
                  onClick={() => setDemoState("products")}
                  data-testid="button-retry-demo"
                >
                  Retry
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {/* Integration Instructions */}
      <section className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">How to Use in Angular</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-3">1. Import the Standalone Build</h3>
                  <div className="bg-slate-900 text-green-400 p-4 rounded-md text-sm font-mono overflow-x-auto">
                    <div className="text-gray-400">// app.component.ts or main.ts</div>
                    <div>import './assets/product-card-standalone.js';</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-3">2. Use in Template</h3>
                  <div className="bg-slate-900 text-green-400 p-4 rounded-md text-sm font-mono overflow-x-auto">
                    <div className="text-gray-400">&lt;!-- app.component.html --&gt;</div>
                    <div>&lt;product-card&gt;&lt;/product-card&gt;</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-3">3. Handle Events (Optional)</h3>
                  <div className="bg-slate-900 text-green-400 p-4 rounded-md text-sm font-mono overflow-x-auto">
                    <div className="text-gray-400">// Listen for add-to-cart events</div>
                    <div>window.addEventListener('product-add-to-cart',</div>
                    <div>  (event) =&gt; &#123;</div>
                    <div>    console.log(event.detail.productId);</div>
                    <div>  &#125;);</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-3">4. Angular Module Setup</h3>
                  <div className="bg-slate-900 text-green-400 p-4 rounded-md text-sm font-mono overflow-x-auto">
                    <div className="text-gray-400">// app.module.ts</div>
                    <div>import &#123; CUSTOM_ELEMENTS_SCHEMA &#125;</div>
                    <div>  from '@angular/core';</div>
                    <br />
                    <div>schemas: [CUSTOM_ELEMENTS_SCHEMA]</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
