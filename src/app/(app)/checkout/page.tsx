"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MOCK_USER_PROFILE, PAYMENT_METHODS } from '@/lib/constants';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { ChevronLeft, CreditCard, Truck, Landmark, CircleDollarSign } from 'lucide-react';

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart, isCartInitialized } = useCart();
  const router = useRouter();
  const { toast } = useToast();

  const [deliveryInfo, setDeliveryInfo] = useState({
    name: MOCK_USER_PROFILE.name,
    address: MOCK_USER_PROFILE.savedAddresses[0]?.line1 || '',
    city: MOCK_USER_PROFILE.savedAddresses[0]?.city || '',
    zip: MOCK_USER_PROFILE.savedAddresses[0]?.zip || '',
    phone: MOCK_USER_PROFILE.phone,
  });
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS[0].id);

  useEffect(() => {
    if (isCartInitialized && cartItems.length === 0) {
      toast({ title: "Your cart is empty", description: "Redirecting to homepage...", variant: "default" });
      router.push('/home');
    }
  }, [cartItems, isCartInitialized, router, toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeliveryInfo(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = () => {
    // Mock order placement
    console.log('Order placed:', { deliveryInfo, paymentMethod, items: cartItems, total: finalTotal });
    toast({
      title: 'Order Placed Successfully!',
      description: 'Thank you for your purchase. Your gifts are on their way!',
      variant: 'default',
    });
    clearCart();
    router.push('/orders'); // Navigate to order tracking page
  };

  const deliveryFee = cartTotal > 0 ? 5.00 : 0;
  const finalTotal = cartTotal + deliveryFee;

  if (!isCartInitialized || cartItems.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  const getPaymentIcon = (id: string) => {
    if (id === 'cc') return <CreditCard className="h-5 w-5 mr-2 text-primary" />;
    if (id === 'upi') return <Landmark className="h-5 w-5 mr-2 text-primary" />; // Using Landmark as UPI placeholder
    if (id === 'cod') return <CircleDollarSign className="h-5 w-5 mr-2 text-primary" />;
    return null;
  };

  return (
    <div className="container mx-auto py-8">
      <Button variant="outline" onClick={() => router.back()} className="mb-6 rounded-md shadow-sm border-primary text-primary hover:bg-primary/10">
        <ChevronLeft className="mr-2 h-4 w-4" /> Back to Cart
      </Button>
      <h1 className="text-3xl md:text-4xl font-headline font-bold mb-8 text-center text-foreground">Checkout</h1>
      
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Delivery & Payment Forms */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-md rounded-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-headline text-foreground flex items-center">
                <Truck className="mr-3 h-6 w-6 text-primary" /> Delivery Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" value={deliveryInfo.name} onChange={handleInputChange} className="rounded-md shadow-sm border-primary/50 focus:ring-primary" />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" name="address" value={deliveryInfo.address} onChange={handleInputChange} className="rounded-md shadow-sm border-primary/50 focus:ring-primary" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" value={deliveryInfo.city} onChange={handleInputChange} className="rounded-md shadow-sm border-primary/50 focus:ring-primary" />
                </div>
                <div>
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" name="zip" value={deliveryInfo.zip} onChange={handleInputChange} className="rounded-md shadow-sm border-primary/50 focus:ring-primary" />
                </div>
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" type="tel" value={deliveryInfo.phone} onChange={handleInputChange} className="rounded-md shadow-sm border-primary/50 focus:ring-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md rounded-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-headline text-foreground flex items-center">
                <CreditCard className="mr-3 h-6 w-6 text-primary" /> Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                {PAYMENT_METHODS.map(method => (
                  <Label
                    key={method.id}
                    htmlFor={method.id}
                    className="flex items-center space-x-3 p-3 border rounded-md cursor-pointer hover:bg-accent has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition-colors shadow-sm"
                  >
                    <RadioGroupItem value={method.id} id={method.id} className="text-primary border-primary focus:ring-primary" />
                    {getPaymentIcon(method.id)}
                    <span>{method.name}</span>
                  </Label>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="shadow-md rounded-lg sticky top-24">
            <CardHeader>
              <CardTitle className="text-2xl font-headline text-center text-foreground">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {cartItems.map(item => (
                <div key={`${item.id}-${JSON.stringify(item.selectedOptions)}`} className="flex items-center justify-between py-2 border-b border-dashed">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-md overflow-hidden">
                      <Image src={item.imageUrl} alt={item.name} fill sizes="50px" className="object-cover" data-ai-hint={item.dataAiHint || "summary item"} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground truncate max-w-[150px]">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-foreground">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              <Separator className="my-3" />
              <div className="flex justify-between text-md">
                <span className="text-muted-foreground">Subtotal</span>
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
              <Button
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-3 rounded-md shadow-md hover:shadow-lg transition-all"
                onClick={handlePlaceOrder}
                disabled={cartItems.length === 0}
              >
                Place Order
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
