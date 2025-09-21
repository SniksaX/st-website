'use client';
import Script from 'next/script';
import { readConsent } from '@/lib/consent';
import { useEffect, useState } from 'react';

const GA_MEASUREMENT_ID = 'G-JDJCS08NYT'; // ← ton ID réel ici

export default function ConsentScripts() {
  const [canAnalytics, setCanAnalytics] = useState(false);

  useEffect(() => {
    const sync = () => {
      const c = readConsent();
      setCanAnalytics(!!c && c.analytics === 'granted');
    };
    sync();
    window.addEventListener('st:consent:changed', sync);
    return () => window.removeEventListener('st:consent:changed', sync);
  }, []);

  return (
    <>
      {/* Defaults: tout DENIED tant que l’usager n’a rien dit */}
      <Script id="consent-defaults" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            ad_storage: 'denied',
            analytics_storage: 'denied',
            personalization_storage: 'denied',
            functionality_storage: 'granted',
            security_storage: 'granted'
          });
        `}
      </Script>

      {/* On ne CHARGE GA que si analytics = granted */}
      {canAnalytics && GA_MEASUREMENT_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}
    </>
  );
}
