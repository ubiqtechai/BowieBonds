import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import { ToastContainer } from "@/components/shared/toast-container";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZiggyDust — Micro-Bowie Bonds for Indie Artists",
  description:
    "Connect indie music artists with backers who fund YouTube ad campaigns. Revenue-share returns tied to real channel performance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
