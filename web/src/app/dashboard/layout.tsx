"use client";

import { Sidebar } from "@/components/dashboard/sidebar";
import { BottomNav } from "@/components/dashboard/bottom-nav";
import { MobileHeader } from "@/components/dashboard/mobile-header";
import { ErrorBoundary } from "@/components/shared/error-boundary";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bg text-ink font-sans">
      <Sidebar />
      <MobileHeader />
      <main className="lg:ml-[220px] min-h-screen pb-20 lg:pb-0" role="main" aria-label="Dashboard content">
        <ErrorBoundary>{children}</ErrorBoundary>
      </main>
      <BottomNav />
    </div>
  );
}
