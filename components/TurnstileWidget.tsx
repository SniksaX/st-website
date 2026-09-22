'use client'

import Script from 'next/script'
import { useCallback, useEffect, useRef } from 'react'

const DEVELOPMENT_SITE_KEY = '1x00000000000000000000AA'
const siteKey =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
  (process.env.NODE_ENV !== 'production' ? DEVELOPMENT_SITE_KEY : '')

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string
      action: string
      theme: 'auto'
      size: 'flexible'
      callback: (token: string) => void
      'error-callback': () => void
      'expired-callback': () => void
    }
  ) => string
  remove: (widgetId: string) => void
  reset: (widgetId: string) => void
}

declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

export default function TurnstileWidget({
  action,
  onToken,
  resetKey = 0,
}: {
  action: 'contact' | 'newsletter'
  onToken: (token: string) => void
  resetKey?: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const onTokenRef = useRef(onToken)
  const previousResetKey = useRef(resetKey)

  useEffect(() => {
    onTokenRef.current = onToken
  }, [onToken])

  const renderWidget = useCallback(() => {
    if (!siteKey || !containerRef.current || !window.turnstile || widgetIdRef.current) return

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      action,
      theme: 'auto',
      size: 'flexible',
      callback: (token) => onTokenRef.current(token),
      'error-callback': () => onTokenRef.current(''),
      'expired-callback': () => onTokenRef.current(''),
    })
  }, [action])

  useEffect(() => {
    renderWidget()
    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
    }
  }, [renderWidget])

  useEffect(() => {
    if (previousResetKey.current === resetKey) return
    previousResetKey.current = resetKey
    onTokenRef.current('')
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current)
    }
  }, [resetKey])

  if (!siteKey) {
    return (
      <p role="alert" style={{ fontSize: 12, color: '#ef4444' }}>
        La protection anti-spam n’est pas configurée.
      </p>
    )
  }

  return (
    <>
      <Script
        id="cloudflare-turnstile"
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={renderWidget}
      />
      <div ref={containerRef} style={{ width: '100%', minHeight: 65 }} />
    </>
  )
}
