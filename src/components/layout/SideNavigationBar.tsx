"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Package, ShoppingCart, User, Bot, Gift } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/ai-gift-finder', label: 'AI Gift Finder', icon: Bot },
  { href: '/cart', label: 'Shopping Cart', icon: ShoppingCart },
  { href: '/orders', label: 'My Orders', icon: Package },
  { href: '/profile', label: 'User Profile', icon: User },
];

export default function SideNavigationBar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:flex-col md:w-64 border-r bg-background shadow-sm fixed h-full">
      <div className="flex items-center justify-center h-20 border-b">
        <Link href="/" className="flex items-center gap-2">
          <Gift className="h-8 w-8 text-primary" />
          <span className="text-3xl font-bold font-headline text-primary">Upahaar</span>
        </Link>
      </div>
      <nav className="flex-grow p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} legacyBehavior>
              <a
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-subtle'
                    : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </a>
            </Link>
          );
        })}
      </nav>
       <div className="p-4 border-t">
          <Button variant="outline" className="w-full">
            Logout (mock)
          </Button>
        </div>
    </aside>
  );
}
