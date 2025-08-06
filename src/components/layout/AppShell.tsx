"use client";

import React from 'react';
import Header from './Header';
import BottomNavigationBar from './BottomNavigationBar';
import SideNavigationBar from './SideNavigationBar';
import { useIsMobile } from '@/hooks/use-mobile';
import { usePathname } from 'next/navigation';
import { Sidebar, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const noNavPaths = ['/login'];

  if (noNavPaths.includes(pathname)) {
    return <>{children}</>;
  }


  return (
    <div className="flex flex-col min-h-screen">
      {isMobile ? (
        <>
          <Header isMobile={isMobile} />
          <main className="flex-grow container mx-auto px-4 py-6 pb-20"> {/* pb-20 for bottom nav clearance */}
            {children}
          </main>
          <BottomNavigationBar />
        </>
      ) : (
        <div className="flex">
          <Sidebar variant="inset" collapsible="icon">
            <SideNavigationBar />
          </Sidebar>
          <SidebarInset>
            <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                    <SidebarTrigger />
                    <h2 className="text-xl font-semibold">Upahaar</h2>
                </div>
                {children}
            </div>
          </SidebarInset>
        </div>
      )}
    </div>
  );
}
