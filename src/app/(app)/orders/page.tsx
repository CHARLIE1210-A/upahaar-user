"use client";

import { MOCK_ORDERS } from '@/lib/constants';
import type { Order, CartItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Image from 'next/image';
import Link from 'next/link';
import { PackageCheck, PackageSearch, History, ChevronDown } from 'lucide-react';

const getStatusVariant = (status: Order['status']): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case 'Delivered':
      return 'default'; // Or a success green color if defined
    case 'Processing':
      return 'secondary';
    case 'Out for Delivery':
      return 'outline'; // Or an info blue
    case 'Cancelled':
        return 'destructive';
    default:
      return 'default';
  }
};

const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'Delivered':
        return <PackageCheck className="h-5 w-5 mr-2 text-green-600" />;
      case 'Processing':
        return <History className="h-5 w-5 mr-2 text-yellow-600" />;
      case 'Out for Delivery':
        return <PackageSearch className="h-5 w-5 mr-2 text-blue-600" />;
      default:
        return <PackageSearch className="h-5 w-5 mr-2 text-muted-foreground" />;
    }
  };


export default function OrdersPage() {
  const orders = MOCK_ORDERS; // In a real app, fetch this data

  if (orders.length === 0) {
    return (
      <div className="text-center py-16">
         <History className="mx-auto h-24 w-24 text-muted-foreground mb-6" />
        <h1 className="text-3xl font-headline font-semibold mb-4 text-foreground">No Orders Yet</h1>
        <p className="text-muted-foreground mb-8">You haven't placed any orders. Start shopping to see them here!</p>
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-md shadow-md">
          <Link href="/home">Shop Now</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl md:text-4xl font-headline font-bold mb-8 text-center text-foreground">Your Orders</h1>
      <Accordion type="single" collapsible className="w-full space-y-4">
        {orders.map((order) => (
          <Card key={order.id} className="shadow-sm rounded-lg overflow-hidden">
            <AccordionItem value={order.id} className="border-b-0">
              <AccordionTrigger className="p-4 hover:no-underline hover:bg-accent/50 rounded-t-lg transition-colors group">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full text-left">
                  <div className="mb-2 sm:mb-0">
                    <p className="text-lg font-semibold font-headline text-foreground">Order ID: {order.id}</p>
                    <p className="text-sm text-muted-foreground">Date: {order.orderDate}</p>
                  </div>
                  <div className="flex flex-col items-start sm:items-end">
                     <Badge variant={getStatusVariant(order.status)} className="mb-1 capitalize rounded-md px-2.5 py-1 text-xs">
                        {getStatusIcon(order.status)}
                        {order.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground">Total: <span className="font-semibold text-primary">${order.total.toFixed(2)}</span></p>
                  </div>
                </div>
                 <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 text-primary group-data-[state=open]:rotate-180 ml-auto" />
              </AccordionTrigger>
              <AccordionContent className="p-0">
                <div className="bg-background p-4 rounded-b-lg border-t">
                  <CardDescription className="mb-3 text-sm text-muted-foreground">
                    {order.estimatedDelivery && `Estimated Delivery: ${order.estimatedDelivery}`}
                  </CardDescription>
                  <h4 className="font-semibold mb-2 text-foreground">Items:</h4>
                  <ul className="space-y-3">
                    {order.items.map((item: CartItem) => (
                      <li key={`${item.id}-${JSON.stringify(item.selectedOptions)}`} className="flex items-center gap-3 p-2 border rounded-md shadow-xs bg-white">
                        <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                           <Image src={item.imageUrl} alt={item.name} fill sizes="50px" className="object-cover" data-ai-hint={item.dataAiHint || 'ordered item'}/>
                        </div>
                        <div className="flex-grow">
                          <p className="text-sm font-medium text-foreground">{item.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity} - Price: ${item.price.toFixed(2)}</p>
                          {item.selectedOptions && Object.entries(item.selectedOptions).map(([key,value])=> (
                            <p key={key} className="text-xs text-muted-foreground">{key}: {value}</p>
                          ))}
                        </div>
                        <p className="text-sm font-semibold text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-col sm:flex-row gap-2 justify-end">
                    <Button variant="outline" size="sm" className="rounded-md shadow-sm border-primary text-primary hover:bg-primary/10">View Details</Button>
                    <Button variant="outline" size="sm" className="rounded-md shadow-sm">Contact Support</Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Card>
        ))}
      </Accordion>
    </div>
  );
}
