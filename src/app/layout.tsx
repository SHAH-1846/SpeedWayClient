import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Speed Way Vacation Rentals | Luxury Home Rentals",
  description:
    "Discover luxury vacation homes curated for unforgettable experiences. Villas, apartments, cottages, and more — your dream getaway awaits.",
  keywords: "vacation rentals, luxury homes, villas, beach houses, holiday homes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased bg-slate-950 text-slate-200`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
