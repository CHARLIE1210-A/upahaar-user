"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useCarts } from '@/hooks/useCarts';
import QuantitySelector from '@/components/QuantitySelector';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Trash2, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  // const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart(1);
  const { addToCart, isLoading, cartItems, removeFromCart, updateQuantity } = useCarts(1);

  // if (!isCartInitialized) {
  //    return (
  //     <div className="flex justify-center items-center min-h-[60vh]">
  //       <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
  //     </div>
  //   );
  // }

  if (isLoading) {
    return (
      <div className="text-center py-16">
        <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground mb-6" />
        <h1 className="text-3xl font-headline font-semibold mb-4 text-foreground">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-md shadow-md">
          <Link href="/home">Start Shopping</Link>
        </Button>
      </div>
    );
  }
  console.log("cart", cartItems.data)
  const cartCount = (cartItems.data ?? []).reduce((total, item) => total + ((item?.price ?? 0) * (item?.quantity ?? 0)), 0);
  const cartTotal = (cartItems.data ?? []).reduce((count, item) => count + (item.quantity ?? 0), 0)

  const deliveryFee = cartTotal > 0 ? 5.00 : 0; // Mock delivery fee
  const finalTotal = cartTotal + deliveryFee;
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl md:text-4xl font-headline font-bold mb-8 text-center text-foreground">Your Shopping Cart</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.data?.map(item => (
              <Card
              key={`${item.id}::${item.selectedOptions ? JSON.stringify(item.selectedOptions) : ''}`}
              className="flex flex-col sm:flex-row items-center p-4 gap-4 shadow-sm rounded-lg"
            >
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-md overflow-hidden flex-shrink-0">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  sizes="100px"
                  className="object-cover"
                  data-ai-hint={item.dataAiHint || 'cart item'}
                />
              </div>
              <div className="flex-grow text-center sm:text-left">
                <h2 className="text-lg font-semibold font-headline text-foreground">{item.name}</h2>
                {item.selectedOptions && Object.entries(item.selectedOptions).map(([key, value]) => (
                  <p key={key} className="text-xs text-muted-foreground">{key}: {value}</p>
                ))}
                <p className="text-md font-semibold text-primary mt-1">${item.price}</p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 sm:mt-0">
                <QuantitySelector
                  quantity={item.quantity}
                  onQuantityChange={(newQuantity) => updateQuantity({ cartItemId: item.id, quantity: newQuantity })}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFromCart(item.id)}
                  className="text-destructive hover:bg-destructive/10 rounded-md"
                  aria-label="Remove item"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-1">
          <Card className="shadow-md rounded-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-headline text-center text-foreground">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-md">
                <span className="text-muted-foreground">Subtotal ({cartCount} items)</span>
                <span className="font-semibold text-foreground">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-md">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span className="font-semibold text-foreground">${deliveryFee.toFixed(2)}</span>
              </div>
              <Separator className="my-3" />
              <div className="flex justify-between text-xl font-bold">
                <span className="text-foreground">Total</span>
                <span className="text-primary">${finalTotal.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-3 rounded-md shadow-md hover:shadow-lg transition-all">
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
