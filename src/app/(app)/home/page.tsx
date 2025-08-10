'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/gifts/ProductCard';
import { MOCK_PRODUCTS, MOCK_OCCASIONS } from '@/lib/constants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, ChevronRight } from 'lucide-react';
import axios from "axios";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from storage

        const response = await axios.get("http://localhost:8081/products/get-product", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProducts(response.data);
      } catch (err: any) {
        console.error("Error fetching products:", err);
        setError(err.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  const featuredGifts = MOCK_PRODUCTS.slice(1, 5).reverse();
  const aiRecommendations = MOCK_PRODUCTS.slice(0, 4);
  return (
    <div className="space-y-8">
      {/* Prominent Search Bar */}
      <div className="relative">
        <Input
          type="search"
          placeholder="Search for the perfect gift..."
          className="w-full h-12 pl-10 pr-4 rounded-lg shadow-subtle focus:ring-2 focus:ring-primary"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      </div>

      {/* AI-Powered Recommendations */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-headline font-semibold text-foreground">AI-Powered Recommendations</h2>
          <Link href="/ai-gift-finder" className="text-sm text-primary hover:underline flex items-center">
            Find More <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
           {/* Horizontal scroll on mobile, grid on larger screens */}
          {loading && <p>Loading AI Recommendations...</p>}
          {error && <p>Error loading AI Recommendations: {error.message}</p>}
          {!loading && !error && aiRecommendations.length === 0 && <p>No AI Recommendations found.</p>}
          {!loading && !error && aiRecommendations.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Shop by Occasion */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-headline font-semibold text-foreground">Shop by Occasion</h2>
           <Link href="/categories" className="text-sm text-primary hover:underline flex items-center">
            All Occasions <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
          {MOCK_OCCASIONS.map((occasion: any) => (
            <Link key={occasion.id} href={`/occasion/${occasion.id}`} className="block group">
              <Card className="overflow-hidden shadow-subtle hover:shadow-md transition-shadow duration-300 rounded-lg aspect-[3/2] flex flex-col justify-end">
                <div className="relative w-full h-full">
                   <Image
                    src={occasion.imageUrl}
                    alt={occasion.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={occasion.dataAiHint || 'occasion gift'}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3 flex flex-col justify-end">
                    <h3 className="text-md sm:text-lg font-semibold text-white font-headline text-center group-hover:text-accent transition-colors">
                      {occasion.name}
                    </h3>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Gifts */}
      <section>
         <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-headline font-semibold text-foreground">Featured Gifts</h2>
           <Link href="/featured" className="text-sm text-primary hover:underline flex items-center">
            See All <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {loading && <p>Loading Featured Gifts...</p>}
          {error && <p>Error loading Featured Gifts: {error.message}</p>}
          {!loading && !error && featuredGifts.length === 0 && <p>No Featured Gifts found.</p>}
          {!loading && !error && featuredGifts.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* All Products */}
      <section>
        <h2 className="text-2xl font-headline font-semibold text-foreground mb-4">All Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading && <p>Loading products...</p>}
          {error && <p>Error loading products: {error.message}</p>}
          {!loading && !error && products.length === 0 && <p>No products found.</p>}
          {!loading && !error && products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
