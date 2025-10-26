'use client';
import { useEffect, useState } from 'react';
import { defaultDenied, hasChoice, readConsent, writeConsent, type ConsentStatus } from '@/lib/consent';

type ConsentValue = 'granted' | 'denied';

type GtagConsentPayload = {
  ad_user_data: ConsentValue;
  ad_personalization: ConsentValue;
  ad_storage: ConsentValue;
  analytics_storage: ConsentValue;
  personalization_storage: ConsentValue;
  functionality_storage: ConsentValue;
  security_storage: ConsentValue;
};

declare global {
  interface Window {
    gtag?: (
      command: 'consent',
      action: 'update',
      params: GtagConsentPayload
    ) => void;
  }
}

const toVal = (s: ConsentStatus): ConsentValue => (s === 'granted' ? 'granted' : 'denied');

/** Pure mapping → easier to test */
export const mapConsentToGtagPayload = (
  a: ConsentStatus,
  m: ConsentStatus
): GtagConsentPayload => ({
  ad_user_data:            toVal(m),
  ad_personalization:      toVal(m),
  ad_storage:              toVal(m),
  analytics_storage:       toVal(a),
  personalization_storage: toVal(m),
  functionality_storage:   'granted', // nécessaire
  security_storage:        'granted', // nécessaire
});

export default function CookieBanner() {
  const [open, setOpen] = useState(false);
  const [custom, setCustom] = useState(false);
  const [analytics, setAnalytics] = useState<ConsentStatus>('denied');
  const [marketing, setMarketing] = useState<ConsentStatus>('denied');

  useEffect(() => {
    // ouvre le bandeau si pas de choix
    setOpen(!hasChoice());
    const c = readConsent();
    if (c) {
      setAnalytics(c.analytics);
      setMarketing(c.marketing);
    }

    // écoute l’event "reset"
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

    // Update Google Consent Mode (only if gtag is present in the browser)
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', mapConsentToGtagPayload(a, m));
    }

    window.dispatchEvent(new CustomEvent('st:consent:changed')); // <— important
    setOpen(false);
    console.info('[consent] updated →', consent);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50">
      <div className="mx-auto max-w-4xl rounded-t-2xl border border-border bg-card/95 backdrop-blur p-4 sm:p-5 shadow-2xl">
        <div className="flex flex-col gap-3">
          <h2 className="text-lg text-foreground font-semibold">Cookies & respect de ta vie privée</h2>
          <p className="text-sm text-muted-foreground">
            On utilise des cookies nécessaires au fonctionnement du site. Avec ton accord, on active aussi
            des cookies d’<strong>analytics</strong> pour comprendre notre audience et des cookies de <strong>marketing</strong> pour nos campagnes.
            Par défaut, <em>tout est désactivé</em>.
          </p>

          {!custom ? (
            <div className="flex flex-wrap gap-2">
              <button
                className="rounded-xl bg-muted text-foreground px-4 py-2 font-medium hover:bg-muted/80"
                onClick={() => applyConsent('granted','granted')}
              >
                Tout accepter
              </button>
              <button
                className="rounded-xl bg-muted px-4 py-2 font-medium hover:bg-muted/80 text-foreground"
                onClick={() => applyConsent('denied','denied')}
              >
                Tout refuser
              </button>
              <button
                className="rounded-xl border border-border px-4 py-2 font-medium hover:bg-muted text-foreground"
                onClick={() => setCustom(true)}
              >
                Personnaliser
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex items-center gap-3 rounded-xl border border-border p-3">
                  <input
                    type="checkbox"
                    className="size-4"
                    checked={analytics === 'granted'}
                    onChange={(e) => setAnalytics(e.target.checked ? 'granted' : 'denied')}
                  />
                  <div>
                    <div className="font-medium text-foreground">Analytics</div>
                    <div className="text-sm text-muted-foreground">Mesure d’audience anonyme.</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 rounded-xl border border-border p-3">
                  <input
                    type="checkbox"
                    className="size-4"
                    checked={marketing === 'granted'}
                    onChange={(e) => setMarketing(e.target.checked ? 'granted' : 'denied')}
                  />
                  <div>
                    <div className="font-medium text-foreground">Marketing</div>
                    <div className="text-sm text-muted-foreground">Publicité & retargeting.</div>
                  </div>
                </label>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  className="rounded-xl bg-muted text-foreground px-4 py-2 font-medium hover:bg-muted/80"
                  onClick={() => applyConsent(analytics, marketing)}
                >
                  Enregistrer
                </button>
                <button
                  className="rounded-xl bg-muted px-4 py-2 font-medium hover:bg-muted/80 text-foreground"
                  onClick={() => setCustom(false)}
                >
                  Retour
                </button>
                <button
                  className="ml-auto text-sm underline underline-offset-4 text-muted-foreground hover:text-foreground"
                  onClick={() => applyConsent('denied','denied')}
                >
                  Refuser tout
                </button>
              </div>
            </div>
          )}

          <p className="text-xs text-muted-foreground">
            Tu peux changer d’avis à tout moment via « Gérer mes cookies » en bas de page.
          </p>
        </div>
      </div>
    </div>
  );
}
