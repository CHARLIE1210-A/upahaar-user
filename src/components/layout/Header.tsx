import Link from 'next/link';
import { Gift, UserCircle, Home, ShoppingCart, Package, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';


const navItems = [
  { href: '/home', label: 'Home', icon: Home },
  { href: '/ai-gift-finder', label: 'AI Finder', icon: Bot },
  { href: '/cart', label: 'Cart', icon: ShoppingCart },
  { href: '/orders', label: 'Orders', icon: Package },
];


interface HeaderProps {
  isMobile?: boolean;
}

export default function Header({ isMobile }: HeaderProps) {
    const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Gift className="h-7 w-7 text-primary" />
          <span className="text-2xl font-bold font-headline text-primary">Upahaar</span>
        </Link>
        
        {!isMobile && (
            <nav className="hidden md:flex gap-6 items-center">
                 {navItems.map((item) => {
                    const isActive = item.href === '/home' 
                        ? pathname === '/' || pathname === '/home'
                        : pathname.startsWith(item.href);

                    return (
                        <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            'text-sm font-medium transition-colors',
                            isActive ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-foreground'
                        )}
                        >
                        {item.label}
                        </Link>
                    );
                })}
            </nav>
        )}

        <div className="flex items-center gap-2">
          <Link href="/profile">
            <Button variant="ghost" size="icon" className="text-primary hover:text-accent-foreground">
              <UserCircle className="h-6 w-6" />
              <span className="sr-only">Profile</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
