import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
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
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} ${barbra.variable} antialiased`}>
        <ConsentScripts />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
