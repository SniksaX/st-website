// Types
export type LogoItem = { src: string; label: string; w: number; h: number };
export type TeamItem = { src: string; name: string; role: string; file: string };
export type SocialItem = { href: string; label: string };
export type ColorVar = { name: string; cssVar: string; isGradient?: boolean };

// Constantes partagées
export const KIT_PDF =
  "/Sans%20Transition%20%E2%80%93%20Kit%20M%C3%A9dia%20Septembre%202025.pdf";

export const LOGOS: readonly LogoItem[] = [
  { src: "/logo.png", label: "Logo glow (PNG)", w: 512, h: 512 },
  { src: "/logo-flat.png", label: "Logo flat (PNG)", w: 1024, h: 256 },
  { src: "/logo-fusee.png", label: "Symbole fusée (PNG)", w: 830, h: 300 },
] as const;

export const TEAM: readonly TeamItem[] = [
  { src: "/hedi.png", name: "Hedji", role: "Fondateur", file: "/hedi.png" },
  { src: "/amandine.png", name: "Amandine", role: "Chroniqueuse", file: "/amandine.png" },
  { src: "/louis.png", name: "Lucho", role: "Chroniqueur", file: "/louis.png" },
] as const;

export const SOCIALS: readonly SocialItem[] = [
  { href: "https://youtube.com/@SansTransitionMedia", label: "YouTube" },
  { href: "https://tiktok.com/@sanstransition", label: "TikTok" },
  { href: "https://twitch.tv/sans_transition", label: "Twitch" },
  { href: "https://x.com/sanstransition_", label: "X / Twitter" },
  { href: "https://instagram.com/sanstransition__", label: "Instagram" },
] as const;

export const COLOR_VARS: readonly ColorVar[] = [
  { name: "Dégradé principal", cssVar: "--grad-1", isGradient: true },
  { name: "Accent", cssVar: "--brand" },
  { name: "Accent 600", cssVar: "--brand-600" },
  { name: "Accent 300", cssVar: "--brand-300" },
] as const;
