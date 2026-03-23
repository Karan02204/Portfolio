import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
    <html lang="en">
      <body className={`${gued.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
