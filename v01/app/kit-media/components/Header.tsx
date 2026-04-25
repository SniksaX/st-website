import Image from "next/image";
import Link from "next/link";
import { Download, Mail } from "lucide-react";

const KIT_PDF = "/Sans%20Transition%20%E2%80%93%20Kit%20M%C3%A9dia%20Septembre%202025.pdf";

export default function Header() {
  const quickNav = [
    { href: "#presentation", label: "Présentation" },
    { href: "#logos", label: "Logos" },
    { href: "#couleurs", label: "Couleurs" },
    { href: "#presse", label: "Photos presse" },
    { href: "#contact", label: "Contacts" },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="relative inline-flex h-5 w-5 overflow-hidden rounded-md ring-1 ring-border">
            <Image src="/logo.png" alt="Sans Transition" fill className="object-contain" />
          </span>
          <span className="hidden sm:inline">Sans Transition</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {quickNav.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-sm text-foreground/80 hover:text-foreground px-3 py-1.5 rounded-lg hover:bg-muted transition"
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href={KIT_PDF}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-3 h-9 text-neutral-900 font-semibold hover:bg-neutral-100"
          >
            <Download className="size-4" />
            <span className="hidden sm:inline">Kit (PDF)</span>
          </Link>
          <a
            href="mailto:contact@sanstransition.fr"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3 h-9 font-medium hover:bg-muted"
          >
            <Mail className="size-4" />
            <span className="hidden sm:inline">Contacter</span>
          </a>
        </div>
      </div>
    </header>
  );
}
