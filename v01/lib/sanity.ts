/**
 * Sanity Content Lake integration — uses the Mutations + Query REST APIs directly.
 *
 * Required env vars:
 *   SANITY_PROJECT_ID   — e.g. "abc123xy"
 *   SANITY_DATASET      — e.g. "production"
 *   SANITY_API_TOKEN    — a write-enabled token from manage.sanity.io
 *
 * Document _id format: `mailingListSubscriber-{emailHash}`
 * This lets us directly patch/delete by emailHash without a prior query.
 */

const SANITY_API_VERSION = '2024-01-01'

function getSanityConfig() {
  const projectId = process.env.SANITY_PROJECT_ID?.trim()
  const dataset = process.env.SANITY_DATASET?.trim() || 'production'
  const token = process.env.SANITY_API_TOKEN?.trim()
  return { projectId, dataset, token }
}

function emailHashToId(emailHash: string): string {
  return `mailingListSubscriber-${emailHash}`
}

export interface SanitySubscriberDoc {
  email: string
  emailHash: string
  source?: string
  subscribedAt?: string
  ip?: string | null
  userAgent?: string | null
}

export interface SanityActiveSubscriber {
  email: string
  emailHash: string
}

/**
 * Creates or replaces a mailingListSubscriber document.
 * _id is derived from emailHash — idempotent, no duplicates.
 */
export async function upsertSanityMailingListSubscriber(
  data: SanitySubscriberDoc
): Promise<void> {
  const { projectId, dataset, token } = getSanityConfig()

  if (!projectId || !token) {
    throw new Error(
      'Sanity env vars missing: SANITY_PROJECT_ID and SANITY_API_TOKEN are required.'
    )
  }

  const docId = emailHashToId(data.emailHash)
  const url = `https://${projectId}.api.sanity.io/v${SANITY_API_VERSION}/data/mutate/${dataset}`

  const body = {
    mutations: [
      {
        createOrReplace: {
          _id: docId,
          _type: 'mailingListSubscriber',
          email: data.email.toLowerCase().trim(),
          emailHash: data.emailHash,
          source: data.source ?? '/00',
          subscribedAt: data.subscribedAt ?? new Date().toISOString(),
          unsubscribedAt: null,
          ip: data.ip ?? null,
          userAgent: data.userAgent ?? null,
        },
      },
    ],
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const text = await response.text().catch(() => response.statusText)
    throw new Error(`Sanity mutation failed (${response.status}): ${text}`)
  }
}

/**
 * Marks a subscriber as unsubscribed in Sanity by patching unsubscribedAt.
 * Uses emailHash to locate the document directly (no prior query needed).
 */
export async function unsubscribeSanitySubscriber(emailHash: string): Promise<void> {
  const { projectId, dataset, token } = getSanityConfig()

  if (!projectId || !token) {
    throw new Error('Sanity env vars missing.')
  }

  const docId = emailHashToId(emailHash)
  const url = `https://${projectId}.api.sanity.io/v${SANITY_API_VERSION}/data/mutate/${dataset}`

  const body = {
    mutations: [
      {
        patch: {
          id: docId,
          set: { unsubscribedAt: new Date().toISOString() },
        },
      },
    ],
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const text = await response.text().catch(() => response.statusText)
    throw new Error(`Sanity unsubscribe failed (${response.status}): ${text}`)
  }
}

/**
 * Fetches all active (non-unsubscribed) subscribers from Sanity.
 * Used by the mailing-list send script.
 */
export async function fetchSanityActiveSubscribers(): Promise<SanityActiveSubscriber[]> {
  const { projectId, dataset, token } = getSanityConfig()

  if (!projectId || !token) {
    throw new Error('Sanity env vars missing.')
  }

  const query = encodeURIComponent(
    '*[_type == "mailingListSubscriber" && unsubscribedAt == null]{ email, emailHash }'
  )
  const url = `https://${projectId}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${dataset}?query=${query}`

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!response.ok) {
    const text = await response.text().catch(() => response.statusText)
    throw new Error(`Sanity query failed (${response.status}): ${text}`)
  }

  const json = (await response.json()) as { result: SanityActiveSubscriber[] }
  return Array.isArray(json.result) ? json.result : []
}

/**
 * Returns total and active subscriber counts from Sanity.
 */
export async function fetchSanitySubscriberStats(): Promise<{ total: number; active: number }> {
  const { projectId, dataset, token } = getSanityConfig()

  if (!projectId || !token) {
    throw new Error('Sanity env vars missing.')
  }

  const query = encodeURIComponent(
    '{ "total": count(*[_type == "mailingListSubscriber"]), "active": count(*[_type == "mailingListSubscriber" && unsubscribedAt == null]) }'
  )
  const url = `https://${projectId}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${dataset}?query=${query}`

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!response.ok) {
    const text = await response.text().catch(() => response.statusText)
    throw new Error(`Sanity query failed (${response.status}): ${text}`)
  }

  const json = (await response.json()) as { result: { total: number; active: number } }
  return json.result ?? { total: 0, active: 0 }
}
