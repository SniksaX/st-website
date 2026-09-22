const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
const DEVELOPMENT_SECRET = '1x0000000000000000000000000000000AA'

type SiteverifyResponse = {
  success?: boolean
  action?: string
  'error-codes'?: string[]
}

type TurnstileResult =
  | { ok: true }
  | { ok: false; status: 400 | 503; error: string }

function readClientIp(request: Request) {
  return (
    request.headers.get('cf-connecting-ip') ??
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    ''
  )
}

export async function verifyTurnstile(input: {
  request: Request
  token: unknown
  expectedAction: 'contact' | 'newsletter'
}): Promise<TurnstileResult> {
  const token = typeof input.token === 'string' ? input.token.trim() : ''
  if (!token || token.length > 2048) {
    return { ok: false, status: 400, error: 'Merci de confirmer que tu n’es pas un robot.' }
  }

  const secret =
    process.env.TURNSTILE_SECRET_KEY?.trim() ||
    (process.env.NODE_ENV !== 'production' ? DEVELOPMENT_SECRET : '')

  if (!secret) {
    console.error('[turnstile] TURNSTILE_SECRET_KEY is missing in production')
    return { ok: false, status: 503, error: 'La protection anti-spam est indisponible.' }
  }

  const body = new FormData()
  body.set('secret', secret)
  body.set('response', token)
  const remoteIp = readClientIp(input.request)
  if (remoteIp) body.set('remoteip', remoteIp)

  try {
    const response = await fetch(SITEVERIFY_URL, {
      method: 'POST',
      body,
      signal: AbortSignal.timeout(8000),
    })
    if (!response.ok) throw new Error(`Siteverify HTTP ${response.status}`)

    const result = (await response.json()) as SiteverifyResponse
    if (!result.success || result.action !== input.expectedAction) {
      console.warn('[turnstile] Verification rejected', {
        action: result.action,
        expectedAction: input.expectedAction,
        errorCodes: result['error-codes'] ?? [],
      })
      return { ok: false, status: 400, error: 'Vérification anti-spam refusée. Réessaie.' }
    }

    return { ok: true }
  } catch (error) {
    console.error('[turnstile] Siteverify unavailable', error)
    return { ok: false, status: 503, error: 'La vérification anti-spam est indisponible.' }
  }
}
