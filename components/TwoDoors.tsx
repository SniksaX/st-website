'use client'

import Link from 'next/link'

function ArrowIcon() {
  return (
    <svg width={11} height={11} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  )
}

const titleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-barbra)',
  fontWeight: 400,
  fontSize: 'clamp(24px,3vw,38px)',
  letterSpacing: '-0.02em',
  lineHeight: 1.05,
  color: 'var(--fg)',
}

export default function TwoDoors() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
      gap: 1,
      background: 'var(--border)',
      border: '1px solid var(--border)',
      borderRadius: 3,
      overflow: 'hidden',
    }}>
      {/* Public */}
      <div className="grid-cell" style={{ padding: 'clamp(24px,3.5vw,44px)', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <p style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--muted)' }}>
          Vous suivez ST
        </p>
        <h3 style={titleStyle}>Rejoindre le camp</h3>
        <p style={{ fontSize: 15, color: 'var(--fg2)', lineHeight: 1.6, textWrap: 'pretty' }}>
          Les formats, l&apos;équipe, le Discord, le kit révolutionnaire et la newsletter. Tout ce qu&apos;il faut pour suivre et s&apos;outiller.
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 'auto' }}>
          <a href="#media" className="btn-outline-st" style={{ padding: '12px 18px', fontSize: 12 }}>Le média</a>
          <Link href="/kit-revolutionnaire" className="btn-outline-st" style={{ padding: '12px 18px', fontSize: 12 }}>
            Kit révolutionnaire
          </Link>
        </div>
      </div>

      {/* Pro */}
      <div className="grid-cell" style={{ padding: 'clamp(24px,3.5vw,44px)', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <p style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--muted)' }}>
          Vous êtes un média, une asso, une rédaction
        </p>
        <h3 className="grad-text" style={titleStyle}>Produire avec nous</h3>
        <p style={{ fontSize: 15, color: 'var(--fg2)', lineHeight: 1.6, textWrap: 'pretty' }}>
          On adapte vos sujets et vos enquêtes aux formats verticaux : script, tournage, montage, sous-titrage, publication, reporting data à J+7.
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 'auto' }}>
          <Link href="/contact" className="btn-grad" style={{ padding: '12px 20px', fontSize: 12 }}>
            Nous écrire <ArrowIcon />
          </Link>
          <Link href="/kit-media" className="btn-outline-st" style={{ padding: '12px 18px', fontSize: 12 }}>
            Kit média
          </Link>
        </div>
      </div>
    </div>
  )
}
