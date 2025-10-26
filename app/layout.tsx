import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import ConsentScripts from '@/components/ConsentScripts';
import CookieBanner from '@/components/CookieBanner';

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const barbra = localFont({ src: "/fonts/Barbra-Regular.ttf", display: "swap", variable: "--font-barbra" });

export const metadata: Metadata = {
  title: "Sans Transition",
  description: "ST",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${barbra.variable} antialiased`}>
        {/* Initialize theme early to prevent FOUC */}
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            try {
              const stored = localStorage.getItem('theme');
              const wantsDark = stored === 'dark';
              document.documentElement.classList.toggle('dark', wantsDark);
            } catch (_) { /* no-op */ }
          `}
        </Script>
        <ConsentScripts />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
