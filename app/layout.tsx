import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inconsolata, Inter } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const gued = localFont({
  src: [
    {
      path: "../public/fonts/gued/Gued.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/gued/Gued - Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-gued",
});

const inconsolata = Inconsolata({ subsets: ["latin"], variable: "--font-inconsolata" });

export const metadata: Metadata = {
  title: "Creative Developer Portfolio",
  description: "High-end scrollytelling portfolio built with Next.js and Framer Motion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body className={`${gued.variable} ${inconsolata.variable} antialiased`}>
        <Sidebar />
        {children}
      </body>
    </html>
  );
}
