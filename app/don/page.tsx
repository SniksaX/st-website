'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DonProgress from '@/components/DonProgress'
import HelloAssoWidget from '@/components/HelloAssoWidget'
import FacesMosaic from '@/components/FacesMosaic'

function BackIcon() {
  return (
    <svg width={12} height={12} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M13 8H3M7 4l-4 4 4 4" />
    </svg>
  )
}
function ShieldIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}
function HeartIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}
function EuroIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M4 10h12M4 14h12M19.5 8.27A6.97 6.97 0 0 0 12 5C8.13 5 5 8.13 5 12s3.13 7 7 7a6.97 6.97 0 0 0 7.5-3.73" />
    </svg>
  )
}

function ReceiptIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
    </svg>
  )
}

const TRUST_BADGES = [
  { icon: <ShieldIcon />, label: 'Association loi 1901' },
  { icon: <EuroIcon />,   label: 'Financement 100 % citoyen' },
  { icon: <HeartIcon />,  label: "Pas de pubs, pas d'actionnaires" },
  { icon: <ReceiptIcon />, label: 'Dons défiscalisés — reçu fiscal' },
]

const FAQ = [
  {
    q: 'Dons défiscalisés ?',
    a: "Oui. Sans Transition est reconnue d'intérêt général : vos dons ouvrent droit à une réduction d'impôt de 66 % du montant versé. Un don de 2 €/mois vous revient à 0,74 € réels (24 €/an → 7,92 € après réduction). Un reçu fiscal vous est envoyé automatiquement.",
  },
  {
    q: 'Paiement sécurisé ?',
    a: 'Les dons sont traités par HelloAsso (HTTPS, 3-D Secure). Nous ne stockons pas vos données bancaires.',
  },
  {
    q: 'RGPD et données personnelles',
    a: 'Nous collectons le minimum nécessaire pour les reçus fiscaux et la gestion des dons, conformément au RGPD.',
  },
  {
    q: 'Résilier un don mensuel',
    a: 'Vous pouvez modifier ou arrêter votre soutien à tout moment via votre espace HelloAsso.',
  },
]

export default function DonPage() {
  useEffect(() => {
    const els = document.querySelectorAll('.rv')
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('on') }),
      { threshold: 0.08 }
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--fg)', minHeight: '100vh' }}>
      <Header />

      {/* Page header */}
      <div style={{
        padding: 'calc(var(--hh) + clamp(40px,6vw,80px)) clamp(16px,4vw,48px) 0',
        maxWidth: 1440,
        margin: '0 auto',
      }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32 }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--muted)', textDecoration: 'none' }}>
            <BackIcon /> Accueil
          </Link>
          <span style={{ fontSize: 11, color: 'var(--border2)' }}>/</span>
          <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--fg2)' }}>Soutenir</span>
        </div>

        {/* Title block */}
        <div style={{
          paddingBottom: 24,
          marginBottom: 0,
          borderBottom: '1px solid var(--border)',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <span className="grad-line" />
                <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.28em', color: 'var(--muted)' }}>
                  Campagne de soutien
                </span>
              </div>
              <h1 style={{ fontSize: 'clamp(32px,5vw,64px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 0.95 }}>
                <span style={{ WebkitTextStroke: '1.5px var(--fg)', WebkitTextFillColor: 'transparent', display: 'block' }}>L&apos;indépendance</span>
                <span className="grad-text" style={{ display: 'block' }}>ou rien.</span>
              </h1>
            </div>
            <p style={{ fontSize: 14, color: 'var(--fg2)', maxWidth: 360, lineHeight: 1.65, textAlign: 'right' }}>
              1 000 personnes × 2 €/mois = un média libre et stable. Sans pub, sans actionnaire, sans compromis.
            </p>
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div style={{
        maxWidth: 1440,
        margin: '0 auto',
        padding: 'clamp(48px,6vw,80px) clamp(16px,4vw,48px)',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 380px',
        gap: 'clamp(32px,4vw,64px)',
        alignItems: 'start',
      }}
        className="don-grid"
      >
        {/* Left: content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>

          {/* Trust badges */}
          <div className="rv" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 1,
            background: 'var(--border)',
            border: '1px solid var(--border)',
            borderRadius: 3,
            overflow: 'hidden',
            marginBottom: 48,
          }}>
            {TRUST_BADGES.map((b) => (
              <div key={b.label} className="grid-cell" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ color: 'var(--muted)' }}>{b.icon}</span>
                <span style={{ fontSize: 12, color: 'var(--fg2)', letterSpacing: '0.02em' }}>{b.label}</span>
              </div>
            ))}
          </div>

          {/* Progress */}
          <div className="rv" style={{ marginBottom: 48 }}>
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <span className="grad-line" />
                <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.28em', color: 'var(--muted)' }}>
                  Objectif
                </span>
              </div>
            </div>
            <DonProgress goal={1000} />
          </div>

          {/* Ticker strip */}
          <div className="rv" style={{
            border: '1px solid var(--border)',
            borderRadius: 3,
            overflow: 'hidden',
            marginBottom: 48,
            background: 'var(--surface)',
            padding: '14px 0',
          }}>
            <div style={{
              display: 'flex',
              gap: 48,
              whiteSpace: 'nowrap',
              animation: 'scroll-x 18s linear infinite',
              paddingLeft: 32,
            }}>
              {['INDÉPENDANCE', 'COMMUNAUTÉ', 'JUSTICE SOCIALE', 'FÉMINISME', 'ANTIRACISME', 'ACCESSIBILITÉ', 'ÉDUC POP',
                'INDÉPENDANCE', 'COMMUNAUTÉ', 'JUSTICE SOCIALE', 'FÉMINISME', 'ANTIRACISME', 'ACCESSIBILITÉ', 'ÉDUC POP'].map((t, i) => (
                <span key={i} style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: t === 'INDÉPENDANCE' ? 'transparent' : 'var(--fg2)',
                  ...(t === 'INDÉPENDANCE' ? { background: 'var(--grad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' } : {}),
                }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Pourquoi on existe */}
          <div className="rv" style={{ marginBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span className="grad-line" />
              <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.28em', color: 'var(--muted)' }}>
                Pourquoi on existe
              </span>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 1,
              background: 'var(--border)',
              border: '1px solid var(--border)',
              borderRadius: 3,
              overflow: 'hidden',
            }}
              className="text-grid-2"
            >
              <div className="grid-cell" style={{ padding: 'clamp(20px,2.5vw,32px)' }}>
                <p style={{ fontSize: 14, color: 'var(--fg2)', lineHeight: 1.7 }}>
                  Sans Transition, c&apos;est des invité·es, des analyses féministes, anticoloniales, historiques. C&apos;est du terrain, des micros tendus à celles et ceux qu&apos;on n&apos;écoute jamais. C&apos;est un média qui relie la rage et la tendresse, la lutte et la réflexion.
                </p>
              </div>
              <div className="grid-cell" style={{ padding: 'clamp(20px,2.5vw,32px)' }}>
                <p style={{ fontSize: 14, color: 'var(--fg2)', lineHeight: 1.7 }}>
                  En 2026, on veut aller plus loin : <strong style={{ color: 'var(--fg)' }}>lancer un grand projet de reportages, libres et populaires</strong>, pour raconter les luttes de l&apos;intérieur et montrer les nouvelles formes d&apos;organisation politique dans les quartiers populaires.
                </p>
              </div>
            </div>
          </div>

          {/* Pourquoi on a besoin de vous */}
          <div className="rv" style={{ marginBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span className="grad-line" />
              <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.28em', color: 'var(--muted)' }}>
                Pourquoi on a besoin de vous
              </span>
            </div>
            <div style={{
              border: '1px solid var(--border)',
              borderRadius: 3,
              background: 'var(--surface)',
              padding: 'clamp(24px,3vw,40px)',
            }}>
              <p style={{ fontSize: 14, color: 'var(--fg2)', lineHeight: 1.7, marginBottom: 16 }}>
                En septembre, avec la monétisation TikTok, on a gagné <strong style={{ color: 'var(--fg)' }}>20 €</strong>. Vingt euros pour un mois de tournages, d&apos;interviews, de montages, de nuits blanches. Ce n&apos;est pas assez pour vivre. Pas assez pour continuer.
              </p>
              <p style={{ fontSize: 14, color: 'var(--fg2)', lineHeight: 1.7 }}>
                Au centre de ce média, il y a moi, Hedji. Si ce contenu est gratuit, il n&apos;en est pas moins coûteux. Et pourtant je continue. Parce que j&apos;y crois. Parce que Sans Transition, ce n&apos;est pas juste un média : c&apos;est une manière de faire de la politique autrement.
              </p>
            </div>
          </div>

          {/* L'invitation */}
          <div className="rv" style={{ marginBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span className="grad-line" />
              <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.28em', color: 'var(--muted)' }}>
                Rejoindre la communauté
              </span>
            </div>
            <div style={{
              border: '1px solid var(--border)',
              borderRadius: 3,
              background: 'var(--surface)',
              padding: 'clamp(24px,3vw,40px)',
            }}>
              <p style={{ fontSize: 14, color: 'var(--fg2)', lineHeight: 1.7, marginBottom: 16 }}>
                Parce que Sans Transition, ce n&apos;est pas « mon » média. C&apos;est le nôtre. Chaque don, chaque partage, chaque geste fait partie d&apos;un projet collectif. Notre travail restera en accès libre.
              </p>
              <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--fg)', lineHeight: 1.65, marginBottom: 16 }}>
                Devenez l&apos;une des 1000 personnes qui feront la différence. Soutenez notre développement, investissez dans Sans Transition maintenant.
              </p>
              <p style={{ fontSize: 12, color: 'var(--muted)', fontStyle: 'italic' }}>
                Toi aussi, transitionne. C&apos;était Hedji pour ST. Bisous mes vies.
              </p>
            </div>
          </div>

          {/* FAQ */}
          <div className="rv" style={{ marginBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span className="grad-line" />
              <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.28em', color: 'var(--muted)' }}>
                FAQ
              </span>
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              background: 'var(--border)',
              border: '1px solid var(--border)',
              borderRadius: 3,
              overflow: 'hidden',
            }}>
              {FAQ.map((item) => (
                <div key={item.q} className="grid-cell" style={{ padding: 'clamp(16px,2vw,24px) clamp(20px,2.5vw,32px)' }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--fg)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>{item.q}</p>
                  <p style={{ fontSize: 13, color: 'var(--fg2)', lineHeight: 1.65 }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Les visages */}
          <div className="rv">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span className="grad-line" />
              <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.28em', color: 'var(--muted)' }}>
                Les visages de ST
              </span>
            </div>
            <FacesMosaic fileUrl="/json_don.txt" variant="static" />
          </div>

        </div>

        {/* Right: sticky widget */}
        <div style={{ position: 'sticky', top: 'calc(var(--hh) + 24px)' }} className="don-sidebar">
          <div style={{
            border: '1px solid var(--border)',
            borderRadius: 3,
            background: 'var(--surface)',
            padding: 'clamp(16px,2vw,24px)',
            marginBottom: 16,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span className="grad-line" />
              <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.28em', color: 'var(--muted)' }}>
                Faire un don
              </span>
            </div>
            <HelloAssoWidget className="don-widget" />
            <p style={{ marginTop: 12, fontSize: 11, color: 'var(--muted)', textAlign: 'center' }}>
              Paiement sécurisé via HelloAsso. Aucune donnée bancaire stockée par Sans Transition.
            </p>
            <div style={{
              marginTop: 10,
              padding: '10px 14px',
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: 2,
              display: 'flex',
              gap: 8,
            
              alignItems: 'flex-start',
            }}>
              <span style={{ fontSize: 13, flexShrink: 0 }}>🧾</span>
              <p style={{ fontSize: 11, color: 'var(--fg2)', lineHeight: 1.6 }}>
                <strong style={{ color: 'var(--fg)' }}>Don défiscalisé.</strong> Réduction d&apos;impôt de 66 % — 2 €/mois vous revient à <strong style={{ color: 'var(--fg)' }}>0,74 € réels</strong>. Reçu fiscal automatique.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .don-grid { grid-template-columns: 1fr !important; }
          .don-sidebar { position: static !important; }
          .text-grid-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Footer />
    </div>
  )
}
