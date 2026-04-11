/**
 * Sanity Content Lake integration — uses the Mutations REST API directly,
 * no @sanity/client dependency needed.
 *
 * Required env vars:
 *   SANITY_PROJECT_ID   — e.g. "abc123xy"
 *   SANITY_DATASET      — e.g. "production"
 *   SANITY_API_TOKEN    — a write-enabled token from manage.sanity.io
 */

const SANITY_API_VERSION = '2024-01-01'

function getSanityConfig() {
  const projectId = process.env.SANITY_PROJECT_ID?.trim()
  const dataset = process.env.SANITY_DATASET?.trim() || 'production'
  const token = process.env.SANITY_API_TOKEN?.trim()
  return { projectId, dataset, token }
}

/**
 * Derives a URL-safe, deterministic document _id from an email address.
 * Uses a simple base64url encoding so the same email always maps to the same id,
 * preventing duplicate documents on re-subscription.
 */
function emailToId(email: string): string {
  const encoded = Buffer.from(email.toLowerCase().trim()).toString('base64url')
  return `mailingListSubscriber-${encoded}`
}

export interface SanitySubscriberDoc {
  email: string
  source?: string
  subscribedAt?: string
  ip?: string | null
  userAgent?: string | null
}

/**
 * Creates or updates a mailingListSubscriber document in Sanity.
 * Uses `createOrReplace` so it's idempotent — re-subscribing the same email
 * just refreshes the timestamp without creating a duplicate.
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

  const docId = emailToId(data.email)
  const url = `https://${projectId}.api.sanity.io/v${SANITY_API_VERSION}/data/mutate/${dataset}`

  const body = {
    mutations: [
      {
        createOrReplace: {
          _id: docId,
          _type: 'mailingListSubscriber',
          email: data.email.toLowerCase().trim(),
          source: data.source ?? '/00',
          subscribedAt: data.subscribedAt ?? new Date().toISOString(),
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
