'use client'

import Link from 'next/link'
import HelloAssoWidget from '@/components/HelloAssoWidget'
import DonProgress from '@/components/DonProgress'

const USAGE = [
  {
    title: 'Production radicale',
    desc: "Tournages, montages, reportages depuis l'intérieur des luttes.",
  },
  {
    title: 'Communauté organisée',
    desc: 'Modération, espaces sûrs, outils pédagogiques, Discord.',
  },
  {
    title: 'Autonomie totale',
    desc: 'Matériel, charges, sécurité numérique, et à terme des rémunérations.',
  },
]

const TAGS = ['Association loi 1901', 'Financement 100 % citoyen', 'Dons défiscalisés']

function ArrowIcon() {
  return (
    <svg width={12} height={12} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  )
}

export default function Campaign() {
  return (
    <div
      className="camp-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 'clamp(28px,4vw,56px)',
        alignItems: 'start',
      }}
    >
      {/* Colonne éditoriale */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <p style={{
          fontSize: 'clamp(18px,2.2vw,26px)',
          fontWeight: 600,
          color: 'var(--fg)',
          lineHeight: 1.3,
          letterSpacing: '-0.01em',
          textWrap: 'pretty',
        }}>
          1 000 personnes à 2 €/mois = un média qui ne doit rien à personne.
        </p>

        <p style={{ fontSize: 15, color: 'var(--fg2)', lineHeight: 1.65 }}>
          En septembre 2026, la monétisation TikTok = <strong style={{ color: 'var(--fg)' }}>20 €</strong>. Vingt euros pour un mois de tournages, d&apos;interviews, de montages. Ce n&apos;est pas un modèle viable.
        </p>

        <p style={{ fontSize: 15, color: 'var(--fg2)', lineHeight: 1.65 }}>
          Si ce contenu est gratuit, il n&apos;en est pas moins coûteux. Sans Transition, c&apos;est notre manière de faire de la politique autrement : radicale, queer, féministe, accessible.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {TAGS.map((tag) => (
            <span key={tag} className="tag-pill" style={{ fontSize: 11, padding: '5px 10px', color: 'var(--fg2)' }}>
              {tag}
            </span>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/don" className="btn-grad" style={{ padding: '15px 26px', fontSize: 12 }}>
            Faire un don <ArrowIcon />
          </Link>
          <Link href="/newsletter" className="btn-outline-st" style={{ padding: '15px 22px', fontSize: 12 }}>
            Newsletter
          </Link>
        </div>

        {/* Où va l'argent */}
        <div style={{
          border: '1px solid var(--border)',
          borderRadius: 3,
          background: 'var(--bg)',
          padding: 'clamp(20px,2.5vw,28px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          marginTop: 4,
        }}>
          <p style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--muted)' }}>
            Où va l&apos;argent
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 18 }}>
            {USAGE.map((item) => (
              <div key={item.title}>
                <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--fg)', marginBottom: 4 }}>{item.title}</p>
                <p style={{ fontSize: 13, color: 'var(--fg2)', lineHeight: 1.55 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="quote" style={{ fontSize: 14, color: 'var(--muted)' }}>
          &laquo;&nbsp;Soutenir Sans Transition, ce n&apos;est pas donner : c&apos;est prendre parti.&nbsp;&raquo;
        </p>
      </div>

      {/* Colonne don */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ border: '1px solid var(--border)', borderRadius: 3, background: 'var(--bg)', overflow: 'hidden' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            padding: '12px clamp(16px,2vw,20px)',
            borderBottom: '1px solid var(--border)',
          }}>
            <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--muted)' }}>
              Formulaire de don
            </span>
            <span style={{ fontSize: 11, color: 'var(--muted)' }}>HelloAsso</span>
          </div>
          <HelloAssoWidget />
        </div>

        <DonProgress goal={1000} />
      </div>
    </div>
  )
}
