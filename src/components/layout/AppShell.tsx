"use client";

import React from 'react';
import Header from './Header';
import BottomNavigationBar from './BottomNavigationBar';
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
      <Header isMobile={isMobile} />
      <main className="flex-grow container mx-auto px-4 py-6 pb-20 md:pb-6">
        {children}
      </main>
      {isMobile && <BottomNavigationBar />}
    </div>
  );
}
