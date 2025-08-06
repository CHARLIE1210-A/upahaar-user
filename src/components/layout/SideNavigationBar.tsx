"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Package, ShoppingCart, User, Bot, Gift, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from '@/components/ui/sidebar';

const navItems = [
  { href: '/home', label: 'Home', icon: Home, tooltip: 'Home' },
  { href: '/ai-gift-finder', label: 'AI Gift Finder', icon: Bot, tooltip: 'AI Gift Finder' },
  { href: '/cart', label: 'Shopping Cart', icon: ShoppingCart, tooltip: 'Cart' },
  { href: '/orders', label: 'My Orders', icon: Package, tooltip: 'Orders' },
  { href: '/profile', label: 'User Profile', icon: User, tooltip: 'Profile' },
];

export default function SideNavigationBar() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2">
          <Gift className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold font-headline text-primary group-data-[collapsible=icon]:hidden">Upahaar</span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => {
            const isActive = item.href === '/home' 
              ? pathname === '/' || pathname === '/home'
              : pathname.startsWith(item.href);
            return (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} passHref legacyBehavior>
                    <SidebarMenuButton tooltip={item.tooltip} isActive={isActive}>
                        <item.icon />
                        <span>{item.label}</span>
                    </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

       <SidebarFooter>
          <SidebarMenu>
             <SidebarMenuItem>
                <Link href="/login" passHref legacyBehavior>
                    <SidebarMenuButton tooltip="Logout">
                         <LogOut />
                        <span>Logout</span>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
    </>
  );
}
