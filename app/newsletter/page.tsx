'use client'

import { FormEvent, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './newsletter.module.css'

type FormState = 'idle' | 'loading' | 'success' | 'error'

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 10h11M11 6l4 4-4 4" />
    </svg>
  )
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M24 2v44M2 24h44M8.4 8.4l31.2 31.2M39.6 8.4 8.4 39.6" />
    </svg>
  )
}

export default function ZeroZeroPage() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<FormState>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!email.trim()) {
      setState('error')
      setMessage('Entre une adresse email.')
      return
    }

    setState('loading')
    setMessage('')

    try {
      const response = await fetch('/api/mailing-list/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const contentType = response.headers.get('content-type') || ''
      if (!contentType.includes('application/json')) {
        throw new Error('Le serveur local a renvoyé une page inattendue. Recharge la page et réessaie.')
      }

      const payload = (await response.json()) as {
        error?: string
        alreadySubscribed?: boolean
        reactivated?: boolean
      }

      if (!response.ok) {
        throw new Error(payload.error || 'Erreur inconnue.')
      }

      setState('success')
      setMessage(
        payload.alreadySubscribed
          ? 'Tu es déjà inscrit·e.'
          : payload.reactivated
            ? 'Ton abonnement est réactivé.'
            : 'Bienvenue. Ton inscription est confirmée.'
      )
      setEmail('')
    } catch (error) {
      setState('error')
      const fallback = "Impossible de t'inscrire pour le moment."
      setMessage(error instanceof Error ? error.message : fallback)
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.noise} aria-hidden="true" />
      <div className={styles.orbit} aria-hidden="true">
        <span />
        <span />
      </div>

      <header className={styles.header}>
        <Link href="/" className={styles.logoLink} aria-label="Retour à l'accueil de Sans Transition">
          <Image
            src="/logo-flat.png"
            alt="Sans Transition"
            width={214}
            height={45}
            priority
            className={styles.logo}
          />
        </Link>
        <div className={styles.issueMark}>
          <span>Canal direct</span>
          <strong>№ 00</strong>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.editorial}>
          <div className={styles.kicker}>
            <span className={styles.liveDot} />
            La lettre de Sans Transition
          </div>

          <h1>
            L’actualité,
            <br />
            <span>sans détour.</span>
          </h1>

          <p className={styles.intro}>
            Des nouvelles du média, nos dernières enquêtes et les rendez-vous à ne pas rater.
            Directement dans ta boîte mail.
          </p>

          <div className={styles.principles} aria-label="Les engagements de la lettre">
            <span>Indépendante</span>
            <span>Radicale</span>
            <span>Sans publicité</span>
          </div>
        </div>

        <aside className={styles.signup}>
          <div className={styles.signupTop}>
            <span>Rejoins la liste</span>
            <SparkIcon />
          </div>

          <div className={styles.signupBody}>
            <p className={styles.counter}>00</p>
            <h2>Garde une longueur d’avance.</h2>
            <p className={styles.signupCopy}>
              Une sélection pensée par la rédaction. Pas d’algorithme, pas de bruit.
            </p>

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <label htmlFor="mailing-email">Ton adresse email</label>
              <div className={styles.fieldRow}>
                <input
                  id="mailing-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="toi@exemple.fr"
                  required
                  autoComplete="email"
                  aria-invalid={state === 'error'}
                  aria-describedby={message ? 'form-message' : 'privacy-note'}
                />
                <button type="submit" disabled={state === 'loading'}>
                  <span>{state === 'loading' ? 'Envoi…' : 'Je m’inscris'}</span>
                  <ArrowIcon />
                </button>
              </div>

              {message && (
                <p
                  id="form-message"
                  className={`${styles.message} ${state === 'success' ? styles.success : styles.error}`}
                  role="status"
                  aria-live="polite"
                >
                  {message}
                </p>
              )}
            </form>

            <p id="privacy-note" className={styles.privacy}>
              En t’inscrivant, tu acceptes de recevoir nos emails. Désinscription en un clic,
              évidemment.
            </p>
          </div>

          <div className={styles.signupFooter}>
            <span>Écrit dans le 94</span>
            <span>Lu partout</span>
          </div>
        </aside>
      </section>

      <footer className={styles.footer}>
        <p>Un média par et pour les minorités.</p>
        <Link href="/confidentialite">Confidentialité</Link>
      </footer>
    </main>
  )
}
