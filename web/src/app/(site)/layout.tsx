"use client";

import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bg text-ink font-sans">
      <Nav />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
