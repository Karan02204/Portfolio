import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inconsolata, Inter, Oswald } from "next/font/google";
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

const ABCGravity = localFont({
  src: [
    {
      path: "../public/fonts/abc-gravity-font-family/ABCGravity-NormalItalic-Trial.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/abc-gravity-font-family/ABCGravity-Normal-Trial.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/abc-gravity-font-family/ABCGravity-Normal-Trial.otf",
      weight: "300",
      style: "normal",
    }
  ],
  variable: "--font-ABCGravity",
});

const oswald = localFont({
  src: [
    {
      path: "../public/fonts/oswald/Oswald-Light.ttf",
      weight: "400",
      style: "Normal",
    },
  ],
  variable: "--font-oswald",
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
      <body className={`${gued.variable} ${inconsolata.variable} ${ABCGravity.variable} ${oswald.variable} antialiased`}>
        <Sidebar />
        {children}
      </body>
    </html>
  );
}
