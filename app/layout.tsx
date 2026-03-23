import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inconsolata } from "next/font/google";
import "./globals.css";

const gued = localFont({
  src: [
    { path: "../public/fonts/gued/Gued.otf", weight: "400", style: "normal" },
    { path: "../public/fonts/gued/Gued - Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-gued",
});

const inconsolata = Inconsolata({ subsets: ["latin"], variable: "--font-inconsolata" });

export const metadata: Metadata = {
  title: "Karan Attri — Full Stack Developer",
  description: "Full Stack Web Developer building cinematic digital experiences at the intersection of design & engineering.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${gued.variable} ${inconsolata.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
