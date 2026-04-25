'use client';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

type DonHeaderProps = {
  helloassoUrl: string;
};

export default function DonHeader({ helloassoUrl }: DonHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex items-center justify-between px-8 lg:px-12 py-4 w-full max-w-7xl">
        <Link href="/" className="flex items-center gap-3 group">
          <span
            className="text-xl font-extrabold tracking-tight text-foreground uppercase"
            style={{ fontFamily: 'var(--font-barbra)' }}
          >
            SANS TRANSITION
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={helloassoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-white font-semibold px-3 sm:px-4 h-9 text-xs sm:text-sm shadow-[0_8px_20px_rgba(168,85,247,0.25)] bg-[image:var(--grad-1)] hover:brightness-110 transition"
          >
            Rejoindre la Transition
          </a>
        </div>
      </div>
    </header>
  );
}

