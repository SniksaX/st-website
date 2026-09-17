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

const SITE_URL = "https://sanstransition.fr";
const SITE_DESCRIPTION =
  "Sans Transition est un média radical, indépendant et associatif, par et pour les minorités. On raconte l'actualité depuis les premiers et premières concerné·es : Fokus, Hédito, interviews, terrain.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sans Transition, média radical par et pour les minorités",
    template: "%s | Sans Transition",
  },
  description: SITE_DESCRIPTION,
  applicationName: "Sans Transition",
  keywords: [
    "Sans Transition",
    "média indépendant",
    "média radical",
    "gauche radicale",
    "féminisme",
    "antiracisme",
    "écosocialisme",
    "éducation populaire",
  ],
  authors: [{ name: "Sans Transition" }],
  creator: "Sans Transition",
  publisher: "Sans Transition",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: "Sans Transition",
    title: "Sans Transition, média radical par et pour les minorités",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Sans Transition, média radical, indépendant, par et pour les minorités",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sanstransition_",
    creator: "@sanstransition_",
    title: "Sans Transition, média radical par et pour les minorités",
    description: SITE_DESCRIPTION,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
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
