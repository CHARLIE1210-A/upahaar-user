"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { MOCK_PRODUCTS } from '@/lib/constants';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import QuantitySelector from '@/components/QuantitySelector';
import { useCart } from '@/hooks/useCart';
import { Star, ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({});
  const [giftMessage, setGiftMessage] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (params.id) {
      const foundProduct = MOCK_PRODUCTS.find(p => p.id === params.id);
      if (foundProduct) {
        setProduct(foundProduct);
        // Initialize selectedOptions
        if (foundProduct.options) {
          const initialOptions: { [key: string]: string } = {};
          foundProduct.options.forEach(opt => {
            initialOptions[opt.name] = opt.values[0];
          });
          setSelectedOptions(initialOptions);
        }
      } else {
        // Handle product not found, e.g., redirect to a 404 page or home
        router.push('/home');
      }
    }
  }, [params.id, router]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedOptions, giftMessage);
  };

  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions(prev => ({ ...prev, [optionName]: value }));
  };

  const images = product.images || [product.imageUrl];

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="overflow-hidden shadow-lg rounded-lg">
        <div className="grid md:grid-cols-2 gap-4 md:gap-8">
          {/* Image Carousel */}
          <CardContent className="p-4 md:p-6">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg shadow-md">
              <Image
                src={images[currentImageIndex]}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain transition-opacity duration-300"
                data-ai-hint={product.dataAiHint || 'product image'}
                priority
              />
              {images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/50 hover:bg-background/80 text-primary rounded-full"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/50 hover:bg-background/80 text-primary rounded-full"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1.5">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`h-2 w-2 rounded-full ${index === currentImageIndex ? 'bg-primary' : 'bg-muted-foreground/50'}`}
                        aria-label={`View image ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </CardContent>

          {/* Product Info */}
          <CardContent className="p-4 md:p-6 space-y-4">
            <CardTitle className="text-3xl md:text-4xl font-headline font-bold text-foreground">{product.name}</CardTitle>
            
            <div className="flex items-center justify-between">
              <p className="text-3xl font-semibold text-primary">${product.price.toFixed(2)}</p>
              {product.rating && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span>{product.rating.toFixed(1)}</span>
                  {product.reviews && <span>({product.reviews} reviews)</span>}
                </div>
              )}
            </div>

            <CardDescription className="text-foreground/80 leading-relaxed">{product.description}</CardDescription>

            {product.seller && <p className="text-sm text-muted-foreground">Sold by: <span className="font-medium text-foreground">{product.seller}</span></p>}

            {/* Option Selector */}
            {product.options && product.options.map(opt => (
              <div key={opt.name} className="space-y-1.5">
                <Label htmlFor={opt.name.toLowerCase()} className="text-sm font-medium text-foreground">{opt.name}</Label>
                <Select
                  value={selectedOptions[opt.name]}
                  onValueChange={(value) => handleOptionChange(opt.name, value)}
                >
                  <SelectTrigger id={opt.name.toLowerCase()} className="w-full rounded-md shadow-sm border-primary/50 focus:ring-primary">
                    <SelectValue placeholder={`Select ${opt.name}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {opt.values.map(val => (
                      <SelectItem key={val} value={val}>{val}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}

            {/* Gift Message */}
            <div className="space-y-1.5">
              <Label htmlFor="giftMessage" className="text-sm font-medium text-foreground">Gift Message (Optional)</Label>
              <Textarea
                id="giftMessage"
                placeholder="Add a personal touch..."
                value={giftMessage}
                onChange={(e) => setGiftMessage(e.target.value)}
                className="rounded-md shadow-sm border-primary/50 focus:ring-primary"
                rows={3}
              />
            </div>

            {/* Quantity Selector */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-foreground">Quantity</Label>
              <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />
            </div>

            {/* Add to Cart Button */}
            <Button
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-3 rounded-md shadow-md hover:shadow-lg transition-all"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
