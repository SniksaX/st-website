'use client'

import { FormEvent, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type FormState = 'idle' | 'loading' | 'success' | 'error'

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
          ? 'Tu es deja inscrit(e).'
          : payload.reactivated
          ? 'Ton abonnement est reactive.'
          : 'Merci, tu es inscrit(e).'
      )
      setEmail('')
    } catch (error) {
      setState('error')
      const fallback = "Impossible de t'inscrire pour le moment."
      setMessage(error instanceof Error ? error.message : fallback)
    }
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl items-center justify-center px-6 py-12">
      <section className="w-full rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Mailing list</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Laisse ton email pour recevoir les prochaines infos.
        </p>

        <form className="mt-6 space-y-3" onSubmit={handleSubmit}>
          <Input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="email@exemple.com"
            required
            aria-label="Adresse email"
            className="h-11 rounded-2xl"
          />
          <Button type="submit" disabled={state === 'loading'} className="h-11 w-full rounded-2xl">
            {state === 'loading' ? 'Envoi...' : "S'inscrire"}
          </Button>
        </form>

        {message && (
          <p
            className={`mt-4 text-sm ${
              state === 'success' ? 'text-emerald-600' : state === 'error' ? 'text-red-600' : 'text-muted-foreground'
            }`}
          >
            {message}
          </p>
        )}
      </section>
    </main>
  )
}
