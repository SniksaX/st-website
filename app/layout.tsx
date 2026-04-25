import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import ConsentScripts from '@/components/ConsentScripts';
import CookieBanner from '@/components/CookieBanner';

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const barbra = localFont({
  src: "./fonts/Barbra-Regular.ttf",
  variable: "--font-barbra",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sans Transition",
  description: "Média militant, pédagogique et engagé — par et pour les minorités.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${spaceGrotesk.variable} ${barbra.variable} antialiased`}>
        <ConsentScripts />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
