"use client";

import { MOCK_USER_PROFILE } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import ProductCard from '@/components/gifts/ProductCard';
import { User, MapPin, Heart, LifeBuoy, LogOut, Edit2, Settings } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const user = MOCK_USER_PROFILE;

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="shadow-lg rounded-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 text-center">
          <div className="flex flex-col items-center">
            <Avatar className="w-24 h-24 mb-4 border-4 border-background shadow-md">
              <AvatarImage src={`https://placehold.co/100x100.png?text=${getInitials(user.name)}`} alt={user.name} data-ai-hint="profile picture" />
              <AvatarFallback className="text-3xl bg-primary text-primary-foreground">{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-3xl font-headline font-bold text-foreground">{user.name}</CardTitle>
            <p className="text-md text-muted-foreground">{user.email}</p>
            <p className="text-sm text-muted-foreground">{user.phone}</p>
            <Button variant="outline" size="sm" className="mt-3 rounded-md shadow-sm border-primary text-primary hover:bg-primary/10">
              <Edit2 className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 space-y-8">
          <section>
            <h2 className="text-xl font-semibold font-headline mb-4 flex items-center text-foreground">
              <Heart className="mr-2 h-5 w-5 text-primary" /> Wishlist
            </h2>
            {user.wishlist.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {user.wishlist.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">Your wishlist is empty. Start adding some gifts!</p>
            )}
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold font-headline mb-4 flex items-center text-foreground">
              <MapPin className="mr-2 h-5 w-5 text-primary" /> Saved Addresses
            </h2>
            {user.savedAddresses.length > 0 ? (
              <div className="space-y-4">
                {user.savedAddresses.map(addr => (
                  <Card key={addr.id} className="p-4 shadow-sm rounded-md bg-secondary/30">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-foreground">{addr.type}</h3>
                        <p className="text-sm text-muted-foreground">{addr.line1}{addr.suite ? `, ${addr.suite}` : ''}</p>
                        <p className="text-sm text-muted-foreground">{addr.city}, {addr.state} {addr.zip}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="text-primary hover:text-accent-foreground -mt-2 -mr-2">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No saved addresses yet.</p>
            )}
            <Button variant="outline" className="mt-4 rounded-md shadow-sm border-primary text-primary hover:bg-primary/10">Add New Address</Button>
          </section>

          <Separator />

          <section className="space-y-3">
             <Link href="/profile/settings" className="flex items-center p-3 -m-3 rounded-md hover:bg-accent transition-colors text-foreground">
                <Settings className="mr-3 h-5 w-5 text-primary" /> Account Settings
            </Link>
            <Link href="/support" className="flex items-center p-3 -m-3 rounded-md hover:bg-accent transition-colors text-foreground">
                <LifeBuoy className="mr-3 h-5 w-5 text-primary" /> Help & Support
            </Link>
          </section>
          
          <Separator />

          <Button variant="destructive" className="w-full rounded-md shadow-md hover:shadow-lg transition-all text-lg py-3">
            <LogOut className="mr-2 h-5 w-5" /> Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
