'use client'

import HelloAssoWidget from '@/components/HelloAssoWidget'
import DonProgress from '@/components/DonProgress'

const DON_URL = 'https://www.helloasso.com/associations/sans-transition/formulaires/1'

const REASONS = [
  {
    n: '01',
    title: 'Production radicale',
    desc: 'Tu finances tournages, montages, reportages — pour raconter les luttes depuis l\'intérieur, pas depuis les plateaux télé.',
  },
  {
    n: '02',
    title: 'Communauté organisée',
    desc: 'Modération, espaces sûrs, outils pédagogiques, Discord et ressources pour tenir sur la durée.',
  },
  {
    n: '03',
    title: 'Autonomie totale',
    desc: 'Salaires dignes, charges, matériel, sécurité numérique. L\'indépendance se finance, sinon elle n\'existe pas.',
  },
]

function ArrowIcon() {
  return (
    <svg width={12} height={12} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
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
        gridTemplateColumns: '1.3fr 1fr 1fr',
        gap: 40,
        alignItems: 'start',
      }}
    >

      {/* — Col 1: editorial statement — */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="grad-line" />
          <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.28em', color: 'var(--muted)' }}>
            Campagne de soutien
          </span>
        </div>

        <p
          style={{
            fontSize: 'clamp(13px, 1.2vw, 15px)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--fg)',
            lineHeight: 1.5,
          }}
        >
          1 000 personnes à 2 €/mois = un média qui ne doit rien à personne.
        </p>

        <p className="quote" style={{ fontSize: 15 }}>
          Il y a des médias pour les patrons, d&apos;autres pour les fachos. Sans Transition, c&apos;est un média par et pour les minorités — né à Paris en 2025 pour celles et ceux qu&apos;on laisse hors-champ.
        </p>

        <p style={{ fontSize: 14, color: 'var(--fg2)', lineHeight: 1.65 }}>
          En septembre, la monétisation TikTok = <strong style={{ color: 'var(--fg)' }}>20 €</strong>. Vingt euros pour un mois de tournages, d&apos;interviews, de montages, de nuits blanches. Ce n&apos;est pas un modèle viable.
        </p>

        <p style={{ fontSize: 14, color: 'var(--fg2)', lineHeight: 1.65 }}>
          Si ce contenu est gratuit, il n&apos;en est pas moins coûteux. Sans Transition, c&apos;est pas juste un média : c&apos;est notre manière de faire de la politique autrement — radicale, queer, féministe, accessible.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {['Association loi 1901', 'Financement 100 % citoyen', 'Pas de pubs, pas de milliardaires', 'Dons défiscalisés'].map((label) => (
            <span key={label} className="tag-pill">{label}</span>
          ))}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <a
            href={DON_URL}
            target="_blank"
            rel="noreferrer"
            className="btn-grad"
            style={{ padding: '13px 24px', fontSize: 12 }}
          >
            Soutenir (HelloAsso) <ArrowIcon />
          </a>
        </div>

        <p style={{ fontSize: 13, color: 'var(--muted)', fontStyle: 'italic', lineHeight: 1.6 }}>
          &ldquo;Soutenir Sans Transition, ce n&apos;est pas donner : c&apos;est prendre parti.&rdquo; — Hedji
        </p>

        <div style={{
          padding: '12px 16px',
          border: '1px solid var(--border)',
          borderRadius: 3,
          background: 'var(--surface)',
          display: 'flex',
          alignItems: 'flex-start',
          gap: 10,
        }}>
          <span style={{ fontSize: 16, lineHeight: 1, flexShrink: 0 }}>🧾</span>
          <p style={{ fontSize: 12, color: 'var(--fg2)', lineHeight: 1.6 }}>
            <strong style={{ color: 'var(--fg)' }}>Dons défiscalisés.</strong> En tant qu&apos;association reconnue d&apos;intérêt général, Sans Transition émet des reçus fiscaux. Un don de 2 €/mois vous revient à <strong style={{ color: 'var(--fg)' }}>0,74 € réels</strong> après réduction d&apos;impôt de 66 %.
          </p>
        </div>
      </div>

      {/* — Col 2: reasons — */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: 'var(--border)', borderRadius: 3, overflow: 'hidden', border: '1px solid var(--border)' }}>
        {REASONS.map((r) => (
          <div key={r.n} className="grid-cell" style={{ padding: 'clamp(20px,2.5vw,28px)' }}>
            <div style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--border2)', marginBottom: 12 }}>{r.n}</div>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--fg)', marginBottom: 8 }}>{r.title}</h3>
            <p style={{ fontSize: 13, color: 'var(--fg2)', lineHeight: 1.6 }}>{r.desc}</p>
          </div>
        ))}
        <div className="grid-cell" style={{ padding: 'clamp(20px,2.5vw,28px)' }}>
          <p style={{ fontSize: 13, color: 'var(--fg2)', lineHeight: 1.6 }}>
            La Transition, c&apos;est le passage collectif de la survie à l&apos;indépendance.{' '}
            <strong style={{ color: 'var(--fg)' }}>1 000 personnes à 2 €/mois</strong>, et on ne doit rien à aucun milliardaire.
          </p>
        </div>
      </div>

      {/* — Col 3: HelloAsso + progress — */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <HelloAssoWidget />
        <DonProgress goal={1000} />
      </div>

    </div>
  )
}
