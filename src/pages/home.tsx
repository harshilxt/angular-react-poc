import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, ExternalLink, Package, Zap } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">React ProductCard Web Component</h1>
              <p className="text-muted-foreground mt-2">Cross-framework reusable component for Angular integration</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="px-3 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full">
                v1.0.0
              </span>
              <Link href="/demo">
                <Button variant="secondary">
                  View Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Integration Guide */}
      <section className="bg-muted py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Integration Example</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-3 flex items-center">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-2">1</span>
                    Angular Integration
                  </h3>
                  <div className="bg-slate-900 text-green-400 p-4 rounded-md text-sm font-mono overflow-x-auto">
                    <div className="text-gray-400">// Import the web component</div>
                    <div>import './product-card-standalone.js';</div>
                    <br />
                    <div className="text-gray-400">// Use in template</div>
                    <div>&lt;product-card&gt;&lt;/product-card&gt;</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-3 flex items-center">
                    <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold mr-2">2</span>
                    Build Output
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Package className="w-4 h-4 mr-2" />
                      <span>/dist/product-card-standalone.js</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Package className="w-4 h-4 mr-2" />
                      <span>/dist/index.html</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Zap className="w-4 h-4 mr-2" />
                      <span>Ready for CDN deployment</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Features & Benefits</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Built with modern web standards for seamless cross-framework integration
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code className="w-6 h-6 mr-2 text-primary" />
                Framework Agnostic
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Works seamlessly with Angular, Vue, Vanilla JS, or any modern web framework using Web Components standard.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="w-6 h-6 mr-2 text-primary" />
                High Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Optimized bundle size with lazy loading, error boundaries, and efficient API data fetching.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="w-6 h-6 mr-2 text-primary" />
                Production Ready
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Complete with error handling, loading states, responsive design, and TypeScript support.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Link href="/demo">
            <Button size="lg" className="mr-4">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Live Demo
            </Button>
          </Link>
          <Button variant="outline" size="lg">
            <Code className="w-4 h-4 mr-2" />
            View Documentation
          </Button>
        </div>
      </main>

      {/* Technical Specs */}
      <section className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Technical Specifications</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3 flex items-center">
                    <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mr-3">
                      ⚛️
                    </span>
                    React Component
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Functional component with hooks</li>
                    <li>• Fetch API for data loading</li>
                    <li>• Error boundary handling</li>
                    <li>• Responsive design</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3 flex items-center">
                    <span className="w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mr-3">
                      📦
                    </span>
                    Build System
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Vite bundling</li>
                    <li>• TypeScript compilation</li>
                    <li>• Web Components API</li>
                    <li>• Standalone distribution</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3 flex items-center">
                    <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mr-3">
                      🔗
                    </span>
                    Integration
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Angular compatible</li>
                    <li>• Custom element registration</li>
                    <li>• Shadow DOM encapsulation</li>
                    <li>• CDN ready deployment</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <p className="text-muted-foreground">&copy; 2024 React ProductCard Web Component. Built with ⚛️ React & Vite.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Documentation</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">GitHub</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">NPM</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
