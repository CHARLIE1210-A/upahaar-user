import AppShell from '@/components/layout/AppShell';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function AppPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppShell>{children}</AppShell>
    </SidebarProvider>
  );
}
