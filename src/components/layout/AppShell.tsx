"use client";

import React from 'react';
import Header from './Header';
import BottomNavigationBar from './BottomNavigationBar';
import SideNavigationBar from './SideNavigationBar';
import { useIsMobile } from '@/hooks/use-mobile';
import { usePathname } from 'next/navigation';

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
          <SideNavigationBar />
          <div className="flex flex-col flex-grow md:ml-64"> {/* ml-64 for side nav clearance */}
            {/* Header can be omitted here if SideNav includes it, or a different header can be used */}
            {/* <Header isMobile={isMobile} /> */}
            <main className="flex-grow p-6">
              {children}
            </main>
          </div>
        </div>
      )}
    </div>
  );
}
