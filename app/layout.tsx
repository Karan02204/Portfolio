import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Inconsolata, Inter } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import ResumeButton from "@/components/ResumeButton";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollHint from "@/components/ScrollHint";
import "lenis/dist/lenis.css";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

const gued = localFont({
  src: [
    {
      path: "../public/fonts/gued/Gued.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/gued/Gued - Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-gued",
  display: "swap",
});

const ABCGravity = localFont({
  src: [
    {
      path: "../public/fonts/abc-gravity-font-family/ABCGravity-NormalItalic-Trial.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/abc-gravity-font-family/ABCGravity-Normal-Trial.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/abc-gravity-font-family/ABCGravity-Normal-Trial.woff2",
      weight: "300",
      style: "normal",
    }
  ],
  variable: "--font-ABCGravity",
  display: "swap",
});

const oswald = localFont({
  src: [
    {
      path: "../public/fonts/oswald/Oswald-Light.woff2",
      weight: "400",
      style: "Normal",
    },
  ],
  variable: "--font-oswald",
  display: "swap",
});

const inconsolata = Inconsolata({ subsets: ["latin"], variable: "--font-inconsolata", display: "swap" });

const SITE_URL = "https://karanattri.vercel.app";
const OG_IMAGE =
  "https://res.cloudinary.com/dcwryqkis/image/upload/f_auto,q_auto/v1774897735/karan_01.jpg";
const DESCRIPTION =
  "Karan Attri — full stack developer building fast, responsive web applications with React, Next.js, Node.js and MongoDB. Selected projects, skills and contact.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Karan Attri — Full Stack Developer",
    template: "%s | Karan Attri",
  },
  description: DESCRIPTION,
  keywords: [
    "Karan Attri",
    "full stack developer",
    "web developer",
    "React",
    "Next.js",
    "Node.js",
    "MongoDB",
    "portfolio",
  ],
  authors: [{ name: "Karan Attri", url: SITE_URL }],
  creator: "Karan Attri",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Karan Attri",
    title: "Karan Attri — Full Stack Developer",
    description: DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Karan Attri — Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Karan Attri — Full Stack Developer",
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#131313",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body className={`${gued.variable} ${inconsolata.variable} ${ABCGravity.variable} ${oswald.variable} antialiased`}>
        <script
          type="application/ld+json"
          // Structured data so Google can render a Person knowledge panel
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Karan Attri",
              url: SITE_URL,
              jobTitle: "Full Stack Developer",
              description: DESCRIPTION,
              image: OG_IMAGE,
              sameAs: [
                "https://github.com/Karan02204",
                "https://linkedin.com/in/karanattri022/",
                "https://leetcode.com/u/Karanattri/",
              ],
            }),
          }}
        />
        <a
          href="#about"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-1/2 focus:-translate-x-1/2 focus:z-[200] focus:rounded-full focus:bg-[#ff5b22] focus:px-5 focus:py-3 focus:text-black focus:font-bold"
        >
          Skip to main content
        </a>
        <SmoothScroll>
          <ScrollProgress />
          <Sidebar />
          <ResumeButton />
          {children}
          <ScrollHint />
        </SmoothScroll>
      </body>
    </html>
  );
}
