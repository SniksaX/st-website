'use client'

import Script from 'next/script'
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react'

const DEVELOPMENT_SITE_KEY = '1x00000000000000000000BB'
const siteKey =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
  (process.env.NODE_ENV !== 'production' ? DEVELOPMENT_SITE_KEY : '')

type PendingChallenge = {
  resolve: (token: string) => void
  reject: (error: Error) => void
}

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string
      action: string
      appearance: 'interaction-only'
      execution: 'execute'
      responseField: false
      callback: (token: string) => void
      'error-callback': () => void
      'expired-callback': () => void
      'timeout-callback': () => void
      'unsupported-callback': () => void
    }
  ) => string
  execute: (widgetId: string) => void
  remove: (widgetId: string) => void
  reset: (widgetId: string) => void
}

declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

export type TurnstileWidgetHandle = {
  execute: () => Promise<string>
  reset: () => void
}

const TurnstileWidget = forwardRef<TurnstileWidgetHandle, {
  action: 'contact' | 'newsletter'
  onReady?: (ready: boolean) => void
}>(function TurnstileWidget({ action, onReady }, ref) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const pendingRef = useRef<PendingChallenge | null>(null)
  const onReadyRef = useRef(onReady)

  useEffect(() => {
    onReadyRef.current = onReady
  }, [onReady])

  const rejectPending = useCallback((message: string) => {
    pendingRef.current?.reject(new Error(message))
    pendingRef.current = null
  }, [])

  const reset = useCallback(() => {
    rejectPending('Vérification anti-spam réinitialisée.')
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current)
    }
  }, [rejectPending])

  useImperativeHandle(ref, () => ({
    execute: () => {
      if (!siteKey) {
        return Promise.reject(new Error('La protection anti-spam n’est pas configurée.'))
      }
      if (!window.turnstile || !widgetIdRef.current) {
        return Promise.reject(new Error('La protection anti-spam est encore en cours de chargement.'))
      }
      if (pendingRef.current) {
        return Promise.reject(new Error('Une vérification anti-spam est déjà en cours.'))
      }

      return new Promise<string>((resolve, reject) => {
        pendingRef.current = { resolve, reject }
        window.turnstile?.execute(widgetIdRef.current as string)
      })
    },
    reset,
  }), [reset])

  const renderWidget = useCallback(() => {
    if (!siteKey || !containerRef.current || !window.turnstile || widgetIdRef.current) return

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      action,
      appearance: 'interaction-only',
      execution: 'execute',
      responseField: false,
      callback: (token) => {
        pendingRef.current?.resolve(token)
        pendingRef.current = null
      },
      'error-callback': () => rejectPending('La vérification anti-spam a échoué.'),
      'expired-callback': () => rejectPending('La vérification anti-spam a expiré. Réessaie.'),
      'timeout-callback': () => rejectPending('La vérification anti-spam a expiré. Réessaie.'),
      'unsupported-callback': () => rejectPending('Ce navigateur ne permet pas la vérification anti-spam.'),
    })
    onReadyRef.current?.(true)
  }, [action, rejectPending])

  useEffect(() => {
    renderWidget()
    return () => {
      rejectPending('Vérification anti-spam interrompue.')
      onReadyRef.current?.(false)
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
    }
  }, [rejectPending, renderWidget])

  return (
    <>
      <Script
        id="cloudflare-turnstile"
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={renderWidget}
      />
      <div ref={containerRef} style={{ width: '100%', minHeight: 0 }} />
    </>
  )
})

export default TurnstileWidget
