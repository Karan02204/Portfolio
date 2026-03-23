import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inconsolata, Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const gued = localFont({
  src: [
    { path: "../public/fonts/gued/Gued.otf", weight: "400", style: "normal" },
    { path: "../public/fonts/gued/Gued - Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-gued",
});

const inconsolata = Inconsolata({ subsets: ["latin"], variable: "--font-inconsolata" });
const syne = Syne({ subsets: ["latin"], weight: ["700", "800"], variable: "--font-syne" });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-dm-sans" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], weight: ["400"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Karan Attri — Full Stack Developer",
  description: "Full Stack Web Developer building cinematic digital experiences at the intersection of design & engineering.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${gued.variable} ${inconsolata.variable} ${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
