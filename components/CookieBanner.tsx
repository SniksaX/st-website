'use client';
import { useEffect, useState } from 'react';
import { defaultDenied, hasChoice, readConsent, writeConsent, type ConsentStatus } from '@/lib/consent';

type ConsentValue = 'granted' | 'denied';
type GtagConsentPayload = {
  ad_user_data: ConsentValue; ad_personalization: ConsentValue;
  ad_storage: ConsentValue; analytics_storage: ConsentValue;
  personalization_storage: ConsentValue; functionality_storage: ConsentValue;
  security_storage: ConsentValue;
};
declare global {
  interface Window { gtag?: (command: 'consent', action: 'update', params: GtagConsentPayload) => void; }
}

const toVal = (s: ConsentStatus): ConsentValue => (s === 'granted' ? 'granted' : 'denied');
export const mapConsentToGtagPayload = (a: ConsentStatus, m: ConsentStatus): GtagConsentPayload => ({
  ad_user_data: toVal(m), ad_personalization: toVal(m), ad_storage: toVal(m),
  analytics_storage: toVal(a), personalization_storage: toVal(m),
  functionality_storage: 'granted', security_storage: 'granted',
});

const GRAD = 'linear-gradient(90deg, oklch(0.72 0.27 290) 0%, oklch(0.78 0.22 330) 48%, oklch(0.85 0.25 40) 100%)';

export default function CookieBanner() {
  const [open, setOpen]         = useState(false);
  const [custom, setCustom]     = useState(false);
  const [analytics, setAnalytics] = useState<ConsentStatus>('denied');
  const [marketing, setMarketing] = useState<ConsentStatus>('denied');

  useEffect(() => {
    setOpen(!hasChoice());
    const c = readConsent();
    if (c) { setAnalytics(c.analytics); setMarketing(c.marketing); }
    const onReset = () => setOpen(true);
    if (typeof window !== 'undefined') {
      window.addEventListener('st:consent:reset', onReset);
      return () => window.removeEventListener('st:consent:reset', onReset);
    }
    return;
  }, []);

  const applyConsent = (a: ConsentStatus, m: ConsentStatus) => {
    const consent = { ...defaultDenied(), analytics: a, marketing: m, ts: Date.now() };
    writeConsent(consent);
    if (typeof window !== 'undefined' && typeof window.gtag === 'function')
      window.gtag('consent', 'update', mapConsentToGtagPayload(a, m));
    window.dispatchEvent(new CustomEvent('st:consent:changed'));
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div style={{
      position: 'fixed', inset: '0 0 0 0', bottom: 0, left: 0, right: 0,
      zIndex: 9990, display: 'flex', alignItems: 'flex-end', pointerEvents: 'none',
    }}>
      <div style={{
        width: '100%', pointerEvents: 'auto',
        background: '#0a0a14', borderTop: '1px solid #1c1c2c',
        fontFamily: "'Space Grotesk', sans-serif",
      }}>
        {/* gradient top line */}
        <div style={{ height: 2, background: GRAD }} />

        <div style={{ maxWidth: 960, margin: '0 auto', padding: '20px clamp(16px,4vw,40px)' }}>
          {!custom ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
              {/* Text */}
              <div style={{ flex: 1, minWidth: 260 }}>
                <p style={{ fontSize: 12, color: '#a8a4b0', lineHeight: 1.65, margin: 0 }}>
                  On utilise des cookies nécessaires au fonctionnement du site.
                  Avec ton accord, on active aussi des cookies d'<strong style={{ color: '#f0ede8', fontWeight: 600 }}>analytics</strong> et
                  de <strong style={{ color: '#f0ede8', fontWeight: 600 }}>marketing</strong>.
                  Par défaut, tout est désactivé.
                </p>
              </div>
              {/* Buttons */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', flexShrink: 0 }}>
                <button
                  onClick={() => applyConsent('granted', 'granted')}
                  style={{ background: GRAD, color: '#fff', border: 'none', borderRadius: 2, padding: '9px 18px', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', cursor: 'pointer', fontFamily: 'inherit' }}
                >
                  Tout accepter
                </button>
                <button
                  onClick={() => applyConsent('denied', 'denied')}
                  style={{ background: 'none', color: '#a8a4b0', border: '1px solid #1c1c2c', borderRadius: 2, padding: '9px 18px', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', cursor: 'pointer', fontFamily: 'inherit', transition: 'border-color .15s, color .15s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#3a3a54'; e.currentTarget.style.color = '#f0ede8'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#1c1c2c'; e.currentTarget.style.color = '#a8a4b0'; }}
                >
                  Tout refuser
                </button>
                <button
                  onClick={() => setCustom(true)}
                  style={{ background: 'none', border: 'none', color: '#5a5a72', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em', cursor: 'pointer', fontFamily: 'inherit', padding: '9px 4px', transition: 'color .15s' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#a8a4b0'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#5a5a72'; }}
                >
                  Personnaliser
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 8 }}>
                {[
                  { key: 'analytics' as const, label: 'Analytics', desc: "Mesure d'audience anonyme.", val: analytics, set: setAnalytics },
                  { key: 'marketing' as const, label: 'Marketing', desc: 'Publicité & retargeting.', val: marketing, set: setMarketing },
                ].map(item => (
                  <label key={item.key} style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#08080e', border: '1px solid #1c1c2c', borderRadius: 2, padding: '12px 14px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={item.val === 'granted'}
                      onChange={e => item.set(e.target.checked ? 'granted' : 'denied')}
                      style={{ width: 14, height: 14, accentColor: 'oklch(0.78 0.22 330)', cursor: 'pointer', flexShrink: 0 }}
                    />
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#f0ede8', marginBottom: 2 }}>{item.label}</div>
                      <div style={{ fontSize: 11, color: '#5a5a72' }}>{item.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                <button
                  onClick={() => applyConsent(analytics, marketing)}
                  style={{ background: GRAD, color: '#fff', border: 'none', borderRadius: 2, padding: '9px 18px', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', cursor: 'pointer', fontFamily: 'inherit' }}
                >
                  Enregistrer
                </button>
                <button
                  onClick={() => setCustom(false)}
                  style={{ background: 'none', color: '#a8a4b0', border: '1px solid #1c1c2c', borderRadius: 2, padding: '9px 18px', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', cursor: 'pointer', fontFamily: 'inherit' }}
                >
                  Retour
                </button>
                <button
                  onClick={() => applyConsent('denied', 'denied')}
                  style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#5a5a72', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.18em', cursor: 'pointer', fontFamily: 'inherit', transition: 'color .15s' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#a8a4b0'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#5a5a72'; }}
                >
                  Refuser tout
                </button>
              </div>
            </div>
          )}

          <p style={{ fontSize: 10, color: '#3a3a54', marginTop: 12, marginBottom: 0 }}>
            Tu peux changer d&apos;avis à tout moment via « Gérer mes cookies » en bas de page.
          </p>
        </div>
      </div>
    </div>
  );
}
